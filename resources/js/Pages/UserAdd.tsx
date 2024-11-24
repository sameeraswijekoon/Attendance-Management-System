import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function UserAdd({ badges, courses, faculties }) {
    const defaultPassword = 'Horizon@2024';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: defaultPassword,
        password_confirmation: defaultPassword,
        role: '',
        badge_id: '',
        course_id: '',
        faculty_id: '',
        year_id: '',
    });

    const [showStudentFields, setShowStudentFields] = useState(false);
    const [showLecturerFields, setShowLecturerFields] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setData('role', role);
        setShowStudentFields(role === 'Student');
        setShowLecturerFields(role === 'Lecturer');
    };

    const resetForm = () => {
        reset({
            name: '',
            email: '',
            password: defaultPassword,
            password_confirmation: defaultPassword,
            role: '',
            badge_id: '',
            course_id: '',
            faculty_id: '',
            year_id: '',
        });
        setShowStudentFields(false);
        setShowLecturerFields(false);
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('user.add'), {
            onSuccess: resetForm,
        });
    };

    const sendWhatsAppMessage = () => {
        const message = `User Registration Confirmation:
- Name: ${data.name}
- Email: ${data.email}
- Password: ${defaultPassword}
- Role: ${data.role}
- Badge: ${badges.find(b => b.id === data.badge_id)?.badge_number || 'N/A'}
- Course: ${courses.find(c => c.id === data.course_id)?.name || 'N/A'}
- Faculty: ${faculties.find(f => f.id === data.faculty_id)?.name || 'N/A'}
- Year: ${badges.find(y => y.id === data.year_id)?.year || 'N/A'}

Change password after you log in to the system.
Thank you for registering with us!`;

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg transform translate-y-4">
                <Head title="Add User" />

                {showSuccessMessage && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-center animate-fade-in">
                        User successfully registered! Form has been reset for new entry.
                    </div>
                )}

                <h2 className="text-3xl font-bold mb-6 text-gray-700">Add New User</h2>

                <form onSubmit={submit}>
                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full rounded-lg"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-lg"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-lg"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full rounded-lg"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="role" value="Select Role" />
                            <select
                                id="role"
                                name="role"
                                value={data.role}
                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
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

                        {showStudentFields && (
                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="badge_id" value="Badge" />
                                    <select
                                        id="badge_id"
                                        name="badge_id"
                                        value={data.badge_id}
                                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        onChange={(e) => setData('badge_id', e.target.value)}
                                    >
                                        <option value="">Select Badge</option>
                                        {badges.map((badge) => (
                                            <option key={badge.id} value={badge.id}>{badge.badge_number}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.badge_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="course_id" value="Course" />
                                    <select
                                        id="course_id"
                                        name="course_id"
                                        value={data.course_id}
                                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        onChange={(e) => setData('course_id', e.target.value)}
                                    >
                                        <option value="">Select Course</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>{course.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.course_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="faculty_id" value="Faculty" />
                                    <select
                                        id="faculty_id"
                                        name="faculty_id"
                                        value={data.faculty_id}
                                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        onChange={(e) => setData('faculty_id', e.target.value)}
                                    >
                                        <option value="">Select Faculty</option>
                                        {faculties.map((faculty) => (
                                            <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.faculty_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="year_id" value="Year" />
                                    <select
                                        id="year_id"
                                        name="year_id"
                                        value={data.year_id}
                                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        onChange={(e) => setData('year_id', e.target.value)}
                                    >
                                        <option value="">Select Year</option>
                                        {badges.map((year) => (
                                            <option key={year.id} value={year.id}>{year.year}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.year_id} className="mt-2" />
                                </div>
                            </div>
                        )}

                        {showLecturerFields && (
                            <div>
                                <InputLabel htmlFor="faculty_id" value="Faculty" />
                                <select
                                    id="faculty_id"
                                    name="faculty_id"
                                    value={data.faculty_id}
                                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => setData('faculty_id', e.target.value)}
                                >
                                    <option value="">Select Faculty</option>
                                    {faculties.map((faculty) => (
                                        <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.faculty_id} className="mt-2" />
                            </div>
                        )}

                        <div className="mt-6 flex items-center justify-center space-x-4">
                            <PrimaryButton
                                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900
                                         text-white px-8 py-3 rounded-full font-semibold shadow-lg
                                         transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
                                         focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
                                         disabled:opacity-70 disabled:cursor-not-allowed
                                         min-w-[160px] flex items-center justify-center gap-2"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    'Register'
                                )}
                            </PrimaryButton>

                            <PrimaryButton
                                type="button"
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg
                                         transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
                                         focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
                                onClick={sendWhatsAppMessage}
                            >
                                Send WhatsApp Confirmation
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
