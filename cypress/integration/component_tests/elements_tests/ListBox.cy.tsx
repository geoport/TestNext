import { ListBox } from "components/elements/FormFields";

import { FormField } from "models/FormField";

// DYNAMIC TESTING OF LIST BOX COMPONENT

describe('ListBox component', () => {

  // Checking component renders
  it('renders correctly', () => {
    const formField: FormField = {
      id: 'example-select',
      label: 'Example Select',
      choices: [
        { key: 'Option 1', value: 'option1' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 3', value: 'option3' },
      ],
    };
    const selected = 'option2';
    const setSelected = cy.stub().as('setSelected');
    cy.mount(<ListBox formField={formField} selected={selected} setSelected={setSelected} />);
    cy.get('label').should('have.text', 'Example Select');
    
  });
});

