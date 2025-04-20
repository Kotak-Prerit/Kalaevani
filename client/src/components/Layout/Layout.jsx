import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <main className="flex-grow relative">
                {children}
            </main>
        </div>
    );
};

export default Layout; 