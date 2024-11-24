import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { QrReader } from 'react-qr-reader';

interface QRData {
    course_id: string;
    subject_id: string;
    date: string;
}

const ScanQRCode: React.FC = () => {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [qrData, setQrData] = useState<QRData | null>(null);

    const handleScan = (result: any) => {
        if (result?.text) {
            try {
                const data = JSON.parse(result.text);

                if (data.course_id && data.subject_id && data.date) {
                    // Send data to the server
                    router.post('/attendance/store', {
                        course_id: data.course_id,
                        subject_id: data.subject_id,
                        date: data.date,
                    });

                    // Set QR data to display
                    setQrData({
                        course_id: data.course_id,
                        subject_id: data.subject_id,
                        date: data.date,
                    });

                    setScanResult("Attendance recorded successfully!");
                    setError(null);
                    setCameraOpen(false); // Close the camera after successful scan
                } else {
                    throw new Error("Invalid QR Code format.");
                }
            } catch (err) {
                console.error(err);
                setError("Invalid QR Code format. Please try again.");
                setScanResult(null);
            }
        }
    };

    const handleError = (err: any) => {
        console.error(err);
        setError("Error scanning the QR code. Please try again.");
    };

    const toggleCamera = () => {
        setCameraOpen(!cameraOpen);
        setError(null); // Reset error when toggling the camera
        setScanResult(null); // Reset scan result
    };

    return (
        <AuthenticatedLayout>
            <Head title="Scan QR Code" />
            <div className="p-6 bg-white shadow rounded max-w-lg mx-auto text-center">
                <h1 className="text-2xl font-bold mb-4">Scan QR Code for Attendance</h1>

                <button
                    onClick={toggleCamera}
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${cameraOpen ? 'bg-red-500' : 'bg-blue-500'}`}
                >
                    {cameraOpen ? "Close Camera" : "Open Camera"}
                </button>

                {cameraOpen && (
                    <div className="mt-4" style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                            <QrReader
                                constraints={{ facingMode: 'environment' }}
                                onResult={handleScan}
                                onError={handleError}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}
                {scanResult && <p className="text-green-500 mt-4">{scanResult}</p>}

                {/* Display QR Data if available */}
                {qrData && (
                    <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50">
                        <h2 className="text-xl font-semibold mb-2">Scanned QR Code Details</h2>
                        <p><strong>Course ID:</strong> {qrData.course_id}</p>
                        <p><strong>Subject ID:</strong> {qrData.subject_id}</p>
                        <p><strong>Date:</strong> {qrData.date}</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default ScanQRCode;
