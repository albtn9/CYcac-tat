import { selectors } from './selectors'

Cypress.Commands.add('preencherFormulario', ({
  firstName = '',
  lastName = '',
  email = '',
  mensagem = '',
  marcarTelefone = false,
  telefone = '',
  produto = '',
  atendimento = 'ajuda',
  marcarEmail = false,
  marcarPhone = false,
  arquivo = ''
} = {}) => {
  if (firstName) cy.get(selectors.firstName).type(firstName)
  if (lastName) cy.get(selectors.lastName).type(lastName)
  if (email) cy.get(selectors.email).type(email)
  if (mensagem) cy.get(selectors.textarea).type(mensagem)
  if (marcarTelefone) {
    cy.get(selectors.phoneCheckbox).check()
    if (telefone) {
      const telStr = typeof telefone === 'number' ? telefone.toString() : telefone
      cy.get(selectors.phone).type(telStr)
    }
  }
  if (produto) cy.get(selectors.productSelect).select(produto)
  if (atendimento) cy.get(`input[value="${atendimento}"]`).check()
  if (marcarEmail) cy.get(selectors.emailCheckbox).check()
  if (marcarPhone) cy.get(selectors.phoneCheckbox).check()
  if (arquivo) cy.get(selectors.fileInput).selectFile(`cypress/fixtures/${arquivo}`, { force: true })
  return cy
})
