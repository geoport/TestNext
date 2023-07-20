import { Accordion } from "components/elements/Accordion";

import React from 'react';

// DYNAMIC TESTING OF ACCORDION COMPONENT

describe('Accordion component', () => {

  // Checking if the content is visible or hidden when the button is clicked
  it('should toggle the content when the button is clicked', () => {
    const title = 'Accordion Title';
    const content = 'This is the accordion content.';

    cy.mount(<Accordion id="accordion1" title={title}>{content}</Accordion>);

    // Click the button to open the accordion
    cy.get('.accordion-button').click();

    // Verify that the accordion is open
    cy.get('#accordion1').should('be.visible');

    // Click the button again to close the accordion
    cy.get('.accordion-button').click();
    
  });
});
