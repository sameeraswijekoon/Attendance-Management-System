import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

interface DashboardProps {
    auth: {
        user: {
            name: string;
        };
    };
}

const Dashboard: React.FC<DashboardProps> = ({ auth }) => {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between transition-all duration-500 hover:scale-[1.02]">
                    <h2 className="text-2xl font-semibold leading-tight text-gray-800 bg-gradient-to-r from-blue-600 to-gray-400 bg-clip-text text-transparent animate-gradient">
                        Admin Dashboard
                    </h2>
                    <span className="text-lg font-medium text-gray-600">
                        Welcome, {auth.user.name}
                    </span>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gradient-to-b from-white to-gray-100 transition-all duration-700">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                        <div className="p-6 text-gray-800 text-lg font-semibold border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-200 shadow-inner">
                            Horizon Campus Admin Panel
                        </div>
                        <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50">
                            {[
                                { text: 'Add Student', url: '/user-add' },
                                { text: 'Add Courses', url: '/add-course-and-faculty' },
                                { text: 'Add Year and Badge', url: '/years' },
                                { text: 'Add Faculty', url: '/faculties' },
                                { text: 'Add Subject', url: '/subjects' },
                                { text: 'Add Lecture', url: '/lectures' },
                                { text: 'Motivation Quotes', url: '/quotes' },
                                { text: 'Time Table', url: '/timetables' },
                                { text: 'Add Notifications', url: '/notifications' },
                                { text: 'View Notification', url: '/user-notifications' },
                                { text: 'View Attendance', url: '/attendance/view' },
                                { text: 'Generate QR', url: '/generate-qr-form' },
                                { text: 'QR Scan Test', url: '/qr/scan' },
                                { text: 'Capture Image', url: '/capture-image' },


                            ].map((button, index) => (
                                <button
                                    key={index}
                                    onClick={() => window.location.href = button.url}
                                    className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-md hover:shadow-lg transition-all duration-500 transform hover:scale-105 active:scale-95"
                                >
                                    {button.text}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-lg transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-gray-500 bg-clip-text text-transparent mb-4 animate-gradient">
                            About This Dashboard
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            This is a placeholder for a sample paragraph. The content here is just for demonstration
                            purposes, providing a brief text block in your layout. You can replace this text with
                            relevant information as needed. It's intended to simulate how actual content might look in
                            this space, helping to visualize the overall structure and flow of the design.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
