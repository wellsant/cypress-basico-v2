/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  
  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Teste, teste, teste, teste, teste'
    cy.get('#firstName').type('Wellington')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('wellington_santanna@outlook.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Wellington')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('wellington_santanna@outlook,com')
    cy.get('#open-text-area').type('Teste Ton')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
  
  it('Campo telefone continua vazio quando preenchido com valor não-númerico', () =>{
    cy.get('#phone')
    .type('Ababababa')
    .should('have.value', '')
   })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.get('#firstName').type('Wellington')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('wellington_santanna@outlook,com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste Ton')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
   })
   
   it('Preenche e limpa os campos nome, sobrenome, emai, e telefone', () =>{
    cy.get('#firstName')
    .type('Wellington')
    .should('have.value', 'Wellington')
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .type('wellington_santanna@outlook.com')
    .should('have.value', 'wellington_santanna@outlook.com')
    .clear()
    .should('have.value', '')
   })
   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() =>{
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
   })

   it.only('Envia o formuário com sucesso usando um comando customizado', () =>{
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
   })
})




