import React, { ReactNode } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

/**
 * A simple accordion component that can be used to show/hide content.
 *
 * @param id - The id of the accordion. This is used to link the accordion to
 * the button that toggles it.
 * @param title - The title of the accordion.
 * @param hidden - Whether or not the accordion should be hidden (optional).
 * @param children - The content of the accordion.
 *
 * @returns The accordion component.
 */

export function Accordion(props: {
    id: string;
    title: string;
    hidden?: boolean;
    children: ReactNode;
}): JSX.Element {
    const { id, title, hidden, children } = props;

    return (
        <div
            className="accordion p-3"
            id={`${id}Container`}
            style={{ display: hidden ? 'none' : '' }}
        >
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button
                            className="accordion-button relative flex w-full items-center
              rounded-lg bg-blue-400 p-5 text-left text-base 
              font-medium uppercase text-white             
              transition hover:bg-blue-500 hover:text-gray-800"
                        >
                            <span>{title}</span>
                            {open ? (
                                <ChevronUpIcon
                                    className={`${
                                        open ? 'transform' : ''
                                    } text-white-500 h-5 w-5`}
                                />
                            ) : (
                                <ChevronDownIcon
                                    className={`${
                                        open ? 'transform' : ''
                                    } text-white-500 h-5 w-5`}
                                />
                            )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2">
                            {children}
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
