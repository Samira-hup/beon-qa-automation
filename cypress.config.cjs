// Cypress setup: the reporter, the timeouts, and the base URL for the environment you picked.

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'BEON QA Automation',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      const { resolveEnvironment, environmentUrls } = await import('./cypress/support/data/urls.ts');
      const name = resolveEnvironment(config.env.environment || process.env.ENVIRONMENT);
      config.baseUrl = environmentUrls(name).ui;
      config.env.environment = name;
      return config;
    },
  },
});
