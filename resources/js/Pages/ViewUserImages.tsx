import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface UserImage {
    id: number;
    user_id: number;
    image_path: string;
    day: string;
    time: string;
    user: { id: number; name: string; course?: { name: string } };
}

interface PageProps {
    userImages: UserImage[];
}

const ViewUserImages: React.FC = () => {
    const { userImages } = usePage<PageProps>().props;

    // Group images by day, then time, then user within each slot
    const imagesByDayAndTime = userImages.reduce((acc, image) => {
        const { day, time, user } = image;
        const userName = user.name;
        const courseName = user.course?.name || 'Unassigned Course';

        if (!acc[day]) acc[day] = {};
        if (!acc[day][time]) acc[day][time] = {};
        if (!acc[day][time][courseName]) acc[day][time][courseName] = {};
        if (!acc[day][time][courseName][userName]) acc[day][time][courseName][userName] = [];

        acc[day][time][courseName][userName].push(image);

        return acc;
    }, {} as Record<string, Record<string, Record<string, Record<string, UserImage[]>>>>);

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Images by Timetable</h2>}>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">User Images by Timetable</h1>
                <div className="space-y-6">
                    {Object.entries(imagesByDayAndTime).map(([day, times]) => (
                        <div key={day} className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-blue-700 border-b border-gray-200 pb-2 mb-4">{day}</h2>
                            {Object.entries(times).map(([time, courses]) => (
                                <div key={time} className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">
                                        {time}
                                    </h3>
                                    {Object.entries(courses).map(([courseName, users]) => (
                                        <div key={courseName} className="mb-4">
                                            <h4 className="text-md font-semibold text-gray-600 mb-2">{courseName}</h4>
                                            {Object.entries(users).map(([userName, images]) => (
                                                <div key={userName} className="mb-4">
                                                    <h5 className="text-sm font-medium text-gray-500 mb-1">{userName}</h5>
                                                    <div className="flex flex-wrap gap-4">
                                                        {images.map((image) => (
                                                            <div
                                                                key={image.id}
                                                                className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden shadow-md transform transition hover:scale-105"
                                                            >
                                                                <img
                                                                    src={`/storage/${image.image_path}`}
                                                                    alt={`User ${userName}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ViewUserImages;
