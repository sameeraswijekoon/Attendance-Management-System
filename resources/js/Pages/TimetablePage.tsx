import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

interface TimetablePageProps {
    courses: { id: number; name: string }[];
    subjects: { id: number; name: string; code: string }[];
    timetables: { course_id: number; day: string; time: string; subject_id: number | null }[];
}

const TimetablePage: React.FC<TimetablePageProps> = ({ courses, subjects, timetables }) => {
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = ['8:00-10:00', '10:30-12:30', '13:00-15:00', '15:00-17:00'];

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const courseId = parseInt(e.target.value);
        setSelectedCourseId(courseId);
    };

    const handleSubjectChange = (courseId: number, day: string, time: string, subjectId: string) => {
        router.post('/timetables/update', {
            course_id: courseId,
            day: day,
            time: time,
            subject_id: subjectId ? parseInt(subjectId) : null,
        });
    };

    const getSubjectForSlot = (day: string, time: string): string => {
        const timetableEntry = timetables.find(
            (entry) => entry.course_id === selectedCourseId && entry.day === day && entry.time === time
        );
        return timetableEntry ? timetableEntry.subject_id?.toString() || '' : '';
    };

    const handleSendWhatsApp = () => {
        const course = courses.find(course => course.id === selectedCourseId);
        if (!course) return;

        let message = `Timetable for ${course.name}:\n\n`;
        daysOfWeek.forEach(day => {
            const dayMessage = timeSlots
                .map(time => {
                    const subjectId = getSubjectForSlot(day, time);
                    if (subjectId) {
                        const subject = subjects.find(s => s.id === parseInt(subjectId));
                        const subjectDisplayName = subject ? `${subject.name} (${subject.code})` : "No Subject";
                        return `${subjectDisplayName} | ${time}`;
                    }
                    return null;
                })
                .filter(Boolean)
                .join("\n");

            if (dayMessage) {
                message += `*${day}*\n${dayMessage}\n\n`;
            }
        });

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <Head title="Timetable Management" />
                <h2 className="text-3xl font-bold text-blue-600 mb-6">Timetable Management</h2>

                {/* Course Selection Dropdown */}
                <div className="mb-4">
                    <label htmlFor="course" className="block text-lg font-semibold text-gray-700 mb-2">Select Course</label>
                    <select
                        id="course"
                        onChange={handleCourseChange}
                        className="w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-400 focus:border-blue-400 p-2 transition duration-200"
                    >
                        <option value="">-- Select a Course --</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                </div>

                {/* Display Timetable only if a course is selected */}
                {selectedCourseId && (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Timetable for {courses.find(course => course.id === selectedCourseId)?.name}
                            </h3>
                            <button
                                onClick={handleSendWhatsApp}
                                className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-3 py-2 rounded-md shadow-lg hover:from-[#20c157] hover:to-[#0e795f] transition duration-200"
                            >
                                Send via WhatsApp
                            </button>
                        </div>

                        {/* Timetable Grid */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm border border-gray-300 rounded-lg shadow-md">
                                <thead className="bg-blue-50 text-blue-700 font-medium">
                                    <tr>
                                        <th className="px-3 py-2 text-left border-r">Time</th>
                                        {daysOfWeek.map((day) => (
                                            <th key={day} className="px-3 py-2 text-left border-r">{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600">
                                    {timeSlots.map((time) => (
                                        <tr key={time} className="bg-white hover:bg-gray-50 transition duration-150">
                                            <td className="px-3 py-2 border-r font-medium text-gray-700">{time}</td>
                                            {daysOfWeek.map((day) => (
                                                <td key={`${day}-${time}`} className="px-3 py-2 border-r">
                                                    <select
                                                        className="w-full text-gray-700 bg-transparent border-none focus:ring-0 focus:border-0"
                                                        value={getSubjectForSlot(day, time)}
                                                        onChange={(e) => handleSubjectChange(selectedCourseId, day, time, e.target.value)}
                                                        style={{ backgroundColor: getSubjectColor(getSubjectForSlot(day, time)) }}
                                                    >
                                                        <option value="">No Class</option>
                                                        {subjects.map((subject) => (
                                                            <option key={subject.id} value={subject.id.toString()}>
                                                                {subject.name} ({subject.code})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

// Helper function to assign colors to subjects for visual distinction
const getSubjectColor = (subjectId: string) => {
    const colors = ['#D1E8FF', '#FFE5D8', '#D3FFD4', '#FFE3F1', '#FFF9C4'];
    if (!subjectId) return 'transparent';
    return colors[parseInt(subjectId) % colors.length];
};

export default TimetablePage;
