import React from 'react';
import { Dialog } from '@headlessui/react';
import Modal from './modal';

/**
 * React component for displaying an error modal.
 *
 * @param show - A boolean value indicating whether the modal should be displayed or not.
 * @param title - The title of the modal.
 * @param content - The content to be displayed in the body of the modal.
 * @param setModalContent - A function that sets the content of the modal.
 *
 * @returns A JSX element representing the error modal component.
 */
export default function ErrorModal(props: {
    modalContent: { show: boolean; title: string; content: string };
    setModalContent: (content: {
        show: boolean;
        title: string;
        content: string;
    }) => void;
}) {
    const { modalContent, setModalContent } = props;
    function closeModal() {
        setModalContent({ ...modalContent, show: false });
    }
    return (
        <Modal showModal={modalContent.show} closeModal={closeModal}>
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-r-2xl border-l-8 border-red-500 bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                    as="h3"
                    className="text-md font-medium uppercase leading-6 text-gray-900"
                >
                    {modalContent.title}
                </Dialog.Title>
                <div className="mt-2">
                    <div
                        className="text-sm text-gray-500"
                        dangerouslySetInnerHTML={{
                            __html: modalContent.content,
                        }}
                    />
                </div>
            </Dialog.Panel>
        </Modal>
    );
}
