// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SignUp from 'pages/authentication/signup';

// DYNAMIC TESTING OF SIGN UP PAGE

describe('SignUp Page', () => {
    beforeEach(() => {
        cy.visit('https://www.soilprime.com/authentication/signup');
    });

    // Checking page displays the form and allows the user to sign up
    it('displays the form and allows the user to sign up', () => {
        cy.get('form').should('exist');

        // Fill out the form
        cy.get('[name="fullname"]').type('Ali Bayram');
        cy.get('[name="email"]').type('alibayram009@gmail.com');
        cy.get('[name="password"]').type('password123');
        cy.get('[name="confirmPassword"]').type('password123');
        cy.get('[name="phone"]').type('5384499714');

        // Submit the form
        cy.get('form').submit();

        // Assert that the user is redirected to the home page
        cy.url().should('include', '/');
    });

    // Checking page displays an error message if the user enters invalid data
    it('displays an error message if the user enters invalid data', () => {
        // Fill out the form with invalid data
        cy.get('[name="email"]').type('invalid-email');
        cy.get('[name="password"]').type('password');
        cy.get('[name="confirmPassword"]').type('different-password');
        cy.get('[name="phone"]').type('invalid-phone');

        // Submit the form
        cy.get('form').submit();

        // Assert that an error message is displayed
        cy.contains('Lütfen geçerli bir email adresi giriniz.');
    });
});
