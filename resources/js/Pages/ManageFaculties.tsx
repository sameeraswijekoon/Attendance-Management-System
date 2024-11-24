import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

interface Faculty {
    id: number;
    name: string;
}

const handlePageRefresh = () => {
    window.location.reload();
};

const FacultyManagement: React.FC = () => {
    const { faculties: initialFaculties, flash } = usePage().props as { faculties: Faculty[], flash: any };
    const [faculties, setFaculties] = useState<Faculty[]>(initialFaculties);
    const [facultyData, setFacultyData] = useState({ name: '' });
    const [message, setMessage] = useState('');
    const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
    const [name, setName] = useState('');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 1500);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleFacultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFacultyData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFacultySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Submitting your data...');

        Inertia.post('/faculties', facultyData, {
            onSuccess: () => {
                setFacultyData({ name: '' });
                setMessage('Faculty added successfully!');
                setFaculties([...faculties, { id: faculties.length + 1, ...facultyData }]);
            },
            onError: () => setMessage('Error adding faculty. Please try again.'),
        });
    };

    const handleEditClick = (faculty: Faculty) => {
        setEditingFaculty(faculty);
        setName(faculty.name);
    };

    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingFaculty) {
            Inertia.put(
                `/faculties/${editingFaculty.id}`,
                { name },
                {
                    onSuccess: () => {
                        setEditingFaculty(null);
                        setName('');
                        setFaculties(faculties.map(f => (f.id === editingFaculty.id ? { ...f, name } : f)));
                        setMessage('Faculty updated successfully!');
                    }
                }
            );
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this faculty?')) {
            Inertia.delete(`/faculties/${id}`, {
                onSuccess: () => {
                    setFaculties(faculties.filter(f => f.id !== id));
                    setMessage('Faculty deleted successfully!');
                }
            });
        }
    };

    return (
        <AuthenticatedLayout header={
            <h2 className="text-2xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Faculty Management
            </h2>
        }>
            <Head title="Faculty Management" />
            <div className="py-12 bg-gradient-to-b from-blue-50 to-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md mb-8 transition-all duration-500 hover:shadow-lg">
                        {flash?.success && (
                            <div className="p-4 mb-4 text-blue-800 bg-blue-100 border border-blue-300 rounded-lg">
                                {flash.success}
                            </div>
                        )}
                        {message && (
                            <div className={`p-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-800 border-red-300' : 'bg-blue-100 text-blue-800 border-blue-300'} border`}>
                                {message}
                            </div>
                        )}

                        <div className="p-6">
                            <form onSubmit={handleFacultySubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Faculty Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={facultyData.name}
                                        onChange={handleFacultyChange}
                                        placeholder="Enter faculty name"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                    />
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                                    Save Faculty
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-500 hover:shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 flex justify-between items-center mb-6">
                            Available Faculties
                            <button
                                onClick={handlePageRefresh}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md transition-all duration-300 hover:bg-blue-800  hover:shadow-lg"

                            >
                                Refresh Page
                            </button>
                        </h3>

                        <ul className="space-y-4">
                            {faculties.map((faculty) => (
                                <li key={faculty.id} className="flex justify-between items-center p-4 bg-blue-50 rounded-md shadow-sm transition-all duration-300 hover:bg-blue-100">
                                    {editingFaculty?.id === faculty.id ? (
                                        <form onSubmit={handleUpdateSubmit} className="flex items-center space-x-2 w-full">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                            />
                                            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-md shadow-md transition-all duration-300 hover:shadow-lg">
                                                Update
                                            </button>
                                            <button
                                                onClick={() => setEditingFaculty(null)}
                                                className="px-4 py-2 bg-gray-300 rounded-md transition-all duration-300 hover:bg-gray-400"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <span className="font-medium text-gray-800">
                                                {faculty.name}
                                            </span>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditClick(faculty)}
                                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(faculty.id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FacultyManagement;
