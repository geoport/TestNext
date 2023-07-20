import React from 'react';
import { Dialog } from '@headlessui/react';
import Modal from './modal';

/**
 * FailedAnalysisModal component displays a modal with a message that an
 * unexpected error occurred during analysis.
 *
 * @param showModal - Determines whether to show the modal or not
 * @param setModalContent - Function that sets the value of showModal to false
 *
 * @returns Rendered component
 */
export default function FailedAnalysisModal(props: {
    showModal: boolean;
    setModalContent: (value: boolean) => void;
}) {
    const { showModal, setModalContent } = props;
    function closeModal() {
        setModalContent(false);
    }
    return (
        <Modal showModal={showModal} closeModal={closeModal}>
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-r-2xl border-l-8 border-red-500 bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                    as="h3"
                    className="text-md font-medium uppercase leading-6 text-gray-900"
                >
                    Beklenmeyen Bir Hata Oluştu
                </Dialog.Title>
                <div className="mt-2">
                    <div className="text-sm text-gray-500">
                        <p>
                            Yazılım ekibimiz problemi çözüp en kısa zamanda
                            sizinle iletişime geçeceklerdir.
                        </p>
                    </div>
                </div>
            </Dialog.Panel>
        </Modal>
    );
}
