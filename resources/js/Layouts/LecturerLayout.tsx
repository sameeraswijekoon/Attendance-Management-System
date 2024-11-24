import React, { PropsWithChildren, ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface LecturerLayoutProps {
    header?: ReactNode;
}

const LecturerLayout: React.FC<PropsWithChildren<LecturerLayoutProps>> = ({ header, children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Lecturer Dashboard" />
            <nav className="bg-blue-600 p-4 shadow-lg">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <Link href="/" className="text-white text-2xl font-semibold">
                        Horizon Campus
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/lecturer-dashboard" className="text-white hover:text-gray-200">Dashboard</Link>

                        <Link href="/logout" method="post" as="button" className="text-white hover:text-gray-200">
                            Log Out
                        </Link>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow p-6">
                    <div className="max-w-7xl mx-auto text-xl font-semibold">{header}</div>
                </header>
            )}

            <main className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
};

export default LecturerLayout;
