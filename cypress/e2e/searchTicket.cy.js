/// <reference types="cypress">

describe('Self-service Portal: Ticket History', () => {

    // Set default wait time for network to be idle
    const defaultWait = 10000;
    let counter = 0

    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: /[\s\S]*/
        });
    })

    it(`Step ${++counter} : Open Self Service Portal`, () => {
        //cy.visit(credData[0].Tenant)
        //cy.visit('/')

        const excelFilePath = './Credentials.xlsx'
        const sheetName = "login";
        cy.task("readCredentials", {
            excelFilePath,
            sheetName
        }).then((credData) => {
            cy.visit(credData[0].Tenant)
        })

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
                const excelFilePath = './Credentials.xlsx'
                const sheetName = "login";
                cy.task("readCredentials", {
                    excelFilePath,
                    sheetName
                }).then((credData) => {

                    // Enter username
                    cy.get("INPUT[id='j_username']").type(credData[0].Username);
                    // Enter password
                    cy.get("INPUT[id='j_password']").type(credData[0].Password, {
                        log: false
                    })

                })

                // Click login
                cy.get("BUTTON[type='submit']").click().waitForNetworkIdle('@sapCalls', defaultWait)
            }
        })
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

    it(`Step ${++counter} : Search Ticket`, () => {

        const excelFilePath = './B2B-Test Template.xlsx'
        const sheetName = "Ticket Modification";
        cy.task("readExcelData", {
            excelFilePath,
            sheetName
        }).then((xlData) => {

            for (let i = 0; i < xlData.length; i++) {

                // Enter ticket id
                cy.get("INPUT:nth-child(1)")
                    .type(xlData[i].Ticket_ID)
                    .waitForNetworkIdle('@sapCalls', defaultWait)


                // Open ticket
                cy.get("DIV:nth-child(5) > DIV:nth-child(1)")
                    .click()
                    .waitForNetworkIdle('@sapCalls', defaultWait)

                // Edit ticket
                cy.contains("DIV[dir='auto']", "Edit Ticket")
                    .click()

                // Processing type code
                if (xlData[i].Processing_Type_Code !== undefined) {
                    cy.get("DIV:nth-child(3) > DIV:nth-child(2) > DIV:nth-child(1) > SELECT:nth-child(1)")
                        .select(xlData[i].Processing_Type_Code)
                }

                // Account
                if (xlData[i].Account !== undefined) {
                    cy.get("DIV:nth-child(4) > DIV:nth-child(2) > DIV:nth-child(1) > SELECT:nth-child(1)")
                        .select(xlData[i].Account)
                }

                // Priority
                if (xlData[i].Priority !== undefined) {
                    cy.get("DIV:nth-child(5) > DIV:nth-child(2) > DIV:nth-child(1) > SELECT:nth-child(1)")
                        .select(xlData[i].Priority)
                }

                // Name
                if (xlData[i].Name !== undefined) {
                    cy.get("DIV:nth-child(6) > DIV:nth-child(2) > INPUT:nth-child(1)")
                        .clear()
                        .wait(500)
                        .type(xlData[i].Name)
                }

                // Update button
                cy.contains("DIV[dir='auto']", "Update Ticket")
                    .click()
                    .waitForNetworkIdle('@sapCalls', defaultWait)

                cy.on('fail', (error, runnable) => {
                    return false
                })

                cy.get("BUTTON:nth-child(3) > DIV:nth-child(1)").click()

            }
        })

    })
})