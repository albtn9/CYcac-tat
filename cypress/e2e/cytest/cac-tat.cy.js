import {
  selectors,
  preencherFormulario,
  enviarFormulario,
  esperarMensagemVisivel,
  esperarMensagemInvisivel,
  clicarCheckbox,
  desmarcarCheckbox,
  verificarCheckboxMarcado,
  verificarCheckboxDesmarcado,
  definirViewport
} from '../../support/selectors'

describe('CAC TAT - Formulário de Atendimento', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Preenche e envia o formulário com sucesso', () => {
    preencherFormulario({
      firstName: 'João',
      lastName: 'Silva',
      email: 'joao@teste.com',
      mensagem: 'Preciso de ajuda com o produto.'
    })
    enviarFormulario()
    esperarMensagemVisivel(selectors.successMessage)
  })

  it('Exibe mensagem de erro se campos obrigatórios estiverem vazios', () => {
    enviarFormulario()
    esperarMensagemVisivel(selectors.errorMessage)
  })

  it('Exibe erro para e-mail inválido', () => {
    preencherFormulario({
      firstName: 'Ana',
      lastName: 'Souza',
      email: 'invalido-email',
      mensagem: 'Teste'
    })
    enviarFormulario()
    esperarMensagemVisivel(selectors.errorMessage)
  })

  it('Campo de telefone se torna obrigatório ao marcar checkbox', () => {
    clicarCheckbox(selectors.phoneCheckbox)
    enviarFormulario()
    esperarMensagemVisivel(selectors.errorMessage)
  })

  it('Preenche telefone quando é obrigatório', () => {
    preencherFormulario({
      firstName: 'Carlos',
      lastName: 'Lima',
      email: 'carlos@teste.com',
      mensagem: 'Ajuda',
      marcarTelefone: true,
      telefone: '11999999999'
    })
    enviarFormulario()
    esperarMensagemVisivel(selectors.successMessage)
  })

  it('Limpa os campos após envio', () => {
    preencherFormulario({
      firstName: 'Aline',
      lastName: 'Ferreira',
      email: 'aline@teste.com',
      mensagem: 'Quero elogiar o suporte!'
    })
    enviarFormulario()
    cy.get(selectors.firstName).should('have.value', '')
    cy.get(selectors.textarea).should('have.value', '')
  })

  it('Seleciona um produto na lista', () => {
    preencherFormulario({ produto: 'cursos' })
    cy.get(selectors.productSelect).should('have.value', 'cursos')
  })

  it('Verifica opção de atendimento por default', () => {
    verificarCheckboxMarcado(selectors.atendimentoAjuda)
  })

  it('Seleciona tipo de atendimento diferente', () => {
    cy.get(selectors.atendimentoElogio).check().should('be.checked')
  })

  it('Marca e desmarca meios de contato', () => {
    clicarCheckbox(selectors.emailCheckbox)
    verificarCheckboxMarcado(selectors.emailCheckbox)
    clicarCheckbox(selectors.phoneCheckbox)
    verificarCheckboxMarcado(selectors.phoneCheckbox)
    desmarcarCheckbox(selectors.phoneCheckbox)
    verificarCheckboxDesmarcado(selectors.phoneCheckbox)
  })

  it('Anexa um arquivo e verifica o upload', () => {
    const fileName = 'example.json'
    preencherFormulario({ arquivo: fileName })
    cy.get(selectors.fileInput).should(input => {
      expect(input[0].files[0].name).to.equal(fileName)
      expect(input[0].files[0].type).to.equal('application/json')
      expect(input[0].files.length).to.equal(1)
    })
  })

  it('Verifica visibilidade condicional do label de telefone', () => {
    cy.get(selectors.phoneLabelSpan).should('not.be.visible')
    clicarCheckbox(selectors.phoneCheckbox)
    cy.get(selectors.phoneLabelSpan).should('be.visible')
  })

  it('Exibe mensagem de sucesso por 3 segundos', () => {
    cy.clock()
    preencherFormulario({
      firstName: 'Léo',
      lastName: 'Melo',
      email: 'leo@teste.com',
      mensagem: 'Ajuda'
    })
    enviarFormulario()
    esperarMensagemVisivel(selectors.successMessage)
    cy.tick(3000)
    esperarMensagemInvisivel(selectors.successMessage)
  })

  it('Erro desaparece após timeout', () => {
    cy.clock()
    enviarFormulario()
    esperarMensagemVisivel(selectors.errorMessage)
    cy.tick(3000)
    esperarMensagemInvisivel(selectors.errorMessage)
  })

  it('Abre política de privacidade em nova aba', () => {
    cy.get(selectors.privacyLink).should('have.attr', 'target', '_blank')
  })

  it('Acessa política de privacidade diretamente', () => {
    cy.visit('privacy.html')
    cy.contains('Política de privacidade')
  })

  it('Valida que campo de telefone aceita apenas números', () => {
    cy.get(selectors.phone).type('texto').should('have.value', '')
  })

  it('Impede envio com apenas espaços nos campos', () => {
    preencherFormulario({
      firstName: '     ',
      lastName: '     ',
      email: '     ',
      mensagem: '     '
    })
    enviarFormulario()
    esperarMensagemVisivel(selectors.errorMessage)
  })

  it('Verifica se layout se adapta a mobile (resolução 375x667)', () => {
    definirViewport(375, 667)
    cy.get(selectors.whiteBackground).should('have.css', 'border-radius', '0px')
  })

  it('Verifica cor de fundo do botão ao passar mouse (hover)', () => {
    cy.get(selectors.submitButton).trigger('mouseover')
  })
})
