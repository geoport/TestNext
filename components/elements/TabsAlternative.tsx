import React from 'react';

export function TabLink(props: {
    isActive: boolean;
    setOpenTab: Function;
    tabIndex: number;
    id: string;
    title?: string;
}) {
    const { isActive, setOpenTab, tabIndex, id, title } = props;
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
    return (
        <li className="-mb-px mr-2 ">
            <a
                className={
                    inactiveClassName +
                    (isActive ? 'bg-grey-100 text-blue-500' : 'text-grey-100')
                }
                onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(tabIndex);
                }}
                data-toggle="tab"
                href={id}
                role="tablist"
            >
                {!title ? `#${tabIndex + 1}` : title}
            </a>
        </li>
    );
}

export function TabBar(props: { children: React.ReactNode }) {
    return (
        <ul className="mb-0 flex list-none pb-4 pt-3" role="tablist">
            {props.children}
        </ul>
    );
}

export function TabContent(props: {
    children: React.ReactNode;
    isActive: boolean;
    id: string;
}) {
    const { children, isActive, id } = props;
    return (
        <div className={isActive ? 'block' : 'hidden'} id={id}>
            {children}
        </div>
    );
}

export function TabContentContainer(props: { children: React.ReactNode }) {
    return (
        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded border border-solid border-current bg-white shadow-lg">
            <div className="flex-auto px-4 py-5">
                <div className="tab-content tab-space">{props.children}</div>
            </div>
        </div>
    );
}

export function TabContainer(propos: { children: React.ReactNode }) {
    return (
        <div className="flex flex-wrap">
            <div className="w-full">{propos.children}</div>
        </div>
    );
}
