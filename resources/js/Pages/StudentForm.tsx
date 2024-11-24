import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const handlePageRefresh = () => {
    window.location.reload();
};

const StudentForm = ({ courses = [], faculties = [], years = [], student = null }) => {
    const [formData, setFormData] = useState({
        first_name: student?.first_name || '',
        last_name: student?.last_name || '',
        email: student?.email || '',
        student_id: student?.student_id || '',
        course_id: student?.course_id || '',
        faculty_id: student?.faculty_id || '',
        year_id: student?.year_id || '',
        badge_id: student?.badge_id || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (student) {
            Inertia.put(`/students/${student.id}`, formData);
        } else {
            Inertia.post('/students', formData);
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{student ? 'Edit' : 'Add'} Student</h2>}>
            <Head title={student ? 'Edit Student' : 'Add Student'} />
            <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label htmlFor="first_name" className="block font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="last_name" className="block font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                            required
                        />
                    </div>

                    {/* Student ID */}
                    <div>
                        <label htmlFor="student_id" className="block font-medium text-gray-700">Student ID</label>
                        <input
                            type="text"
                            id="student_id"
                            name="student_id"
                            value={formData.student_id}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                            required
                        />
                    </div>

                    {/* Course Dropdown */}
                    <div>
                        <label htmlFor="course_id" className="block font-medium text-gray-700">Course</label>
                        <select
                            id="course_id"
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                            required
                        >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Faculty Dropdown */}
                    <div>
                        <label htmlFor="faculty_id" className="block font-medium text-gray-700">Faculty</label>
                        <select
                            id="faculty_id"
                            name="faculty_id"
                            value={formData.faculty_id}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                            required
                        >
                            <option value="">Select Faculty</option>
                            {faculties.map((faculty) => (
                                <option key={faculty.id} value={faculty.id}>
                                    {faculty.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Year Dropdown */}
                    <div>
                        <label htmlFor="year_id" className="block font-medium text-gray-700">Year</label>
                        <select
                            id="year_id"
                            name="year_id"
                            value={formData.year_id}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                            required
                        >
                            <option value="">Select Year</option>
                            {years.map((year) => (
                                <option key={year.id} value={year.id}>
                                    {year.year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Badge Dropdown */}
                    <div>
                        <label htmlFor="badge_id" className="block font-medium text-gray-700">Badge</label>
                        <select
                            id="badge_id"
                            name="badge_id"
                            value={formData.badge_id}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded mt-1 p-2"
                            required
                        >
                            <option value="">Select Badge</option>
                            {years.map((year) => (
                                <option key={year.id} value={year.id}>
                                    {year.badge_number}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        onClick={handlePageRefresh}

                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                    >
                        {student ? 'Update' : 'Save'} Student
                    </button>
                    <button
                        type="submit"

                        onClick={() => window.location.href = '/students'}

                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                    >
                       View Student
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default StudentForm;
