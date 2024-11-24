import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function Register({ badges, courses, faculties }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        badge_id: '',
        course_id: '',
        faculty_id: '',
        year_id: '',
    });

    const [showStudentFields, setShowStudentFields] = useState(false);
    const [showLecturerFields, setShowLecturerFields] = useState(false);

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setData('role', role);
        setShowStudentFields(role === 'Student');
        setShowLecturerFields(role === 'Lecturer');
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Role Selection */}
                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Select Role" />
                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        onChange={handleRoleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Student">Student</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Coordinator">Coordinator</option>
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                {/* Student Fields */}
                {showStudentFields && (
                    <>
                        {/* Badge */}
                        <div className="mt-4">
                            <InputLabel htmlFor="badge_id" value="Badge" />
                            <select
                                id="badge_id"
                                name="badge_id"
                                value={data.badge_id}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                onChange={(e) => setData('badge_id', e.target.value)}
                            >
                                <option value="">Select Badge</option>
                                {badges.map((badge) => (
                                    <option key={badge.id} value={badge.id}>
                                        {badge.badge_number}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.badge_id} className="mt-2" />
                        </div>

                        {/* Course */}
                        <div className="mt-4">
                            <InputLabel htmlFor="course_id" value="Course" />
                            <select
                                id="course_id"
                                name="course_id"
                                value={data.course_id}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                onChange={(e) => setData('course_id', e.target.value)}
                            >
                                <option value="">Select Course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.course_id} className="mt-2" />
                        </div>

                        {/* Faculty */}
                        <div className="mt-4">
                            <InputLabel htmlFor="faculty_id" value="Faculty" />
                            <select
                                id="faculty_id"
                                name="faculty_id"
                                value={data.faculty_id}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                onChange={(e) => setData('faculty_id', e.target.value)}
                            >
                                <option value="">Select Faculty</option>
                                {faculties.map((faculty) => (
                                    <option key={faculty.id} value={faculty.id}>
                                        {faculty.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.faculty_id} className="mt-2" />
                        </div>

                        {/* Year */}
                        <div className="mt-4">
                            <InputLabel htmlFor="year_id" value="Year" />
                            <select
                                id="year_id"
                                name="year_id"
                                value={data.year_id}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                onChange={(e) => setData('year_id', e.target.value)}
                            >
                                <option value="">Select Year</option>
                                {badges.map((year) => (
                                    <option key={year.id} value={year.id}>
                                        {year.year}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.year_id} className="mt-2" />
                        </div>
                    </>
                )}

                {/* Lecturer Fields */}
                {showLecturerFields && (
                    <div className="mt-4">
                        <InputLabel htmlFor="faculty_id" value="Faculty" />
                        <select
                            id="faculty_id"
                            name="faculty_id"
                            value={data.faculty_id}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            onChange={(e) => setData('faculty_id', e.target.value)}
                        >
                            <option value="">Select Faculty</option>
                            {faculties.map((faculty) => (
                                <option key={faculty.id} value={faculty.id}>
                                    {faculty.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.faculty_id} className="mt-2" />
                    </div>
                )}

                {/* Register Button */}
                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
