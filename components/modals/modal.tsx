import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

/**
 * Modal component that wraps content in a Headless UI Dialog component and handles modal visibility.
 * @param showModal - Determines whether the modal is visible or not.
 * @param closeModal - Function to close the modal when called.
 * @param children - The content to be rendered inside the modal.
 * @returns The Modal component.
 */
export default function Modal(props: {
    showModal: boolean;
    closeModal: () => void;
    children: React.ReactNode;
}) {
    const { showModal, closeModal, children } = props;
    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {children}
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
