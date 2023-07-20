import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

/**
 * A button that opens a popover when clicked.
 * @param clickableElement - The element that will be clickable and open the popover.
 * @param popoverContent - The content of the popover.
 * @returns A PopoverButton component.
 */
export default function PopoverButton(props: {
    clickableElement: JSX.Element;
    popoverContent: JSX.Element;
}) {
    return (
        <Popover className="relative">
            <Popover.Button>{props.clickableElement}</Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="fixed top-1/2 left-1/2 z-10  mt-3 w-screen max-w-sm -translate-y-1/2 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative bg-white p-7 ">
                            {props.popoverContent}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}
