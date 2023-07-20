// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AboutUs from 'pages/about-us';

// DYNAMIC TESTING OF ABOUT US PAGE

describe('AboutUs Page', () => {
    // Checking page displays the contact form
    it('should display the contact form', () => {
        cy.visit('https://www.soilprime.com/about-us');
        cy.get('h2').contains('Görüş ve önerileriniz almaktan memnun oluruz!');
        cy.get('form').should('exist');
    });

    // Checking page allows the user to select a department
    it('should allow the user to select a department', () => {
        cy.visit('https://www.soilprime.com/about-us');
        cy.get('input[name="department"][value="1"]').check();

        cy.get('input[name="department"][value="2"]').should('not.be.checked');
        cy.get('input[name="department"][value="2"]').check();
        cy.get('input[name="department"][value="2"]').should('be.checked');
        cy.get('input[name="department"][value="1"]').should('not.be.checked');
    });

    // Checking page allows the user to fill out the contact form
    it('should allow the user to fill out the contact form', () => {
        cy.visit('https://www.soilprime.com/about-us');
        cy.get('input[name="department"][value="1"]').check();

        cy.get('input[name="department"][value="2"]').should('not.be.checked');
        cy.get('input[placeholder="Konu"]').type('Test Konu');
        cy.get('input[placeholder="Ad - Soyad"]').type('Test İsim');
        cy.get('input[placeholder="name@example.com"]').type(
            'test@example.com',
        );
        cy.get('textarea[placeholder="Mesaj..."]').type('Test mesajı');

        cy.get('button[type="submit"]').click();
    });
});
