import React from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 p-4 text-white text-center font-bold text-lg">
                {title || 'Dashboard'}
            </header>
            <main className="container mx-auto p-6">{children}</main>
        </div>
    );
};

export default AppLayout;
