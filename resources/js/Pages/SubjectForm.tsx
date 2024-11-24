// resources/js/Pages/SubjectForm.tsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const SubjectForm = ({ subject = null }) => {
    const [formData, setFormData] = useState({
        name: subject?.name || '',
        code: subject?.code || '',
        description: subject?.description || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (subject) {
            Inertia.put(`/subjects/${subject.id}`, formData);
        } else {
            Inertia.post('/subjects', formData);
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{subject ? 'Edit' : 'Add'} Subject</h2>}>
            <Head title={subject ? 'Edit Subject' : 'Add Subject'} />
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="code" className="block font-medium text-gray-700">Code</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                    >
                        {subject ? 'Update' : 'Save'} Subject
                    </button>
                    <button
                        type="submit"
                        onClick={() => window.location.href = '/subjects'}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                    >
                        View Subject
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default SubjectForm;
