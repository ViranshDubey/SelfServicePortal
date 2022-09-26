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

    it(`Step ${++counter} : Click Ticket History`, () => {

        cy.waitForNetworkIdlePrepare({
            method: '+(POST|GET)',
            pattern: '/sap**',
            alias: 'sapCalls',
        })

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