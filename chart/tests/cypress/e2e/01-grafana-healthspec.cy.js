Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('Cypress detected uncaught exception: ', err);
  expect(err.message).to.include("reading 'keys'")
  return false
})

before(function () {
  cy.visit(Cypress.env('grafana_url'));

  if (Cypress.env('keycloak_test_enable')) {
    cy.wait(500);
    cy.contains('SSO').click();
    cy.performKeycloakLogin(Cypress.env('tnr_username'), Cypress.env('tnr_password'))
  } else {
    cy.visit(Cypress.env('grafana_url'));;
    cy.performGrafanaLogin('admin', 'prom-operator')
  }
});

describe('Grafana Unit Testing', function () {
  it('Test for Grafana Dashboard', function () {
    cy.visit(`${Cypress.env('grafana_url')}/dashboards`);
    cy.wait(1000);
    cy.loadGrafanaDashboard("CoreDNS")
    cy.get('[data-testid="data-testid Panel header Requests (total)"]').should('not.contain', 'No data');
  });
});
