import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface Lecture {
    id: number;
    lecture_name: string;
    lecture_id: string;
}

interface Coordinator {
    id: number;
    name: string;
}

interface Assignment {
    id: number;
    subject: Subject;
    lecture: Lecture;
    coordinator: Coordinator;
}

interface PageProps {
    subjects: Subject[];
    lectures: Lecture[];
    assignments: Assignment[];
    flash: { success?: string };
}

const LectureSubject: React.FC = () => {
    const { subjects, lectures, assignments, flash } = usePage<PageProps>().props;
    const { data, setData, post, errors } = useForm({
        subject_id: '',
        lecture_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/lecture-subject');
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Assign Subject to Lecture</h2>}>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">Assign Subject to Lecture</h1>

                    {/* Success Message */}
                    {flash.success && <p className="text-green-600 mb-4">{flash.success}</p>}

                    {/* Form for selecting subject and lecture */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Select Subject</label>
                            <select
                                value={data.subject_id}
                                onChange={(e) => setData('subject_id', e.target.value)}
                                className="w-full border rounded px-4 py-2"
                            >
                                <option value="">Select a subject</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                                ))}
                            </select>
                            {errors.subject_id && <p className="text-red-600 text-sm">{errors.subject_id}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700">Select Lecture</label>
                            <select
                                value={data.lecture_id}
                                onChange={(e) => setData('lecture_id', e.target.value)}
                                className="w-full border rounded px-4 py-2"
                            >
                                <option value="">Select a lecture</option>
                                {lectures.map((lecture) => (
                                    <option key={lecture.id} value={lecture.id}>{lecture.lecture_name}</option>
                                ))}
                            </select>
                            {errors.lecture_id && <p className="text-red-600 text-sm">{errors.lecture_id}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700"
                        >
                            Assign Subject
                        </button>
                    </form>
                </div>

                {/* Table for displaying previous assignments */}
                <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Previous Assignments</h2>
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Coordinator ID</th>
                                <th className="py-3 px-6 text-left">Subject Code</th>
                                <th className="py-3 px-6 text-left">Subject Name</th>
                                <th className="py-3 px-6 text-left">Lecture Code</th>

                                <th className="py-3 px-6 text-left">Lecture Name</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {assignments.map((assignment) => (
                                <tr key={assignment.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6">{assignment.coordinator?.id}</td>
                                    <td className="py-3 px-6">{assignment.subject.code}</td>
                                    <td className="py-3 px-6">{assignment.subject.name}</td>
                                    <td className="py-3 px-6">{assignment.lecture.lecture_id}</td>

                                    <td className="py-3 px-6">{assignment.lecture.lecture_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default LectureSubject;
