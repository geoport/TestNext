import { TabLink } from 'components/elements/Tab';

// DYNAMIC TESTING OF TAB LINK COMPONENT

describe('TabLink component', () => {
    // Checking component renders provided props
    it('renders the component with provided props', () => {
        const id = 'test-tab-link';
        const title = 'Test Tab Link';
        const hide = false;

        cy.mount(<TabLink title={title} hide={hide} />);

        // Checking that the tab link element has the expected attributes and features
        cy.get(`#${id}-tab`)
            .should('have.attr', 'href', `#${id}-content`)
            .should('have.attr', 'role', 'tab')
            .should('have.attr', 'aria-controls', `${id}-content`)
            .should('have.attr', 'aria-selected', 'true')
            .should('have.class', 'active')
            .should('contain', title);

        // Checking that the tab link element has the expected classes and features
        cy.get('.nav-item')
            .should('have.class', 'flex-grow')
            .should('not.have.css', 'display', 'none');
    });

    // Checking component hides when the hide prop is set to true
    it('hides the component when `hide` prop is set to `true`', () => {
        const title = 'Test Tab Link';
        const hide = true;

        cy.mount(<TabLink title={title} hide={hide} />);

        cy.get('.nav-item').should('have.css', 'display', 'none');
    });
});
