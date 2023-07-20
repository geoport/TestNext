import ErrorModal from "components/modals/error_modal";

// DYNAMIC TESTING OF ERROR MODAL COMPONENT

describe('ErrorModal', () => {

    // Checking modal displays the correct title and content
    it('displays the correct title and content', () => {
        const modalContent = {
            show: true,
            title: 'Error',
            content: '<p>Oops! Something went wrong.</p>',
        };
        cy.mount(<ErrorModal modalContent={modalContent} setModalContent={cy.stub()} />);

        cy.get('h3').should('have.text', modalContent.title);
        cy.get('.text-gray-500').should('have.html', modalContent.content);
    });
});
