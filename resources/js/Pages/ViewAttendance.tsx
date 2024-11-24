import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AttendanceRecord {
    id: number;
    user: {
        id: number;
        name: string;
    };
    course: {
        id: number;
        name: string;
    };
    subject: {
        id: number;
        name: string;
    };
    attendance_date: string;
}

interface GroupedAttendance {
    courseName: string;
    subjects: {
        subjectName: string;
        students: {
            id: number;
            name: string;
            attendanceCount: number;
        }[];
    }[];
}

const ViewAttendance: React.FC = () => {
    const { attendanceRecords } = usePage().props as { attendanceRecords: AttendanceRecord[] };
    const [loading, setLoading] = useState(false);

    // Object to store each course's ref
    const courseRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const groupAttendanceRecords = (): GroupedAttendance[] => {
        const grouped: Record<string, Record<string, Record<number, { id: number; name: string; attendanceCount: number }>>> = {};

        attendanceRecords.forEach(record => {
            const { course, subject, user } = record;

            if (!grouped[course.name]) grouped[course.name] = {};
            if (!grouped[course.name][subject.name]) grouped[course.name][subject.name] = {};
            if (!grouped[course.name][subject.name][user.id]) {
                grouped[course.name][subject.name][user.id] = { id: user.id, name: user.name, attendanceCount: 0 };
            }

            grouped[course.name][subject.name][user.id].attendanceCount += 1;
        });

        return Object.entries(grouped).map(([courseName, subjects]) => ({
            courseName,
            subjects: Object.entries(subjects).map(([subjectName, students]) => ({
                subjectName,
                students: Object.values(students),
            })),
        }));
    };

    const groupedAttendance = groupAttendanceRecords();

    const handleGenerateCoursePDF = async (courseName: string) => {
        const courseRef = courseRefs.current[courseName];
        if (!courseRef) return;

        setLoading(true);
        try {
            const canvas = await html2canvas(courseRef);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${courseName}_Attendance.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendWhatsApp = (courseName: string, subjectDetails: { subjectName: string; students: { name: string; attendanceCount: number }[] }[]) => {
        const message = subjectDetails
            .map(subject => {
                const studentsProgress = subject.students
                    .map(student => `*${student.name}* - Progress: ${((student.attendanceCount / 10) * 100).toFixed(0)}%`)
                    .join('\n');
                return `📚 *${subject.subjectName}*\n${studentsProgress}`;
            })
            .join('\n\n');

        const whatsappText = `*Attendance Details for Course: ${courseName}*\n\n${message}`;
        const encodedMessage = encodeURIComponent(whatsappText);
        const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    };

    return (
        <AuthenticatedLayout>
            <Head title="View Attendance" />
            <div className="p-6 bg-white shadow rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Attendance Records</h1>

                {groupedAttendance.map((courseGroup) => (
                    <div
                        key={courseGroup.courseName}
                        className="mb-8 border-b pb-6"
                        ref={(el) => (courseRefs.current[courseGroup.courseName] = el)}
                    >
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{courseGroup.courseName}</h2>

                        {courseGroup.subjects.map((subjectGroup) => (
                            <div key={subjectGroup.subjectName} className="ml-4 mb-6">
                                <h3 className="text-xl font-semibold text-indigo-500 mb-2">{subjectGroup.subjectName}</h3>
                                <ul className="ml-4 space-y-4">
                                    {subjectGroup.students.map((student) => {
                                        const progress = ((student.attendanceCount / 10) * 100).toFixed(0);
                                        return (
                                            <li key={student.id} className="text-gray-700">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-medium">{student.name}</span>
                                                    <span className="text-sm text-gray-600">{progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                                                    <div
                                                        className="bg-blue-600 h-4 rounded-full text-center text-xs font-medium text-blue-100"
                                                        style={{ width: `${progress}%` }}
                                                    >
                                                        {progress}%
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}

                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={() => handleGenerateCoursePDF(courseGroup.courseName)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg"
                                disabled={loading}
                            >
                                {loading ? 'Generating PDF...' : 'Generate PDF'}
                            </button>
                            <button
                                onClick={() => handleSendWhatsApp(courseGroup.courseName, courseGroup.subjects)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg"
                            >
                                Send to WhatsApp
                            </button>
                        </div>
                    </div>
                ))}

                {/* Global buttons for entire attendance records */}
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={() => handleGenerateCoursePDF("All_AttendanceRecords")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg"
                        disabled={loading}
                    >
                        {loading ? 'Generating PDF...' : 'Generate Full PDF'}
                    </button>
                    <button
                        onClick={() => handleSendWhatsApp(
                            "All Courses",
                            groupedAttendance.flatMap(course => course.subjects)
                        )}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg"
                    >
                        Send Full Attendance to WhatsApp
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ViewAttendance;
