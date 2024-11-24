import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';

interface NotificationProps {
    notifications: {
        id: number;
        subject: string;
        author: string;
        description: string;
        created_at: string;
    }[];
}

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
    const [subject, setSubject] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentNotificationId, setCurrentNotificationId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editMode && currentNotificationId !== null) {
            Inertia.put(`/notifications/${currentNotificationId}`, { subject, author, description }, {
                onSuccess: () => resetForm(),
            });
        } else {
            Inertia.post('/notifications', { subject, author, description }, {
                onSuccess: () => resetForm(),
            });
        }
    };

    const resetForm = () => {
        setSubject('');
        setAuthor('');
        setDescription('');
        setEditMode(false);
        setCurrentNotificationId(null);
    };

    const handleEdit = (notification: NotificationProps['notifications'][0]) => {
        setSubject(notification.subject);
        setAuthor(notification.author);
        setDescription(notification.description);
        setCurrentNotificationId(notification.id);
        setEditMode(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this notification?')) {
            Inertia.delete(`/notifications/${id}`);
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-2xl text-white ">Notifications</h2>}>
            <Head title="Notifications" />

            <div className="p-6 bg-gradient-to-r from-white-100 to-blue-200 min-h-screen flex justify-center">
                <div className="max-w-5xl w-full">
                    <h2 className="text-3xl font-bold mb-8 text-blue-900">
                        {editMode ? 'Edit Notification' : 'Create Notification'}
                    </h2>

                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-10 mb-12 border border-blue-200">
                        <div className="mb-6">
                            <label className="block text-blue-900 font-medium">Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full mt-2 px-4 py-3 border border-blue-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-blue-900 font-medium">Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full mt-2 px-4 py-3 border border-blue-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-blue-900 font-medium">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full mt-2 px-4 py-3 border border-blue-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-blue-800 transition duration-200"
                        >
                            {editMode ? 'Update Notification' : 'Create Notification'}
                        </button>
                        {editMode && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="w-full mt-3 px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-200"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </form>

                    <div className="bg-white rounded-2xl shadow-lg p-10 border border-blue-200">
                        <h3 className="text-2xl font-semibold text-blue-900 mb-6">All Notifications</h3>
                        <ul>
                            {notifications.map((notification) => (
                                <li key={notification.id} className="border-b border-blue-200 py-6 last:border-b-0">
                                    <h4 className="text-xl font-bold text-blue-800 mb-1">{notification.subject}</h4>
                                    <p className="text-blue-600 mb-1">By: <span className="text-blue-700 font-medium">{notification.author}</span></p>
                                    <p className="text-blue-600 mb-2">{notification.description}</p>
                                    <span className="text-blue-400 text-sm">
                                        {new Date(notification.created_at).toLocaleString()}
                                    </span>
                                    <div className="flex mt-3 space-x-6">
                                        <button
                                            onClick={() => handleEdit(notification)}
                                            className="text-yellow-600 hover:text-yellow-700 font-semibold transition duration-150"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(notification.id)}
                                            className="text-red-600 hover:text-red-700 font-semibold transition duration-150"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Notification;
