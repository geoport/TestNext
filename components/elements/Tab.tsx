import React from 'react';
import { Tab } from '@headlessui/react';

/**
 * This component represents a single link within a tabbed interface.
 * It is used in conjunction with the TabBar and TabContent components.
 *
 * @param title - The text to display for the link.
 * @param hide - Whether the link should be hidden or not (optional).
 *
 * @returns A TabLink component.
 */
export function TabLink(props: { title: string; hide?: boolean }) {
    const { title, hide } = props;
    const inactiveClassName = `
        nav-link block font-medium
        leading-tight
        uppercase
        border-x-0 border-t-0 border-b-2 border-transparent
        px-6
        py-3
        hover:border-transparent hover:bg-gray-100
        focus:border-transparent 
        text-xs
        `;

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <div style={{ display: hide ? 'none' : '' }}>
            <Tab
                className={({ selected }: { selected: boolean }) =>
                    classNames(
                        inactiveClassName,
                        selected
                            ? 'bg-grey-100 text-blue-500'
                            : 'text-grey-100',
                    )
                }
                id={title}
            >
                {title}
            </Tab>
        </div>
    );
}

/**
 * This component represents the tab bar for a tabbed interface.
 * It is used in conjunction with the TabLink and TabContent components.
 *
 * @param vertical - A boolean indicating whether the tab interface is displayed vertically (optional).
 * @param children - The TabLink components to display.
 *
 * @returns A TabBar component.
 */
export function TabBar(props: {
    vertical?: boolean;
    children: React.ReactNode;
}) {
    const { vertical, children } = props;
    const className = `
        nav nav-tabs flex flex-wrap list-none border-b-0 pl-0 min-w-fit
        ${vertical ? 'flex-col mr-4' : 'mb-4 md:flex-row'}
        `;
    return <Tab.List className={className}>{children}</Tab.List>;
}

/**
 * This component represents the content of a single tab within a tabbed interface.
 * It is used in conjunction with the TabBar and TabLink components.
 *
 * @param id - A unique string identifier for the tab.
 * @param children - The content to display within the tab.
 *
 * @returns A TabContent component.
 */
export function TabContent(props: { id: string; children: React.ReactNode }) {
    const { children, id } = props;
    const className = `tab-pane fade show p-3 w-full`;
    return (
        <Tab.Panel className={className} id={id}>
            {children}
        </Tab.Panel>
    );
}

/**
 * This component represents the container for all of the tab contents within a tabbed interface.
 * It is used in conjunction with the TabBar and TabContent components.
 *
 * @param children - The TabContent components to display.
 *
 * @returns A TabContentWrapper component.
 */
export function TabContentWrapper(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <Tab.Panels className="tab-content h-fit w-full rounded border border-solid border-current">
            {children}
        </Tab.Panels>
    );
}

/**
 * This component represents the wrapper for the entire tabbed interface.
 * It is used in conjunction with the TabBar, TabContent, and TabContentWrapper components.
 *
 * @param vertical - A boolean indicating whether the tab interface is displayed vertically (optional).
 * @param children - The TabBar, TabContent, and TabContentWrapper components to display.
 *
 * @returns A TabWrapper component.
 */
export function TabWrapper(props: {
    vertical?: boolean;
    children: React.ReactNode;
    defaultIndex?: number;
}) {
    const { vertical, children, defaultIndex } = props;
    if (vertical) {
        return (
            <Tab.Group defaultIndex={defaultIndex}>
                <div className="flex">{children}</div>
            </Tab.Group>
        );
    } else {
        return <Tab.Group defaultIndex={defaultIndex}>{children}</Tab.Group>;
    }
}
