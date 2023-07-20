// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ForgotPassword from 'pages/authentication/forgot-password';

// DYNAMIC TESTING OF FORGOT PASSWORD PAGE

describe('ForgotPassword Page', () => {
    beforeEach(() => {
        cy.visit('https://www.soilprime.com/authentication/forgot-password');
    });

    // Checking page displays the forgot password form
    it('displays the forgot password form', () => {
        cy.get('form').should('exist');
        cy.get('form').within(() => {
            cy.get('label[for="email"]').should('have.text', 'E-mail');
            cy.get('input[type="email"]').should('exist');
            cy.get('button[type="submit"]').should(
                'have.text',
                'Şifre sıfırlama maili gönder',
            );
        });
    });

    // Checking page displays error message for invalid e-mail
    it('displays error message for invalid email', () => {
        const invalidEmail = 'invalid-email';

        cy.get('form').within(() => {
            cy.get('input[type="email"]').type(invalidEmail);
            cy.get('button[type="submit"]').click();
        });
    });

    // Checking page displays success message for valid e-mail
    it('displays success message for valid email', () => {
        const validEmail = 'test@example.com';

        cy.get('form').within(() => {
            cy.get('input[type="email"]').type(validEmail);
            cy.get('button[type="submit"]').click();
        });
    });
});
