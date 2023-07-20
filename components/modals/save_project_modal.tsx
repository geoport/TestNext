import React from 'react';
import Modal from './modal';

/**
 * SaveProjectModal is a component that renders a modal with an input field and a
 * save button for saving a project.
 *
 * @param modalContent - Modal content object that contains the show state of the modal,
 * the project name and error message.
 * @param setModalContent - Function that sets the modal content object.
 * @param onSave - Function that is called when the save button is clicked.
 *
 * @returns A SaveProjectModal component.
 */
export default function SaveProjectModal(props: {
    modalContent: { show: boolean; projectName: string; errorMessage: string };
    setModalContent: (content: {
        show: boolean;
        projectName: string;
        errorMessage: string;
    }) => void;
    onSave: () => void;
}) {
    const { modalContent, setModalContent, onSave } = props;
    function closeModal() {
        setModalContent({ ...modalContent, show: false });
    }
    return (
        <Modal showModal={modalContent.show} closeModal={closeModal}>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
                <div className="w-96 space-y-5 rounded bg-white p-2">
                    <div className="my-3 flex justify-between p-3 text-gray-700">
                        <h1 className="text-xl font-semibold">
                            Proje İsmini Giriniz
                        </h1>
                        <button
                            className="text-md font-extrabold"
                            onClick={closeModal}
                        >
                            X
                        </button>
                    </div>
                    <hr className="text-gray-300" />
                    <div>
                        <input
                            type="text"
                            className="h-12 w-full rounded-lg bg-gray-200 p-2"
                            value={modalContent.projectName}
                            onChange={(e) =>
                                setModalContent({
                                    ...modalContent,
                                    projectName: e.target.value,
                                })
                            }
                        />
                    </div>
                    <hr className="text-gray-300" />
                    {modalContent.errorMessage && (
                        <p className="text-red-500 ">
                            !!! {modalContent.errorMessage} !!!
                        </p>
                    )}
                    <div className="p-3 text-right">
                        <button
                            onClick={onSave}
                            className="rounded bg-soilprimeGreen px-5 py-2 font-semibold text-white hover:bg-soilprimeLight"
                        >
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
