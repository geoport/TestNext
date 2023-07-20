import { DateTimeField } from 'components/elements/FormFields';

import React from 'react';

// DYNAMIC TESTING OF DATE TIME FIELD COMPONENT

describe('DateTimeField', () => {
    // Checking component renders with a label and value correctly
    it('renders with a label and value', () => {
        const formField = { id: 'date', label: 'Select Date' };
        const value = new Date('2022-03-01T00:00:00.000Z');
        const onChange = cy.stub().as('onChange');
        cy.mount(
            <DateTimeField
                formField={formField}
                value={value}
                onChange={onChange}
            />,
        );

        cy.get('label').should('have.text', 'Select Date');
        cy.get('input').should('have.value', '01/03/2022');

        cy.get('input')
            .click()
            .then(() => {
                cy.get('.react-datepicker__day--selected').should(
                    'have.text',
                    '1',
                );
            });
    });

    // Checking component renders  without a label and value
    it('renders without a label and value', () => {
        const formField = { id: 'date' };
        const value = undefined;
        const onChange = cy.stub().as('onChange');
        cy.mount(
            <DateTimeField
                formField={formField}
                value={value}
                onChange={onChange}
            />,
        );

        cy.get('label').should('not.exist');
    });

    // Checking component calls onChange when date is selected
    it('calls onChange when date is selected', () => {
        const formField = { id: 'date', label: 'Select Date' };
        const value = undefined;
        const onChange = cy.stub().as('onChange');
        cy.mount(
            <DateTimeField
                formField={formField}
                value={value}
                onChange={onChange}
            />,
        );

        cy.get('input')
            .click()
            .then(() => {
                cy.get('.react-datepicker__day--selected').click();
            });

        cy.get('@onChange').should('have.been.calledOnce');
    });
});
