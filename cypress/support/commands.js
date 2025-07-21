// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
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
