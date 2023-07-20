import React from 'react';

/**
 * Displays the message of an error that occurred during authentication
 *
 * @param error - The error message to display
 * @returns A JSX element containing the error message
 */
export default function AuthError(props: { error: string }) {
    if (!props.error) {
        return null;
    }
    return (
        <div
            className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
        >
            <span className="block sm:inline">{props.error}</span>
        </div>
    );
}
