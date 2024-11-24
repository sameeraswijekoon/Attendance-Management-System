import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface AttendanceRecord {
    id: number;
    attendance_date: string;
    course: { name: string };
    subject: { name: string };
}

interface PageProps {
    attendanceRecords: AttendanceRecord[];
}

const UserPersonalAttendance: React.FC = () => {
    const { attendanceRecords } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Attendance Records</h2>}>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">My Attendance Records</h1>

                    {attendanceRecords.length > 0 ? (
                        <div className="space-y-4">
                            {attendanceRecords.map(record => (
                                <div key={record.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                                    <p className="text-lg font-semibold text-gray-700">Date:
                                        <span className="ml-2 text-blue-600">
                                            {new Date(record.attendance_date).toLocaleDateString()}
                                        </span>
                                    </p>
                                    <p className="text-gray-600"><span className="font-semibold">Course:</span> {record.course.name}</p>
                                    <p className="text-gray-600"><span className="font-semibold">Subject:</span> {record.subject.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No attendance records found.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserPersonalAttendance;
