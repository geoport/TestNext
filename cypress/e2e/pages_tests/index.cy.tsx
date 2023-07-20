// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Index from 'pages';

// DYNAMIC TESTING OF HOME PAGE

describe('Index page', () => {
    beforeEach(() => {
        cy.visit('https://www.soilprime.com');
    });

    // Checking page displays the title and subtitle
    it('displays the title and subtitle', () => {
        cy.contains('SoilPrime');
        cy.contains('Bulut Tabanlı Geoteknik Yazılımları Platformu');
    });

    // Checking page displays the key features section with all 3 features
    it('displays the key features section with all 3 features', () => {
        cy.get('#key-features')
            .should('be.visible')
            .within(() => {
                cy.contains('Online Erişim');
                cy.contains('Satın Alma Kolaylığı');
                cy.contains('Kullanıcı Dostu Arayüz');
            });
    });

    // Checking page displays the icons for each feature
    it('displays the icons for each feature', () => {
        cy.get('#key-features')
            .should('be.visible')
            .within(() => {
                cy.get('[alt="Online Erişim"]').should('be.visible');
                cy.get('[alt="Satın Alma Kolaylığı"]').should('be.visible');
                cy.get('[alt="Kullanıcı Dostu Arayüz"]').should('be.visible');
            });
    });
});
