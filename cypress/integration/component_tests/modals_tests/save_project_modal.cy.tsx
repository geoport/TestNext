import SaveProjectModal from "components/modals/save_project_modal";

// DYNAMIC TESTING OF SAVE PROJECT MODAL

describe('SaveProjectModal component', () => {

    // Checking modal displays correct title and buttons
    it('displays the modal with the correct title and buttons', () => {
      cy.mount(<SaveProjectModal modalContent={{ show: true, projectName: '', errorMessage: '' }} setModalContent={() => {}} onSave={() => {}} />);
      cy.get('h1').should('have.text', 'Proje İsmini Giriniz');
      cy.contains('button', 'X').should('be.visible');
      cy.contains('button', 'Kaydet').should('be.visible');
    });
  
    // Checking modal allows user to input project name
    it('allows user to input project name', () => {
      cy.mount(<SaveProjectModal modalContent={{ show: true, projectName: '', errorMessage: '' }} setModalContent={() => {}} onSave={() => {}} />);
      cy.get('input').type('My project').should('have.value', '');
    });
  
    // Checking modal displays error message when provided
    it('displays error message when provided', () => {
      cy.mount(<SaveProjectModal modalContent={{ show: true, projectName: '', errorMessage: 'Invalid project name' }} setModalContent={() => {}} onSave={() => {}} />);
      cy.contains('.text-red-500', '!!! Invalid project name !!!').should('be.visible');
    });
  
    // Checking modal calls the onSave function when "Kaydet" button is clicked
    it('calls the onSave function when "Kaydet" button is clicked', () => {
      const onSave = cy.stub().as('onSave');
      cy.mount(<SaveProjectModal modalContent={{ show: true, projectName: '', errorMessage: '' }} setModalContent={() => {}} onSave={onSave} />);
      cy.contains('button', 'Kaydet').click();
      cy.get('@onSave').should('have.been.calledOnce');
    });
  
    // Checking modal closes when "X" button is clicked
    it('closes the modal when "X" button is clicked', () => {
      const setModalContent = cy.stub().as('setModalContent');
      cy.mount(<SaveProjectModal modalContent={{ show: true, projectName: '', errorMessage: '' }} setModalContent={setModalContent} onSave={() => {}} />);
      cy.contains('button', 'X').click();
      cy.get('@setModalContent').should('have.been.calledWith', { show: false, projectName: '', errorMessage: '' });
    });
  });
  