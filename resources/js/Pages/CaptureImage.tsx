import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import Webcam from 'react-webcam';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

const CaptureImage: React.FC = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [message, setMessage] = useState('');
    const webcamRef = useRef(null);

    const { props } = usePage();
    const { timetable, uniqueDays, uniqueTimes, courses } = props;

    // Open camera function
    const handleCameraOpen = () => setIsCameraOpen(true);

    // Capture image function
    const captureImage = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        setImage(imageSrc);
        setIsCameraOpen(false); // Close the camera after capturing
    };

    // Handle selection change for day and time
    const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedDay(event.target.value);
    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedTime(event.target.value);

    // Filter slots based on selected day and time
    const filteredSlots = timetable.filter(
        (slot) => slot.day === selectedDay && slot.time === selectedTime
    );

    // UseEffect for managing message timeout
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 1500);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Handle image upload to server
    const handleUploadImage = async () => {
        if (image && selectedDay && selectedTime) {
            try {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('day', selectedDay);
                formData.append('time', selectedTime);
                formData.append('course_id', selectedCourseId); // Dynamically use the selected course id

                const response = await axios.post('/api/upload-image', formData);
                setMessage(response.data.message); // Assuming success message is returned
            } catch (error) {
                setMessage('Error uploading image.');
            }
        } else {
            setMessage('Please capture an image and select day/time.');
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Capture Image</h2>}>
            <Head title="Capture Image" />
            <div className="py-12 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Flash messages */}
                    {props.flash?.success && (
                        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded border border-green-400">
                            {props.flash.success}
                        </div>
                    )}
                    {message && (
                        <div
                            className={`p-4 rounded ${message.includes('Error') ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'}`}
                        >
                            {message}
                        </div>
                    )}

                    {/* Time Slot Selection */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
                        <h2 className="text-xl font-semibold mb-2">Select Time Slot:</h2>

                        {/* Day Selection */}
                        <select onChange={handleDayChange} value={selectedDay} className="p-2 border rounded mb-2">
                            <option value="">Select Day</option>
                            {uniqueDays.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>

                        {/* Time Selection */}
                        <select onChange={handleTimeChange} value={selectedTime} className="p-2 border rounded mb-6">
                            <option value="">Select Time</option>
                            {uniqueTimes.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>

                        {/* Display available slots */}
                        <div className="mt-4">
                            {filteredSlots.length > 0 ? (
                                filteredSlots.map((slot, index) => (
                                    <div key={index} className="mb-2">
                                        <div>Course: {slot.course.name}</div>
                                        <div>Subject: {slot.subject?.name || 'No subject available'}</div>
                                    </div>
                                ))
                            ) : (
                                <div>No available slots for this time</div>
                            )}
                        </div>
                    </div>

                    {/* Camera Section */}
                    <div className="mt-8">
                        <button onClick={handleCameraOpen} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            Open Camera HCBT
                        </button>

                        {isCameraOpen && (
                            <div className="mt-4">
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width="100%"
                                    videoConstraints={{
                                        facingMode: 'user',
                                    }}
                                />
                                <button onClick={captureImage} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
                                    Capture Image
                                </button>
                            </div>
                        )}

                        {image && <img src={image} alt="Captured" className="mt-6 max-w-full h-auto" />}
                    </div>

                    <div className="mt-6">
                        <button onClick={handleUploadImage} className="px-6 py-2 bg-purple-500 text-white rounded-md">
                            Upload Image
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CaptureImage;
