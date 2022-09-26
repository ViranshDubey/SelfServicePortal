/// <reference types="cypress">

describe('Self-service Portal: Create Ticket', () => {

  // Set default wait time for network to be idle
  const defaultWait = 10000;
  let counter = 0

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: /[\s\S]*/
    });
  })

  it(`Step ${++counter} : Open Self Service Portal`, () => {
    cy.visit('/')
  })

  it(`Step ${++counter} : Enter credentials and login`, () => {

    cy.waitForNetworkIdlePrepare({
      method: '+(POST|GET)',
      pattern: '/sap**',
      alias: 'sapCalls',
    })

    cy.on('fail', (error, runnable) => {
      return false
    })

    cy.contains("SelfServicePortal B2B").then((val) => {
      if (val) {
        // Enter username
        cy.get("INPUT[id='j_username']").type('vishal.kumar.dubey@sap.com')

        // Enter password
        cy.get("INPUT[id='j_password']").type('Selfservice123')

        // Click login
        cy.get("BUTTON[type='submit']").click().waitForNetworkIdle('@sapCalls', defaultWait)
      }
    })
  })

  it(`Step ${++counter} : Create ticket`, () => {

    cy.on('fail', (error, runnable) => {
      return false
    })

    cy.url().should("include", "appgyver/page.Page4.html").then((val) => {
      if (val) {
        cy.contains("DIV[dir='auto']", "Ticket Detail")
          .click()
          .waitForNetworkIdle('@sapCalls', defaultWait)
      }
    })
  })

  it(`Step ${++counter} : Enter name`, () => {
    // Name
    cy.get("INPUT:nth-child(1)").type("Auto Ticket - 01")
  })

  it(`Step ${++counter} : Enter Priority`, () => {
    // Priority
    cy.get("DIV:nth-child(4) > DIV:nth-child(2) > DIV:nth-child(1) > SELECT:nth-child(1)").type("Immediate")
  })

  it(`Step ${++counter} : Enter Processing code`, () => {
    // Processing type code
    cy.get("DIV:nth-child(5) > DIV:nth-child(2) > DIV:nth-child(1) > SELECT:nth-child(1)").type("Case (Z)")
  })

  it(`Step ${++counter} : Enter Description`, () => {
    // Description
    // cy.get("TEXTAREA:nth-child(3)").type("Test Description")
    cy.get("TEXTAREA").type("Test Description")
  })

  it(`Step ${++counter} : Click create button`, () => {
    cy.contains("DIV[class='css-901oao']", "Create Ticket").click()
  })

  /*
  it(`Step ${++counter} : Click Ok/Successful button`, () => {

    cy.on('fail', (error, runnable) => {
      return false
    })

    cy.get("BUTTON:nth-child(3) > DIV:nth-child(1)").click()
  })
  */

  it(`Step ${++counter} : Click Ticket History`, () => {

    cy.contains("DIV[class='css-901oao']", "Ticket History")
      .click()
      .waitForNetworkIdle('@sapCalls', defaultWait)
  })

  it(`Step ${++counter} : Enter search value`, () => {
    cy.get("INPUT:nth-child(1)")
      .type("7739")
      .waitForNetworkIdle('@sapCalls', defaultWait)
  })

  it(`Step ${++counter} : Display ticket`, () => {
    cy.get("DIV:nth-child(5) > DIV:nth-child(1)")
      .click()
      .waitForNetworkIdle('@sapCalls', defaultWait)
  })

})