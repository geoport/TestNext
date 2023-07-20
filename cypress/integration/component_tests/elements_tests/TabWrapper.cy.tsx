import { TabWrapper } from "components/elements/Tab";

// DYNAMIC TESTING OF TAB WRAPPER COMPONENT

describe('TabWrapper', () => {

    // Checking component renders its children correctly
    it('should render its children', () => {
      cy.mount(
        <TabWrapper>
          <div className="child-1" />
          <div className="child-2" />
        </TabWrapper>
      );
  
      cy.get('.child-1').should('exist');
      cy.get('.child-2').should('exist');
    });
  });
  