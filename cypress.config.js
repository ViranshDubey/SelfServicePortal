//const xlsx = require("node-xlsx").default;
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

module.exports = {
  e2e: {
    // baseUrl: 'https://dbs-cx-services-cx-automation-8lwq2pxs-dev-myapp-app-router.cfapps.eu10-004.hana.ondemand.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        readCredentials({ excelFilePath, sheetName }) {
          const wb = xlsx.readFile(excelFilePath);
          const ws = wb.Sheets[sheetName];
          return xlsx.utils.sheet_to_json(ws);
        },
        readExcelData({ excelFilePath, sheetName }) {
          const wb = xlsx.readFile(excelFilePath);
          const ws = wb.Sheets[sheetName];
          return xlsx.utils.sheet_to_json(ws);
        }
      });

    },
    // excludeSpecPattern: "**/e2e/searchTicket.cy.js"
    excludeSpecPattern: "**/e2e/createTicket.cy.js"
  },
};

