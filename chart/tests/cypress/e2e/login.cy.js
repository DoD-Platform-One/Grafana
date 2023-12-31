Cypress.Commands.add('login', () => {
  if (Cypress.env('keycloak_test_enable')) {
    cy.task('log', 'logging in via keycloak...');

    cy.session('keycloak', () => {
      cy.visit('/'); // Replace with your login page URL
      cy.get('body').then(($body) => {
        // If there's a screen that makes you click on an OAuth button, click on it
        if ($body.find('.login-content-box').length > 0) {
          cy.task('log', 'Clicking on the OAuth button...');
          cy.contains('OAuth').click();
          cy.wait(1000);
        }
      });

      cy.get('body').then(($body) => {
        // Return successfully if there's no box for a username (which is how this is detecting if it's on a login page)
        if ($body.find('#username').length == 0) {
          if ($body.find('#user').length == 0) {
            cy.task('log', 'No login screen, returning from login()...');
            return 0;
          }
        }

        if ($body.find('#username').length > 0) {
          cy.task('log', 'keycloak is displaying the login/password screen...');
          cy.get('input[id="username"]').type(Cypress.env('keycloak_username'));
          cy.get('input[id="password"]').type(Cypress.env('keycloak_password'));
          cy.get('input[id="kc-login"]').click();

          cy.intercept('GET', '**/*').as('landingpage');
          cy.get('input[id="kc-accept"]').click();

          // Though the cookies will clear, the consent will be kept in keycloak between tests, so we have to see
          // whether that page comes up and skip it if not.
          cy.get('body').then(($kconsent) => {
            if ($kconsent.find('input[id="kc-login"]').length > 0) {
              // Need to reset the intercept now that it will be looking at this click instead of the one above
              cy.intercept('GET', '**/*').as('landingpage');
              cy.get('input[id="kc-login"]').click();
            }
          });

          // After hitting "yes" on the consent page, there should be a redirect back to the app (for grafana it's 302)
          // It also might catch a 200 code, which is also OK
          cy.wait('@landingpage').its('response.statusCode').should('match', (/200|302/));
          cy.task('log', 'keycloak has redirected back to the app...');

          // Then the app's page should load
          cy.wait('@landingpage').its('response.statusCode').should('match', (/200|302/));
          cy.task('log', 'app homepage has loaded successfully...');
        }
      });
    });
  } else {
    cy.task('log', 'skipping sso test...');
    cy.get('body').then(($body) => {
      if ($body.find('input[name="user"]').length != 0) {
        cy.task('log', 'detected login page, logging in with static username and password...');
        cy.get('input[name="user"]').type('admin');
        cy.get('input[name="password"]').type('prom-operator');
        cy.contains("Log in").click();
        cy.get('.page-dashboard');
        cy.task('log', 'app homepage has loaded successfully...');
      }
    });
  }
});
