import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

interface Faculty {
    id: number;
    name: string;
}

const FacultyList: React.FC = () => {
    const { faculties, flash, auth } = usePage().props as { faculties: Faculty[], flash: any, auth: { user: { name: string } } };
    const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
    const [name, setName] = useState('');
    const [newFacultyName, setNewFacultyName] = useState('');
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(
            '/faculties',
            { name: newFacultyName },
            {
                onSuccess: () => {
                    setNewFacultyName('');
                }
            }
        );
    };

    const handleEditClick = (faculty: Faculty) => {
        setEditingFaculty(faculty);
        setName(faculty.name);
    };

    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingFaculty) {
            Inertia.put(
                `/faculties/${editingFaculty.id}`,
                { name },
                {
                    onSuccess: () => {
                        setEditingFaculty(null);
                        setName('');
                    }
                }
            );
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this faculty?')) {
            Inertia.delete(`/faculties/${id}`);
        }
    };

    const handlePageRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-all duration-500">
            {/* Navigation - Enhanced with deeper shadow and subtle animation */}
            <nav className="border-b border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        {/* Logo and Nav Links */}
                        <div className="flex">
                            <div className="flex shrink-0 items-center transform transition-transform duration-300 hover:scale-105">
                                <a href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </a>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href="/dashboard" active={false}>
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        {/* User Dropdown - Enhanced with hover effect */}
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md transform transition-all duration-300 hover:scale-105">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition-all duration-300 hover:bg-gray-50 hover:text-gray-700 hover:shadow-md focus:outline-none"
                                        >
                                            {auth.user.name}
                                            <svg
                                                className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out transform group-hover:rotate-180"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href="/profile">Profile</Dropdown.Link>
                                    <Dropdown.Link href="/logout" method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Menu Button with animation */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 transition-all duration-300 hover:bg-gray-100 hover:text-gray-500 hover:shadow-md focus:outline-none"
                            >
                                <svg className="h-6 w-6 transition-transform duration-300" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Responsive Navigation */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden transition-all duration-300 ease-in-out`}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href="/dashboard" active={false}>Dashboard</ResponsiveNavLink>
                    </div>
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{auth.user.name}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href="/profile">Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href="/logout" as="button">Log Out</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Enhanced Faculty List Content */}
            <div className="py-12 bg-gradient-to-b from-blue-100 via-blue-50 to-gray-100">
                <Head title="Faculty List" />
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* Enhanced Success Message with Animation */}
                    {flash.success && (
                        <div className="bg-green-200 text-green-900 p-4 rounded-lg shadow-lg border border-green-300 transform transition-all duration-500 hover:scale-102 animate-fade-in-down">
                            {flash.success}
                        </div>
                    )}

                    {/* Enhanced Create Faculty Form */}
                    <div className="bg-white shadow-2xl rounded-lg p-6 transform transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Create Faculty</h2>
                        <form onSubmit={handleCreateSubmit} className="flex items-center space-x-4">
                            <input
                                type="text"
                                value={newFacultyName}
                                onChange={(e) => setNewFacultyName(e.target.value)}
                                placeholder="Enter faculty name"
                                required
                                className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:shadow-md"
                            />
                            <button
                                type="submit"
                                onClick={handlePageRefresh}
                                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-lg transform transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                            >
                                Add Faculty
                            </button>
                        </form>
                    </div>

                    {/* Enhanced Faculty List Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800 transform transition-all duration-300 hover:scale-105">Faculty List</h2>
                        <button
                            onClick={handlePageRefresh}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg transform transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                        >
                            Refresh Page
                        </button>
                    </div>

                    {/* Enhanced Faculty List Container */}
                    <div className="bg-white shadow-2xl rounded-lg p-6 transform transition-all duration-300 hover:shadow-3xl">
                        <ul className="space-y-4">
                            {faculties.map((faculty) => (
                                <li key={faculty.id} className="flex justify-between items-center border-b border-gray-200 pb-4 transform transition-all duration-300 hover:shadow-lg hover:-translate-x-1 hover:translate-y-1 p-3 rounded-lg">
                                    {editingFaculty?.id === faculty.id ? (
                                        <form onSubmit={handleUpdateSubmit} className="flex items-center space-x-3 w-full">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:shadow-md"
                                            />
                                            <button
                                                type="submit"
                                                onClick={handlePageRefresh}
                                                className="px-4 py-1 bg-indigo-600 text-white rounded-md shadow-lg transform transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                                            >
                                                Update
                                            </button>
                                            <button

                                                onClick={() => setEditingFaculty(null)}
                                                className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md shadow-lg transform transition-all duration-300 hover:bg-gray-400 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <span className="text-gray-800 font-medium transform transition-all duration-300 hover:scale-105">{faculty.name}</span>
                                            <div className="space-x-2">
                                                <button
                                                    onClick={() => handleEditClick(faculty)}
                                                    className="px-3 py-1 bg-yellow-500 text-white rounded-md shadow-lg transform transition-all duration-300 hover:bg-yellow-600 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(faculty.id)}
                                                    className="px-3 py-1 bg-red-500 text-white rounded-md shadow-lg transform transition-all duration-300 hover:bg-red-600 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyList;
