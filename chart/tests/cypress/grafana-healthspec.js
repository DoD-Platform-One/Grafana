import './login.js'

before(function () {
  cy.visit(Cypress.env('grafana_url'))
  if (Cypress.env('keycloak_test_enable')) {
    cy.task('log', 'Selecting SSO...')
    cy.wait(500)
    cy.contains('SSO').click();

    cy.task('log', 'Filling out login form...')
    cy.get('input[id="username"]')
      .type(Cypress.env('tnr_username'))
      .should('have.value', Cypress.env('tnr_username'));

    cy.get('input[id="password"]')
      .type(Cypress.env('tnr_password'))
      .should('have.value', Cypress.env('tnr_password'));

    cy.get('form').submit();

    cy.task('log', 'Logging in...')
    cy.get('input[id="kc-accept"]').click();
    cy.get('input[id="kc-login"]').click();
  } else {
    cy.task('log', 'skipping sso test...')
    cy.get('body').then(($body) => {
      if ($body.find('input[name="user"]').length != 0) {
        cy.task('log', 'detected login page, logging in with static username and password...')
        cy.get('input[name="user"]')
          .type('admin')
        cy.get('input[name="password"]')
          .type('prom-operator')
        cy.contains("Log in").click()
        cy.get('.page-dashboard')
        cy.task('log', 'app homepage has loaded successfully...')
      }
    })
  }

  // cy.login()
  cy.wait(200)
})

describe('Grafana Unit Testing', function () {
  it('Test for grafana Dashboard', function () {
    cy.visit(`${Cypress.env('grafana_url')}/dashboards`)
    cy.contains("General").click()
    cy.wait(1000)
    cy.get('h2').contains('Kubernetes / Compute Resources / Cluster').click()
  })
})
