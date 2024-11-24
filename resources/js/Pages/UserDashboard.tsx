import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Quote {
    id: number;
    author: string | null;
    quote: string;
    quote_image: string | null;
}

interface UserDashboardProps {
    quotes: Quote[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ quotes }) => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [quotes.length]);

    const currentQuote = quotes[currentQuoteIndex];

    useEffect(() => {
        let slideIndex = 0;
        const slides = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('[data-carousel-slide-to]');
        const showSlide = () => {
            slides.forEach((slide) => slide.classList.add('hidden'));
            indicators.forEach((indicator) => indicator.classList.remove('bg-opacity-100'));
            slides[slideIndex].classList.remove('hidden');
            indicators[slideIndex].classList.add('bg-opacity-100');
            slideIndex = (slideIndex + 1) % slides.length;
        };
        showSlide();
        const interval = setInterval(showSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Dashboard</h2>}>
            <Head title="User Dashboard" />

            <div className="p-4 mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Student Dashboard</h1>
                    <button
                        onClick={() => window.location.href = '/user-notifications'}

                        type="button"
                        className="inline-flex items-center text-sm px-5 py-2.5 font-medium text-white bg-blue-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-700"
                    >
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                        Notification Updating...
                    </button>
                </div>

                <div id="alert-quote" className="flex items-center p-4 mb-4 bg-blue-100 border-t-4 border-blue-300 text-blue-800 rounded-lg" role="alert">
                    {currentQuote?.quote_image && (
                        <img src={`/storage/${currentQuote.quote_image}`} alt="Quote" className="w-16 h-16 rounded-full mr-4" />
                    )}
                    <div className="text-sm font-medium">
                        <p className="font-semibold">"{currentQuote?.quote}"</p>
                        {currentQuote?.author && <p className="italic">- {currentQuote.author}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-center mb-8">
                    <button
                    onClick={() => window.location.replace('/user-timetable')}
                    className="bg-green-600 text-white px-4 py-3 rounded-md shadow-lg hover:bg-green-700 transition-all duration-200">
                        Time table
                    </button>
                    <button
                    onClick={() => window.location.replace('/user-notifications')}
                    className="bg-green-600 text-white px-4 py-3 rounded-md shadow-lg hover:bg-green-700 transition-all duration-200">
                        Notification
                    </button>
                    <button
                    onClick={() => window.location.replace('/capture-image')}
                    className="bg-green-600 text-white px-4 py-3 rounded-md shadow-lg hover:bg-green-700 transition-all duration-200">
                        Capture Face
                    </button>
                    <button
                    onClick={() => window.location.replace('/qr/scan')}
                    className="bg-purple-600 text-white px-4 py-3 rounded-md shadow-lg hover:bg-purple-700 transition-all duration-200">
                        QR Scan
                    </button>
                    <button
                    onClick={() => window.location.replace('/my-attendance')}
                    className="bg-purple-600 text-white px-4 py-3 rounded-md shadow-lg hover:bg-purple-700 transition-all duration-200">
                        View Attendance
                    </button>
                    <button
                    onClick={() => window.location.replace('/contact-horizon')}
                    className="bg-purple-600 text-white px-4 py-3 rounded-md shadow-lg hover:bg-purple-700 transition-all duration-200">
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
                                <p>The computer labs are equipped with high tech equipment available for the use of students and connected to high speed internet to support academic work. These can accommodate up to 100 students at a time.</p>
                            </div>
                        </div>
                       <div className="carousel-item relative float-left w-full hidden transition-opacity duration-[3000ms] ease-in-out">
                            <img src="/library3-ezgif.com-webp-to-jpg-converter.jpg" className="block w-full object-cover h-64 sm:h-80 md:h-[35rem]" alt="Slide 3" />
                            <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 bg-black p-6 text-white text-sm sm:text-base md:text-lg shadow-md">
                                <h5 className="text-lg sm:text-xl">LIBRARY</h5>
                                <p>Horizon Campus library houses updated collections of books, editorials, and journals in the fields of Law, Science, Management, IT, Education, Engineering and many more. All Horizon Campus students are granted membership at the time of registration with the campus and can access a large variety of literature for education and relaxation free of charge. With the use of modern technology these are available for students via the e – library facility that can be accessed from anywhere across the world...</p>
                            </div>
                        </div>
                        <div className="carousel-item relative float-left w-full hidden transition-opacity duration-[3000ms] ease-in-out">
                            <img src="/Cafeteria3-ezgif.com-webp-to-jpg-converter.jpg" className="block w-full object-cover h-64 sm:h-80 md:h-[35rem]" alt="Slide 4" />
                            <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 bg-black p-6 text-white text-sm sm:text-base md:text-lg shadow-md">
                                <h5 className="text-lg sm:text-xl">AUDITORIUM</h5>
                                <p>The state – of – the – art auditorium is fully furnished with modern audio visual equipment and can house 400 at a time. This is available for all academic and non academic purposes upon prior approval.</p>
                            </div>
                        </div>
                    </div>

                    {/* Carousel controls */}
                    <button className="absolute top-0 bottom-0 left-0 flex items-center justify-center bg-transparent p-0 text-white hover:opacity-75" type="button" data-carousel-target="#carouselExampleCaptions" data-carousel-slide="prev">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-25">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </span>
                        <span className="sr-only">Previous</span>
                    </button>
                    <button className="absolute top-0 bottom-0 right-0 flex items-center justify-center bg-transparent p-0 text-white hover:opacity-75" type="button" data-carousel-target="#carouselExampleCaptions" data-carousel-slide="next">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-25">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </span>
                        <span className="sr-only">Next</span>
                    </button>
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

export default UserDashboard;
