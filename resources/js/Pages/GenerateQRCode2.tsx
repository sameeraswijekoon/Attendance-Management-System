import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import QRCode from 'qrcode';

interface QRCodePageProps {
    courses: { id: number; name: string }[];
    subjects: { id: number; name: string }[];
}

const GenerateQRCode2: React.FC<QRCodePageProps> = ({ courses, subjects }) => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const generateQRCode = async () => {
        if (!selectedCourse || !selectedSubject || !selectedDate) {
            setError('Please select a course, subject, and a valid date.');
            return;
        }
        setError(null);

        const qrText = JSON.stringify({
            course_id: selectedCourse,
            subject_id: selectedSubject,
            date: selectedDate,
            timestamp: new Date().toISOString(), // Ensuring uniqueness
        });

        try {
            const dataUrl = await QRCode.toDataURL(qrText);
            setQrCodeDataUrl(dataUrl);
        } catch (error) {
            console.error('Failed to generate QR code:', error);
            setError('QR Code generation failed. Please try again.');
        }
    };

    useEffect(() => {
        const interval = setInterval(generateQRCode, 3000); // Refresh QR code every 3 seconds
        return () => clearInterval(interval);
    }, [selectedCourse, selectedSubject, selectedDate]);

    return (
        <AuthenticatedLayout>
            <Head title="Generate QR Code" />
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
                <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Generate QR Code</h1>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Select Course:</label>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">-- Select a Course --</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>{course.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Select Subject:</label>
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">-- Select a Subject --</option>
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Select Date:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <button
                        onClick={generateQRCode}
                        className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition duration-200"
                    >
                        Generate QR Code
                    </button>

                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                    {qrCodeDataUrl && (
                        <div className="mt-6 text-center">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Generated QR Code</h2>
                            <p className="text-gray-500 text-sm">QR Code updates every 3 seconds</p>
                            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner inline-block">
                                <img src={qrCodeDataUrl} alt="QR Code" className="w-48 h-48 mx-auto" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default GenerateQRCode2;
