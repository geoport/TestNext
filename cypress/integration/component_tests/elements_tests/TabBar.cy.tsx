import { TabBar } from "components/elements/Tab";

// DYNAMIC TESTING OF TAB BAR COMP0NENT

describe('TabBar', () => {

    // Checking component renders correctly with children
    it('renders correctly with children', () => {
      const child1 = <li>Tab 1</li>;
      const child2 = <li>Tab 2</li>;
  
      cy.mount(<TabBar>{child1}{child2}</TabBar>);
  
      cy.get('#tabs-tab')
        .should('exist')
        .and('have.class', 'nav-tabs')
        .and('have.class', 'flex')
        .and('have.class', 'flex-wrap')
        .and('have.class', 'list-none')
        .and('have.class', 'border-b-0')
        .and('have.class', 'pl-0')
        .and('have.class', 'min-w-fit')
        .children()
        .should('have.length', 2)
        .first()
        .should('contain.text', 'Tab 1')
        .next()
        .should('contain.text', 'Tab 2');
    });
  
    // Checking component renders correctly with vertical orientation
    it('renders correctly with vertical orientation', () => {
      const child1 = <li>Tab 1</li>;
      const child2 = <li>Tab 2</li>;
  
      cy.mount(<TabBar vertical>{child1}{child2}</TabBar>);
  
      cy.get('#tabs-tabVertical')
        .should('exist')
        .and('have.class', 'nav-tabs')
        .and('have.class', 'flex')
        .and('have.class', 'flex-col')
        .and('have.class', 'mr-4')
        .children()
        .should('have.length', 2)
        .first()
        .should('contain.text', 'Tab 1')
        .next()
        .should('contain.text', 'Tab 2');
    });
  });
  