import { TabContent } from "components/elements/Tab";

// DYNAMIC TESTING OF TAB CONTENT COMPONENT

describe('TabContent', () => {

    // Checking component renders with active class when active prop is true
    it('renders with active class when active prop is true', () => {
      const content = 'This is the content';
      const id = 'tab1';
  
      cy.mount(
        <TabContent id={id}>
          {content}
        </TabContent>
      );
  
      cy.get(`#${id}-content`)
        .should('have.class', 'active')
        .and('have.attr', 'aria-labelledby', `${id}-tab`)
        .and('have.text', content);
    });
  
    // Checking component renders without active class when active prop is false
    it('renders without active class when active prop is false', () => {
      const content = 'This is the content';
      const id = 'tab2';
  
      cy.mount(
        <TabContent id={id}>
          {content}
        </TabContent>
      );
  
      cy.get(`#${id}-content`)
        .should('not.have.class', 'active')
        .and('have.attr', 'aria-labelledby', `${id}-tab`)
        .and('have.text', content);
    });
  });
  