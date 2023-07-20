import React, { ReactNode } from 'react';
import Image from 'next/image';
import PopoverButton from './Popover';
import { CalculatorIcon } from '@heroicons/react/24/solid';

/**
 * Button component for submit events
 *
 * @param onClick - onClick event handler
 * @param children - button text or image
 * @param disabled - disable property for button (optional)
 *
 * @returns \{JSX.Element\} Submit button component
 */
export function SubmitButton(props: {
    onClick: (() => void) | (() => Promise<void>);
    children: ReactNode;
    disabled?: boolean;
}) {
    return (
        <button
            type="submit"
            className="inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}

/**
 * Button with border
 *
 * @param onClick - onClick event handler
 * @param children - button text or image
 * @param disabled - disable property for button (optional)
 *
 * @returns \{JSX.Element\} bordered button component
 */
export function BorderButton(props: {
    onClick: (() => void) | (() => Promise<void>);
    disabled?: boolean;
    children: ReactNode;
}) {
    const { disabled, onClick, children } = props;
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className="rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:bg-blue-500 hover:text-white"
        >
            {children}
        </button>
    );
}

/**
 * Button component for add row events on tables
 *
 * @param onClick - onClick event handler
 *
 * @returns \{JSX.Element\} Add row button component
 */
export function AddRowButton(props: {
    onClick: (() => void) | (() => Promise<void>);
}) {
    return (
        <a
            className="flex w-full justify-center py-3 text-xs font-medium uppercase text-blue-600 transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            onClick={props.onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8"
            >
                <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clipRule="evenodd"
                />
            </svg>
        </a>
    );
}

/**
 * Button component for delete row events on tables
 *
 * @param onClick - onClick event handler
 *
 * @returns \{JSX.Element\} Delete row button component
 */
export function DeleteRowButton(props: {
    onClick: (() => void) | (() => Promise<void>);
}) {
    return (
        <td className="border border-slate-600">
            <DeleteTabButton onClick={props.onClick} />
        </td>
    );
}

/**
 * Button component for delete tab event on vertical tabs
 *
 * @param onClick - onClick event handler
 *
 * @returns \{JSX.Element\} Delete tab button component
 */
export function DeleteTabButton(props: {
    onClick: (() => void) | (() => Promise<void>);
}) {
    return (
        <a
            className="text-xs font-medium uppercase text-red-600 transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            onClick={props.onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mx-auto h-6 w-full"
            >
                <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                />
            </svg>
        </a>
    );
}

/**
 * Button component for moving tab up on vertical tabs
 *
 * @param onClick - onClick event handler
 *
 * @returns \{JSX.Element\} Move up button component
 */
export function MoveUpButton(props: {
    onClick: (() => void) | (() => Promise<void>);
}) {
    return (
        <a
            className="place-content-end bg-sky-500 text-xs font-medium uppercase transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            onClick={props.onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="h-6 w-6"
            >
                <path
                    fillRule="evenodd"
                    d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z"
                    clipRule="evenodd"
                />
            </svg>
        </a>
    );
}

/**
 * Button component for moving tab down on vertical tabs
 *
 * @param onClick - onClick event handler
 *
 * @returns \{JSX.Element\} Move down button component
 */
export function MoveDownButton(props: {
    onClick: (() => void) | (() => Promise<void>);
}) {
    return (
        <a
            className="place-content-end bg-amber-300 text-xs font-medium uppercase transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            onClick={props.onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
            >
                <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        </a>
    );
}

/**
 * Button component for downloading excel file
 *
 * @param onClick - onClick event handler
 * @param children - button text or image
 *
 * @returns \{JSX.Element\} Download excel button component
 */
export function DownloadExcelButton(props: {
    onClick: (() => void) | (() => Promise<void>);
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            className="dark:focus:ring-[#3b5998]/55 mr-2 mb-2 inline-flex items-center rounded-lg bg-[#ffffff] px-5 py-2.5 text-center text-sm font-medium text-black focus:outline-none focus:ring-4"
            onClick={props.onClick}
        >
            <Image
                src="/assets/imgs/icons/excel.png"
                width={30}
                height={30}
                alt="Excel"
            />
            {props.children}
        </button>
    );
}

/**
 * A reusable hint button component that renders a hint button with a popover.
 * The popover is rendered when the user clicks on the hint button.
 *
 * @returns The JSX element of the hint button.
 */
export function HintButton(props: { hintContent: JSX.Element }) {
    return (
        <div className="ml-4">
            <PopoverButton
                clickableElement={<b>?</b>}
                popoverContent={props.hintContent}
            />
        </div>
    );
}

/**
 * A reusable correlation button component that renders a correlation button with a popover.
 * The popover is rendered when the user clicks on the correlation button.
 *
 * @returns The JSX element of the correlation button.
 */
export function CorrelationButton(props: { popoverContent: JSX.Element }) {
    return (
        <div className="ml-4">
            <PopoverButton
                clickableElement={<CalculatorIcon className="h-4 w-4" />}
                popoverContent={props.popoverContent}
            />
        </div>
    );
}
