// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Layout from 'components/layout/Layout';

// DYNAMIC TESTING OF LAYOUT COMPONENT

describe('Layout', () => {
    beforeEach(() => {
        cy.visit('https://www.soilprime.com');
    });

    // Checking Layout have a correct title in the head
    it('should have a title in the head', () => {
        cy.get('head title').should('contain', 'SoilPrime');
    });

    // Checking Layout have meta tags in the head
    it('should have meta tags in the head', () => {
        cy.get('head meta[name="description"]').should(
            'have.attr',
            'content',
            'Soilprime online geoteknik analizleri gerçekleştirebileceğiniz bir web sitesidir.',
        );
        cy.get('head meta[name="viewport"]').should(
            'have.attr',
            'content',
            'width=device-width, initial-scale=1, maximum-scale=1',
        );
    });

    // Checking Layout renders Header component
    it('should render Header component', () => {
        cy.get('header').should('exist');
    });
});
