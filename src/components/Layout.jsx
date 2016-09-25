// @flow
import React from 'react';

type LayoutProps = {
    children?: any;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <div>
                menu items
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
