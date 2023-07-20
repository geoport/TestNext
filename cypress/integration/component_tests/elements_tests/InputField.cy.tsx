import { InputField } from "components/elements/FormFields";

import React from 'react';

// DYNAMIC TESTING OF INPUT FIELD COMPONENT

describe('InputField', () => {
  const formField = {
    id: 'username',
    label: 'Username',
    type: 'text',
    unit: ''
  };

  // Checking component renders an input field with the correct label and value
  it('renders an input field with the correct label and value', () => {
    const onChange = cy.stub();
    const value = 'testValue';
    cy.mount(<InputField formField={formField} value={value} onChange={onChange} />);

    cy.get('label').should('have.text', formField.label);
    cy.get('input')
      .should('have.attr', 'type', formField.type)
      .should('have.attr', 'name', formField.id)
      .should('have.value', value);
  });
});
