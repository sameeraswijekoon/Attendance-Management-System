import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Bell, X, ChevronRight, Clock } from 'lucide-react';

interface Notification {
    id: number;
    subject: string;
    author: string;
    description: string;
    created_at: string;
}

interface UserNotificationProps {
    notifications?: Notification[];
}

const UserNotification: React.FC<UserNotificationProps> = ({ notifications = [] }) => {
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeNotifications, setActiveNotifications] = useState(notifications);

    const openModal = (notification: Notification) => {
        setSelectedNotification(notification);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedNotification(null);
        setIsModalOpen(false);
    };

    const removeNotification = (id: number) => {
        setActiveNotifications(activeNotifications.filter(notification => notification.id !== id));
    };

    const shareOnWhatsApp = () => {
        if (selectedNotification) {
            const message = `Notification: ${selectedNotification.subject}\nAuthor: ${selectedNotification.author}\nDate: ${new Date(selectedNotification.created_at).toLocaleString()}\n\n${selectedNotification.description}`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Notifications</h2>}>
            <Head title="Notifications" />

            <div className="relative min-h-screen text-white overflow-hidden">
                {/* Background Video Layer */}
                <div className="absolute inset-0">
                    <video
                        src="/Abstract business background newsroom geometric futuristic field white with black lines 3 HD(1080P_HD).mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        aria-label="Campus View Background Video"
                    />
                    <div className="absolute inset-0 bg-black opacity-0" />
                </div>

                <div className="relative z-10 min-h-screen">
                    <div className="max-w-7xl mx-auto p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center space-x-4">
                                <Bell className="w-8 h-8 text-red-300" />
                                <h1 className="text-4xl font-bold tracking-wide text-black">Notifications</h1>
                            </div>
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 rounded-full shadow-lg">
                                <span className="text-white font-semibold tracking-wide">
                                    {activeNotifications.length || 0} Updates
                                </span>
                            </div>
                        </div>

                        {activeNotifications.length === 0 ? (
                            <div className="bg-white bg-opacity-75 rounded-2xl shadow-lg p-12 text-center">
                                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Notifications</h3>
                                <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {activeNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="bg-white bg-opacity-75 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
                                    >
                                        <button
                                            onClick={() => removeNotification(notification.id)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-bold text-gray-900 tracking-wide">
                                                    {notification.subject}
                                                </h3>
                                                <div className="flex items-center text-sm text-gray-500 space-x-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {new Date(notification.created_at).toLocaleDateString()} : {new Date(notification.created_at).toLocaleTimeString()}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-2">
                                                By <span className="text-blue-600 font-semibold">{notification.author}</span>
                                            </p>

                                            <p className="text-gray-700 line-clamp-2 mb-4 leading-relaxed">
                                                {notification.description}
                                            </p>

                                            <button
                                                onClick={() => openModal(notification)}
                                                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-200 flex items-center justify-between"
                                            >
                                                <span>View Details</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {isModalOpen && selectedNotification && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto relative p-8">
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                        {selectedNotification.subject}
                                    </h3>

                                    <div className="flex items-center space-x-2 text-gray-500 mb-6">
                                        <span className="text-blue-600 font-semibold">{selectedNotification.author}</span>
                                        <span>•</span>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">
                                                {new Date(selectedNotification.created_at).toLocaleDateString()} : {new Date(selectedNotification.created_at).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        {selectedNotification.description}
                                    </p>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={shareOnWhatsApp}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                                        >
                                            Share on WhatsApp
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserNotification;
