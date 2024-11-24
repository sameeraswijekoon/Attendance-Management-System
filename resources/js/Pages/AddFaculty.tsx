import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

interface Faculty {
    id: number;
    name: string;
}

const AddFaculty: React.FC = () => {
    const [facultyData, setFacultyData] = useState({ name: '' });
    const [message, setMessage] = useState('');
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const { props } = usePage();

    useEffect(() => {
        fetchFaculties();
    }, []);

    const fetchFaculties = async () => {
        const response = await fetch('/api/faculties'); // Assuming an API endpoint exists
        const data = await response.json();
        setFaculties(data);
    };

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
                fetchFaculties(); // Refresh faculty list
            },
            onError: () => setMessage('Error adding faculty. Please try again.'),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Add Faculty</h2>}>
            <Head title="Add Faculty" />
            <div className="py-12 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {props.flash?.success && (
                            <div className="p-4 mb-4 text-green-700 bg-green-100 rounded border border-green-400">
                                {props.flash.success}
                            </div>
                        )}
                        {message && (
                            <div className={`p-4 rounded ${message.includes('Error') ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'}`}>
                                {message}
                            </div>
                        )}

                        <div className="p-6">
                            <form onSubmit={handleFacultySubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:-translate-y-0.5"
                                >
                                    Save Faculty
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Faculty List */}
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Available Faculties</h3>
                        <ul className="bg-white shadow-md rounded-lg p-4">
                            {faculties.map((faculty) => (
                                <li key={faculty.id} className="py-2 border-b last:border-b-0">
                                    {faculty.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};



export default AddFaculty;
