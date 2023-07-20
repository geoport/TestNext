// eslint-disable-next-line @typescript-eslint/no-unused-vars
import LoginPage from 'pages/authentication/login';

// DYNAMIC TESTING OF LOGIN PAGE

describe('LoginPage', () => {
    beforeEach(() => {
        cy.visit('https://www.soilprime.com/authentication/login');
    });

    // Checking page login with valid credentials successfully
    it('should successfully login with valid credentials', () => {
        cy.get('input#email').type('valid-email@example.com');
        cy.get('input#password').type('valid-password');
        cy.get('button[type="submit"]').click();

        // Assert that the user is redirected to the home page
        cy.url().should('include', '/');
    });

    // Checking page show an error message with invalid credentials successfully
    it('should show an error message with invalid credentials', () => {
        cy.get('input#email').type('invalid-email@example.com');
        cy.get('input#password').type('invalid-password');
        cy.get('button[type="submit"]').click();

        // Assert that an error message is displayed
        cy.contains('Kullanıcı bulunamadı');
    });
});
