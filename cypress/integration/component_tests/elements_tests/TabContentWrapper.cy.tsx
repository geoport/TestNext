import { TabContentWrapper } from "components/elements/Tab";

// DYNAMIC TESTING OF TAB CONTENT WRAPPER COMPONENT

describe('TabContentWrapper component', () => {

    // Checking component renders children inside a tab content wrapper
    it('renders children inside a tab content wrapper', () => {
      const children = (
        <>
          <div className="child-1">Child 1</div>
          <div className="child-2">Child 2</div>
        </>
      );
  
      cy.mount(<TabContentWrapper>{children}</TabContentWrapper>);
  
      // Checking  that the tab content wrapper element has the expected classes, and that the children are rendered inside it.
      cy.get('.tab-content')
        .should('exist')
        .should('have.class', 'rounded')
        .should('have.class', 'border')
        .should('have.class', 'border-solid')
        .should('have.class', 'border-current');
  
      cy.get('.child-1').should('exist').should('have.text', 'Child 1');
      cy.get('.child-2').should('exist').should('have.text', 'Child 2');
    });
  });
  