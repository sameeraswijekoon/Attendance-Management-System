// resources/js/Layouts/FacultyLayout.tsx

import React, { PropsWithChildren, ReactNode } from 'react';
import { Head } from '@inertiajs/inertia-react';

const FacultyLayout: React.FC<PropsWithChildren<{ title?: string }>> = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title} />
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center">
                        <h1 className="text-2xl font-bold">Faculty Management</h1>
                    </div>
                </div>
            </nav>

            <main className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
            </main>
        </div>
    );
};

export default FacultyLayout;
