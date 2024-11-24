import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const StudentManagement = ({ students }) => {
    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Management</h2>}>
            <Head title="Student Management" />
            <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <Link href="/students/create" className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                    Add Student
                </Link>
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">First Name</th>
                            <th className="px-4 py-2 border">Last Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Course</th>
                            <th className="px-4 py-2 border">Faculty</th>
                            <th className="px-4 py-2 border">Year</th>
                            <th className="px-4 py-2 border">Badge</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-100 transition duration-150">
                                <td className="px-4 py-2 border">{student.first_name}</td>
                                <td className="px-4 py-2 border">{student.last_name}</td>
                                <td className="px-4 py-2 border">{student.email}</td>
                                <td className="px-4 py-2 border">{student.course?.name}</td>
                                <td className="px-4 py-2 border">{student.faculty?.name}</td>
                                <td className="px-4 py-2 border">{student.year?.year}</td>
                                <td className="px-4 py-2 border">{student.badge?.badge_number}</td>
                                <td className="px-4 py-2 border space-x-2">
                                    <Link
                                        href={`/students/${student.id}/edit`}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/students/${student.id}`}
                                        method="delete"
                                        as="button"
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={(e) => {
                                            if (!confirm("Are you sure you want to delete this student?")) {
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default StudentManagement;
