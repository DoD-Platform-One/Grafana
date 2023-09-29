before(function () {
  cy.visit(Cypress.env('grafana_url'));

  if (Cypress.env('keycloak_test_enable')) {
    cy.task('log', 'Selecting SSO...');
    cy.wait(500);
    cy.contains('SSO').click();

    cy.task('log', 'Filling out login form...');
    cy.get('input[id="username"]')
      .type(Cypress.env('tnr_username'))
      .should('have.value', Cypress.env('tnr_username'));

    cy.get('input[id="password"]')
      .type(Cypress.env('tnr_password'))
      .should('have value', Cypress.env('tnr_password'));

    cy.get('form').submit();

    cy.task('log', 'Logging in...');
    cy.get('input[id="kc-accept"]').click();
    cy.get('input[id="kc-login"]').click();
  } else {
    cy.visit(Cypress.env('grafana_url'));;
    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('prom-operator');
    cy.contains("Log in").click();
    cy.get('.page-dashboard');
  }
});

describe('Grafana Unit Testing', function () {
  it('Test for Grafana Dashboard', function () {
    // This test no longer requires login steps since they are performed in beforeEach.
    // You can place the test-specific code here.
    cy.visit(`${Cypress.env('grafana_url')}/dashboards`); 
    cy.wait(1000);
    cy.contains("General").click();
    cy.wait(1000);
    cy.get('a').contains('Kubernetes / Compute Resources / Cluster').click();
    // Start intercept to use later in wait to ensure data actually finishes loading
    cy.intercept('POST', '**/query*').as('apiQuery');
    // Should not take longer than 30 seconds for this query to complete
    // If it does, then there is likely something wrong with the data source
    // cy.wait('@apiQuery', { timeout: 30000 }).then((interception) => {
    //   expect(interception.response.statusCode).to equal(200);
    // });
    cy.get('[data-testid="data-testid Panel header CPU Utilisation"]').should('not.contain', 'No data');
  });
});
