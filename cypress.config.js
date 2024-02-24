const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '59gs5f',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://pushing-it.vercel.app",
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    fixturesFolder: 'cypress/e2e/',
  },

  env: {
    user: 'pushingit',
    pass: '123456!',
    baseUrlApi: 'https://pushing-it.onrender.com/api',
    token: ''
  }
});
