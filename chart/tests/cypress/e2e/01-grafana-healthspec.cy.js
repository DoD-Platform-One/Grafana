Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('Cypress detected uncaught exception: ', err);
  expect(err.message).to.include("reading 'keys'")
  return false
})

before(function () {
  cy.env(['grafana_url', 'keycloak_test_enable', 'tnr_username', 'tnr_password']).then(({ grafana_url, keycloak_test_enable, tnr_username, tnr_password }) => {
    cy.visit(grafana_url);

    if (keycloak_test_enable) {
      cy.wait(500);
      cy.contains('SSO').click();
      cy.performKeycloakLogin(tnr_username, tnr_password)
    } else {
      cy.visit(grafana_url);
      cy.performGrafanaLogin('admin', 'prom-operator')
    }
  });
});

describe('Grafana Unit Testing', function () {
  it('Test for Grafana Dashboard', function () {
    cy.env(['grafana_url']).then(({ grafana_url }) => {
      cy.visit(`${grafana_url}/dashboards`);
    });
    cy.wait(1000);
    cy.loadGrafanaDashboard("CoreDNS")
    cy.get('[data-testid="data-testid Panel header Requests (total)"]').should('not.contain', 'No data');
  });
});
