import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface UserTimetableProps {
    course: { id: number; name: string } | null;
    timetables: {
        [day: string]: {
            [time: string]: { subject: { id: number; name: string } | null } | null;
        };
    } | null;
    message?: string;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['8:00-10:00', '10:30-12:30', '13:00-15:00', '15:00-17:00'];

// Function to assign color based on subjectId
const getSubjectColor = (subjectId: number | null): string => {
    if (!subjectId) return 'bg-gray-200'; // Default color for "No Class"
    const colors = ['bg-green-100', 'bg-blue-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100', 'bg-teal-100'];
    return colors[subjectId % colors.length]; // Rotate colors based on subjectId
};

const UserTimetable: React.FC<UserTimetableProps> = ({ course, timetables, message }) => {
    // Function to generate and send WhatsApp message
    const handleSendWhatsApp = () => {
        if (!course || !timetables) return;

        let messageContent = `Timetable for ${course.name}:\n\n`;
        daysOfWeek.forEach(day => {
            const dayContent = timeSlots
                .map(time => {
                    const subjectName = timetables[day]?.[time]?.subject?.name || "No Class";
                    return `${time}: ${subjectName}`;
                })
                .join("\n");
            messageContent += `*${day}*\n${dayContent}\n\n`;
        });

        const encodedMessage = encodeURIComponent(messageContent);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <AuthenticatedLayout>
            <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
                <Head title="Your Timetable" />
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 sm:mb-8">Your Timetable</h2>

                {message && <p className="text-lg text-red-500">{message}</p>}

                {course ? (
                    <div className="mb-10 bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition duration-300 overflow-x-auto">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">{course.name}</h3>
                        <table className="min-w-full border border-gray-300 rounded-lg shadow-md overflow-hidden mt-4">
                            <thead className="bg-gray-100 text-gray-700 font-medium">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 border-b text-left text-sm sm:text-base">Time</th>
                                    {daysOfWeek.map((day) => (
                                        <th key={day} className="px-2 sm:px-4 py-2 sm:py-3 border-b text-left text-sm sm:text-base">{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timeSlots.map((time) => (
                                    <tr key={time} className="hover:bg-gray-50 transition duration-150">
                                        <td className="px-2 sm:px-4 py-2 sm:py-3 border-b text-gray-600 text-sm sm:text-base">{time}</td>
                                        {daysOfWeek.map((day) => (
                                            <td
                                                key={`${day}-${time}`}
                                                className={`px-2 sm:px-4 py-2 sm:py-3 border-b ${getSubjectColor(
                                                    timetables && timetables[day] && timetables[day][time]?.subject?.id || null
                                                )}`}
                                            >
                                                {timetables && timetables[day] && timetables[day][time] && timetables[day][time]?.subject ? (
                                                    <span className="text-gray-800 font-medium text-sm sm:text-base">
                                                        {timetables[day][time]?.subject?.name || 'No Subject'}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 text-sm sm:text-base">No Class</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* WhatsApp Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleSendWhatsApp}
                                className="bg-[#25D366] text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition duration-150 text-sm font-semibold"
                            >
                                Send Timetable via WhatsApp
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-lg text-gray-700">No course information available.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default UserTimetable;
