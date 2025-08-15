const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: [
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", 
      "car.cy.js"                           
    ],
    baseUrl: "http://localhost:3000", 
  },
});