Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ()=>{
    cy.get('#firstName').type('Wellington')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('wellington_santanna@outlook.com')
    cy.get('#open-text-area').type('Teste TOn')
    cy.get('button[type="submit"]').click()
})