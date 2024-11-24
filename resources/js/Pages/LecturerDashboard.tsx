import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const LecturerDashboard: React.FC = () => {
    useEffect(() => {
        let slideIndex = 0;
        const slides = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('[data-carousel-slide-to]');

        const showSlide = () => {
            slides.forEach(slide => slide.classList.add('hidden'));
            indicators.forEach(indicator => indicator.classList.remove('bg-opacity-100'));
            slides[slideIndex].classList.remove('hidden');
            indicators[slideIndex].classList.add('bg-opacity-100');
            slideIndex = (slideIndex + 1) % slides.length;
        };

        showSlide();
        const interval = setInterval(showSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lecturer Dashboard</h2>}>
            <Head title="Lecturer Dashboard" />

            <div className="p-4 mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                <h1 className="text-2xl font-bold mb-6">Lecturer Dashboard</h1>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-center mb-8">
                    <button
                        onClick={() => window.location.replace('/timetables')}
                        className="bg-blue-600 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200">
                        View Time Table
                    </button>
                    <button
                        onClick={() => window.location.replace('/notifications')}
                        className="bg-blue-600 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200">
                        Add Notifications
                    </button>
                    <button
                        onClick={() => window.location.replace('/user-notifications')}
                        className="bg-blue-600 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200">
                        View Notifications
                    </button>
                    <button
                        onClick={() => window.location.replace('/quotes')}
                        className="bg-blue-600 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200">
                        Add Motivation Quotes
                    </button>
                    <button
                        onClick={() => window.location.replace('/generate-qr-form')}
                        className="bg-blue-600 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200">
                        Generate QR
                    </button>
                    <button
                        onClick={() => window.location.replace('/contact-horizon')}
                        className="bg-blue-600 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200">
                        Contact Horizon Campus
                    </button>
                </div>

                <div id="carouselExampleCaptions" className="relative shadow-lg rounded-lg overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 z-10 mx-auto mb-4 flex justify-center space-x-3">
                        <button type="button" data-carousel-slide-to="0" className="w-3 h-3 rounded-full bg-white opacity-70" aria-label="Slide 1"></button>
                        <button type="button" data-carousel-slide-to="1" className="w-3 h-3 rounded-full bg-white opacity-70" aria-label="Slide 2"></button>
                        <button type="button" data-carousel-slide-to="2" className="w-3 h-3 rounded-full bg-white opacity-70" aria-label="Slide 3"></button>
                    </div>
                    <div className="relative w-full overflow-hidden">
                        <div className="carousel-item active hidden w-full transition-opacity duration-[3000ms] ease-in-out">
                            <img src="/h7.jpg" className="w-full object-cover h-64 sm:h-80 md:h-[35rem]" alt="Slide 1" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-opacity-70 bg-black">
                                <h5 className="text-lg sm:text-xl">COMPUTER LABS</h5>
                                <p>The computer labs are equipped with high-tech equipment available for students and connected to high-speed internet to support academic work.</p>
                            </div>
                        </div>
                        <div className="carousel-item hidden w-full transition-opacity duration-[3000ms] ease-in-out">
                            <img src="/library3-ezgif.com-webp-to-jpg-converter.jpg" className="w-full object-cover h-64 sm:h-80 md:h-[35rem]" alt="Slide 2" />
                            <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 bg-black p-6 text-white text-sm sm:text-base md:text-lg shadow-md">
                                <h5 className="text-lg sm:text-xl">LIBRARY</h5>
                                <p>Horizon Campus library houses updated collections of books, editorials, and journals in various academic fields. Members have access to a large variety of literature and e-library facilities.</p>
                            </div>
                        </div>
                        <div className="carousel-item hidden w-full transition-opacity duration-[3000ms] ease-in-out">
                            <img src="/Cafeteria3-ezgif.com-webp-to-jpg-converter.jpg" className="w-full object-cover h-64 sm:h-80 md:h-[35rem]" alt="Slide 3" />
                            <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 bg-black p-6 text-white text-sm sm:text-base md:text-lg shadow-md">
                                <h5 className="text-lg sm:text-xl">AUDITORIUM</h5>
                                <p>The state-of-the-art auditorium is equipped with modern audio-visual equipment and can accommodate up to 400 people, available for both academic and non-academic events.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-xl font-semibold mb-4">About Horizon Campus, Sri Lanka</h3>
                    <p className="text-sm sm:text-base">
                        Horizon Campus is a premier higher education institution in Sri Lanka, committed to providing quality education and research opportunities. Recognized by the University Grants Commission (UGC) of Sri Lanka, Horizon Campus offers a wide range of undergraduate and postgraduate programs across multiple faculties.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        <div>
                            <h4 className="font-semibold mb-2">Faculties</h4>
                            <ul className="text-sm">
                                <li>Faculty of Science & Technology</li>
                                <li>Faculty of Management</li>
                                <li>Faculty of Information Technology</li>
                                <li>Faculty of Law</li>
                                <li>Faculty of Education</li>
                                <li>Faculty of Health Sciences</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Contact</h4>
                            <p className="text-sm">
                                Horizon Campus<br />
                                No. 482/B, Millennium Drive, Malabe, Sri Lanka<br />
                                Phone: +94 11 437 7000<br />
                                Email: info@horizoncampus.edu.lk
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Accreditations</h4>
                            <p className="text-sm">
                                Horizon Campus is fully accredited by the University Grants Commission (UGC) of Sri Lanka, ensuring the highest standards of academic quality.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} Horizon Campus, Sri Lanka. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </AuthenticatedLayout>
    );
};

export default LecturerDashboard;
