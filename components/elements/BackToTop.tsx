import React from 'react';
import ScrollToTop from 'react-scroll-up';

/**
 * Back to top button
 * @returns \{JSX.Element\} Back to top button
 */
export default function BackToTop(): JSX.Element {
    return (
        <ScrollToTop showUnder={160}>
            <a id="scrollUp">
                <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    ></path>
                </svg>
            </a>
        </ScrollToTop>
    );
}
