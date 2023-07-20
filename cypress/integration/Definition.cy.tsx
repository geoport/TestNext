import React from 'react';
import Definition from 'components/layout/Definition';

describe('<Definition />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Definition />);
    });
});
