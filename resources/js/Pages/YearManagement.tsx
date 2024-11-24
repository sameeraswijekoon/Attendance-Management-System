import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Year {
    id: number;
    year: string;
    badge_number: string;
}

const handlePageRefresh = () => {
    window.location.reload();
};

const YearManagement = () => {
    const { years, flash } = usePage().props as { years: Year[]; flash: { success?: string } };
    const [yearData, setYearData] = useState({ year: '', badge_number: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setTimeout(() => setMessage(''), 3000);
        }
    }, [flash.success]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYearData({ ...yearData, [e.target.name]: e.target.value });
    };

    const handleAddYear = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post('/years', yearData, {
            onSuccess: () => setYearData({ year: '', badge_number: '' }),
        });
    };

    const handleDeleteYear = (id: number) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            Inertia.delete(`/years/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-gradient">
                        Year and Badge Management
                    </h2>
                </div>
            }
        >
            <Head title="Year and Badge Management" />
            <div className="py-12 bg-gradient-to-b from-white to-blue-50 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {message && (
                        <div className="bg-blue-100 text-blue-700 p-4 rounded-lg shadow-lg text-center animate-gradient">
                            {message}
                        </div>
                    )}

                    <div className="bg-white shadow-md rounded-lg transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                        <div className="p-6">
                            <form onSubmit={handleAddYear} className="space-y-6">
                                <div>
                                    <label htmlFor="year" className="block text-lg font-medium text-gray-700">
                                        Year
                                    </label>
                                    <input
                                        type="text"
                                        id="year"
                                        name="year"
                                        value={yearData.year}
                                        onChange={handleInputChange}
                                        placeholder="Enter year (e.g., 2023)"
                                        required
                                        className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-400 focus:ring-blue-400 transition duration-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="badge_number" className="block text-lg font-medium text-gray-700">
                                        Badge Number
                                    </label>
                                    <input
                                        type="text"
                                        id="badge_number"
                                        name="badge_number"
                                        value={yearData.badge_number}
                                        onChange={handleInputChange}
                                        placeholder="Enter badge number"
                                        required
                                        className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-400 focus:ring-blue-400 transition duration-300"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-gradient"
                                >
                                    Save Year and Badge
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Available Years
                                </h2>
                                <button
                                    onClick={handlePageRefresh}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-300 animate-gradient"
                                >
                                    Refresh Page
                                </button>
                            </div>
                            <div className="space-y-4">
                                {years.map((year) => (
                                    <div
                                        key={year.id}
                                        className="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
                                    >
                                        <div>
                                            <p className="text-lg font-semibold text-gray-800">
                                                Year: {year.year}
                                            </p>
                                            <p className="text-gray-600">
                                                Badge Number: {year.badge_number}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteYear(year.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default YearManagement;
