export const selectors = {
  firstName: '#firstName',
  lastName: '#lastName',
  email: '#email',
  phone: '#phone',
  phoneCheckbox: '#phone-checkbox',
  emailCheckbox: '#email-checkbox',
  productSelect: '#product',
  textarea: '#open-text-area',
  fileInput: 'input[type="file"]',
  submitButton: 'button[type="submit"]',
  successMessage: '.success',
  errorMessage: '.error',
  atendimentoAjuda: 'input[value="ajuda"]',
  atendimentoElogio: 'input[value="elogio"]',
  atendimentoFeedback: 'input[value="feedback"]',
  phoneLabelSpan: '.phone-label-span',
  privacyLink: '#privacy a',
  whiteBackground: '#white-background',
}

export function preencherFormulario({
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
} = {}) {
  if (firstName) cy.get(selectors.firstName).clear().type(firstName)
  if (lastName) cy.get(selectors.lastName).clear().type(lastName)
  if (email) cy.get(selectors.email).clear().type(email)
  if (mensagem) cy.get(selectors.textarea).clear().type(mensagem)
  if (marcarTelefone) cy.get(selectors.phoneCheckbox).check()
  if (telefone) cy.get(selectors.phone).clear().type(telefone)
  if (produto) cy.get(selectors.productSelect).select(produto)
  if (atendimento) cy.get(`input[value="${atendimento}"]`).check()
  if (marcarEmail) cy.get(selectors.emailCheckbox).check()
  if (marcarPhone) cy.get(selectors.phoneCheckbox).check()
  if (arquivo) cy.get(selectors.fileInput).selectFile(`cypress/fixtures/${arquivo}`, { force: true })
}

export function enviarFormulario() {
  cy.get(selectors.submitButton).click()
}

export function esperarMensagemVisivel(selector) {
  cy.get(selector).should('be.visible')
}

export function esperarMensagemInvisivel(selector) {
  cy.get(selector).should('not.be.visible')
}

export function clicarCheckbox(selector) {
  cy.get(selector).check()
}

export function desmarcarCheckbox(selector) {
  cy.get(selector).uncheck()
}

export function verificarCheckboxMarcado(selector) {
  cy.get(selector).should('be.checked')
}

export function verificarCheckboxDesmarcado(selector) {
  cy.get(selector).should('not.be.checked')
}

export function definirViewport(width, height) {
  cy.viewport(width, height)
}
