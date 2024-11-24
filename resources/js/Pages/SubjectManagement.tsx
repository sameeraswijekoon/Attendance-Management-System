import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const SubjectManagement = ({ subjects }) => {
    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subject Management</h2>}>
            <Head title="Subject Management" />
            <div className="max-w-6xl mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-blue-700 mb-6">Subject Management</h1>

                <Link
                    href="/subjects/create"
                    className="inline-block mb-6 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 transition-colors duration-200"
                >
                    Add Subject
                </Link>

                <table className="w-full text-left border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 border-b">Name</th>
                            <th className="px-4 py-3 border-b">Code</th>
                            <th className="px-4 py-3 border-b">Description</th>
                            <th className="px-4 py-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject) => (
                            <tr key={subject.id} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-4 py-3 border-b text-gray-700">{subject.name}</td>
                                <td className="px-4 py-3 border-b text-gray-700">{subject.code}</td>
                                <td className="px-4 py-3 border-b text-gray-600">{subject.description}</td>
                                <td className="px-4 py-3 border-b">
                                    <div className="space-y-2">
                                        <Link
                                            href={`/subjects/${subject.id}/edit`}
                                            className="block px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-center"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/subjects/${subject.id}`}
                                            method="delete"
                                            as="button"
                                            className="block px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-center"
                                            onClick={(e) => {
                                                if (!confirm("Are you sure you want to delete this subject?")) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default SubjectManagement;
