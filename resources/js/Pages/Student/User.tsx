import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

interface Badge {
    id: number;
    year: string;
    badge_number: string;
}

interface Course {
    id: number;
    name: string;
    code: string;
}

interface Faculty {
    id: number;
    name: string;
}

interface Props {
    badges: Badge[];
    courses: Course[];
    faculties: Faculty[];
}

const User: React.FC<Props> = ({ badges, courses, faculties }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        badge_id: '',
        course_id: '',
        faculty_id: '',
        year_id: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post('/users', formData);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Create New User</h2>
            <form onSubmit={handleSubmit}>

                {/* Basic User Fields */}
                <div className="mb-4">
                    <label className="block text-gray-700">User Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Student">Student</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Coordinator">Coordinator</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                {/* Conditional Fields */}
                {formData.role === 'Student' && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700">Badge</label>
                            <select
                                name="badge_id"
                                value={formData.badge_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="">Select Badge</option>
                                {badges.map((badge) => (
                                    <option key={badge.id} value={badge.id}>
                                        {badge.badge_number} - {badge.year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Course</label>
                            <select
                                name="course_id"
                                value={formData.course_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="">Select Course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Faculty</label>
                            <select
                                name="faculty_id"
                                value={formData.faculty_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="">Select Faculty</option>
                                {faculties.map((faculty) => (
                                    <option key={faculty.id} value={faculty.id}>
                                        {faculty.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                {formData.role === 'Lecturer' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Faculty</label>
                        <select
                            name="faculty_id"
                            value={formData.faculty_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Select Faculty</option>
                            {faculties.map((faculty) => (
                                <option key={faculty.id} value={faculty.id}>
                                    {faculty.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Create User
                </button>
            </form>
        </div>
    );
};

export default User;
