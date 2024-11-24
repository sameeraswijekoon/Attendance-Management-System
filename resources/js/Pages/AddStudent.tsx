// resources/js/Pages/AddStudent.tsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const AddStudent: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        nic: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        Inertia.post('/students', formData);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-2xl font-bold">Add New Student</h2>}>
            <Head title="Add Student" />
            <div className="py-12">
                <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="nic" className="block text-gray-700 text-sm font-bold mb-2">
                                NIC:
                            </label>
                            <input
                                type="text"
                                id="nic"
                                value={formData.nic}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save Student
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AddStudent;
