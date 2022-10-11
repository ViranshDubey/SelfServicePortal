/// <reference types="cypress">

describe('Self-service Portal: Create Ticket', () => {

  // Set default wait time for network to be idle
  const defaultWait = 1000;
  let counter = 0;

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

  it(`Step ${++counter} : Report an Issue`, () => {

    cy.on('fail', (error, runnable) => {
      return false
    })

    cy.url().should("include", "appgyver/page.Page4.html").then((val) => {
      if (val) {
        /* cy.contains("DIV[dir='auto']", "Report an Issue")
           .click()
           .waitForNetworkIdle('@sapCalls', defaultWait)
           */
      }
    })
  })

  it(`Step ${++counter} : Create Ticket`, () => {

    const excelFilePath = './B2B-Test Template.xlsx'
    const sheetName = "Ticket Creation";
    cy.task("readExcelData", {
      excelFilePath,
      sheetName
    }).then((xlData) => {

      console.log("Xl Data")
      console.log(xlData)
      for (let i = 0; i < xlData.length; i++) {

        //Navigate to creation screen
        cy.contains("DIV[dir='auto']", "Report an Issue")
          .click()
          .waitForNetworkIdle('@sapCalls', defaultWait)

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

        // Service category
        if (xlData[i].Service_Category !== undefined) {
          cy.get("DIV:nth-child(6) > DIV:nth-child(2) > DIV:nth-child(1) > SELECT:nth-child(1)")
            .select(xlData[i].Service_Category)
        }

        // Name
        if (xlData[i].Name !== undefined) {
          cy.get("INPUT:nth-child(1)")
            .clear()
            .type(xlData[i].Name)
        }

        // Description
        if (xlData[i].Description !== undefined) {
          cy.get("TEXTAREA")
            .clear()
            .type(xlData[i].Description)
        }

        /* // Select files
         cy.contains("DIV[dir='auto']", "Select File(s)")
         .attachFile("C:\\Users\\I355920\\OneDrive - SAP SE\\Desktop\\out.txt") */


        // Click create ticket button
        cy.contains("DIV[dir='auto']", "Submit")
          .click()
          .waitForNetworkIdle('@sapCalls', defaultWait)


        cy.on('fail', (error, runnable) => {
          return false
        })

        cy.get("BUTTON:nth-child(3) > DIV:nth-child(1)").click()

      }

    })


  })

  /*it(`Step ${++counter} : Enter name`, () => {
    // Name
    cy.get("INPUT:nth-child(1)").type("Auto Ticket - 01")
  })

  it(`Step ${++counter} : Enter Priority`, () => {
    // Priority
    cy.contains("SELECT", "Select optionImmediateUrgentNormalLow")
      .select("1")
  })

  it(`Step ${++counter} : Enter Processing code`, () => {
    // Processing type code
    cy.get("DIV:nth-child(5) > DIV:nth-child(2) > DIV:nth-child(1) > SELECT:nth-child(1)").type("Case (Z)")
  })

  it(`Step ${++counter} : Enter Description`, () => {
    // Description
    cy.get("TEXTAREA").type("Test Description")
  })

  /*it(`Step ${++counter} : Click create button`, () => {
    cy.contains("DIV[class='css-901oao']", "Create Ticket").click()
  })


  it(`Step ${++counter} : Click Ok/Successful button`, () => {

    cy.on('fail', (error, runnable) => {
      return false
    })

    cy.get("BUTTON:nth-child(3) > DIV:nth-child(1)").click()
  })

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
  })*/

})