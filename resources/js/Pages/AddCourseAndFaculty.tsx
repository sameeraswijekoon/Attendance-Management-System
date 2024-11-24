import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const AddCourseAndFaculty: React.FC = () => {
    const [courseData, setCourseData] = useState({
        name: '',
        code: '',
    });

    const [facultyData, setFacultyData] = useState({
        name: '',
    });

    const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFacultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFacultyData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCourseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post('/courses', courseData);
    };

    const handleFacultySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post('/faculties', facultyData);
    };

    return (
        <AuthenticatedLayout header={
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Add Course and Faculty
            </h2>
        }>
            <Head title="Add Course and Faculty" />
            <div className="py-12 bg-gradient-to-b from-blue-50 to-white min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-10">
                    {/* Course Form */}
                    <div className="bg-white shadow-xl rounded-xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-105">
                        <form onSubmit={handleCourseSubmit} className="space-y-6">
                            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Add Course
                            </h3>
                            <div className="space-y-4">
                                <div className="relative group">
                                    <label htmlFor="name" className="block text-gray-700 font-medium">
                                        Course Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Course Name"
                                        value={courseData.name}
                                        onChange={handleCourseChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:border-blue-400"
                                    />
                                </div>
                                <div className="relative group">
                                    <label htmlFor="code" className="block text-gray-700 font-medium">
                                        Course Code:
                                    </label>
                                    <input
                                        type="text"
                                        name="code"
                                        placeholder="Course Code"
                                        value={courseData.code}
                                        onChange={handleCourseChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:border-blue-400"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                            >
                                Save Course
                            </button>
                        </form>
                    </div>

                    {/* Faculty Form */}
                    <div className="bg-white shadow-xl rounded-xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-105">
                        <form onSubmit={handleFacultySubmit} className="space-y-6">
                            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Add Faculty
                            </h3>
                            <div className="relative group">
                                <label htmlFor="name" className="block text-gray-700 font-medium">
                                    Faculty Name:
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Faculty Name"
                                    value={facultyData.name}
                                    onChange={handleFacultyChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:border-blue-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                            >
                                Save Faculty
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AddCourseAndFaculty;
