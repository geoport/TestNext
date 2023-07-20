import React from 'react';

/**
 * A simple Error message component.
 *
 * @param message - The message to display.
 *
 * @returns The error message component.
 */
export function ErrorMessage(props: { message: string }) {
    return (
        <div
            className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
        >
            <span
                className="block sm:inline"
                dangerouslySetInnerHTML={{ __html: props.message }}
            />
        </div>
    );
}

/**
 * A simple Warning message component.
 *
 * @param message - The message to display.
 *
 * @returns The warning message component.
 */
export function WarningMessage(props: { message: string }) {
    return (
        <div
            className="relative rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700"
            role="alert"
        >
            <span
                className="block sm:inline"
                dangerouslySetInnerHTML={{ __html: props.message }}
            />
        </div>
    );
}
