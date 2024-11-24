import React from 'react';

export default function GetStarted() {
    return (
        <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0">
                <video
                    src="/home-bg.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40"
                    aria-label="Campus View Background Video"
                />
            </div>

            {/* Header */}
            <header className="relative z-20 w-full py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
                    <div className="text-2xl font-bold text-yellow-400">HC</div>
                    <button
                        onClick={() => window.location.replace('/login')}
                        className="px-6 py-2 bg-yellow-400 text-black rounded-full font-semibold font-medium hover:bg-yellow-300 transition-colors"
                    >
                        Login
                    </button>
                </div>
            </header>

            {/* Page Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 space-y-10">
                {/* Page Header */}
                <header className="text-center py-10">
                    <h1 className="text-5xl font-extrabold text-yellow-400">Welcome to Horizon Campus</h1>
                    <p className="text-lg mt-4 text-gray-200">Explore our campus and course offerings below</p>
                </header>

                {/* About Section */}
                <section className="space-y-4">
                    <h2 className="text-4xl font-bold text-yellow-400">About Our Campus</h2>
                    <p className="text-gray-300 text-lg">
                        Located in the heart of Knowledge City Malabe, Horizon Campus is a place where students can
                        thrive and achieve academic excellence. With state-of-the-art facilities, a vibrant campus life,
                        and a supportive academic environment, we are dedicated to fostering a community of
                        forward-thinking learners who are ready to make a difference in the world.
                    </p>
                    <p className="text-gray-300 text-lg">
                        Our campus offers modern amenities, extensive research resources, and a dedicated faculty that
                        helps students to excel both academically and personally. Join us to become a part of a thriving
                        academic community and unlock your potential.
                    </p>
                    <p className="text-gray-300 text-lg">
                        Discover our range of academic programs designed to inspire, challenge, and prepare you for a
                        successful career. We focus on equipping our students with the skills they need to thrive in a
                        constantly evolving world.
                    </p>
                </section>

                {/* Courses Section */}
                <section className="space-y-4">
                    <h2 className="text-4xl font-bold text-yellow-400">Our Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {/* Course Cards */}
                        {[
                            {
                                title: "Bachelor of Science in Information Technology",
                                description: "Advance your IT career with courses in software development, AI, and cloud computing.",
                                img: "/h7.jpg",
                            },
                            {
                                title: "Bachelor of Laws (LLB)",
                                description: "Gain comprehensive knowledge in law and justice, and build a career in legal practice.",
                                img: "/h4.jpg",
                            },
                            {
                                title: "Bachelor of Business Management",
                                description: "Develop skills in strategic management, entrepreneurship, and global business.",
                                img: "/bg4.jpg",
                            },
                            {
                                title: "Bachelor of Arts in Psychology",
                                description: "Explore human behavior and mental processes, preparing for roles in counseling and therapy.",
                                img: "/Cafeteria3-ezgif.com-webp-to-jpg-converter.jpg",
                            },
                            {
                                title: "Bachelor of Science in Nanotechnology",
                                description: "Dive into the cutting-edge field of nanotechnology with hands-on research and projects.",
                                img: "/h7.jpg",
                            },
                            {
                                title: "Bachelor of Science in Agriculture",
                                description: "Learn sustainable agricultural practices and technology to improve crop production.",
                                img: "/h4.jpg",
                            },
                            {
                                title: "Bachelor of Arts in Graphic Design",
                                description: "Turn creativity into a career with courses on digital media, illustration, and visual design.",
                                img: "/bg4.jpg",
                            },
                            {
                                title: "Bachelor of Commerce in Marketing",
                                description: "Specialize in marketing strategies, consumer behavior, and brand management.",
                                img: "/Cafeteria3-ezgif.com-webp-to-jpg-converter.jpg",
                            },
                            {
                                title: "Master of Science in Cybersecurity",
                                description: "Become an expert in cybersecurity and safeguard digital assets from cyber threats.",
                                img: "/h7.jpg",
                            },
                            {
                                title: "Diploma in Environmental Science",
                                description: "Understand environmental challenges and learn to design sustainable solutions.",
                                img: "/h4.jpg",
                            },
                        ].map((course, index) => (
                            <a
                                key={index}
                                href="#"
                                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md transform hover:scale-105 transition-transform md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <img
                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                    src={course.img}
                                    alt={course.title}
                                />
                                <div className="flex flex-col justify-between p-6 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {course.title}
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {course.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-400 py-10 mt-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-yellow-400 mb-2">Contact Us</h3>
                        <p>Horizon Campus</p>
                        <p>Knowledge City Malabe</p>
                        <p>Malabe, Sri Lanka</p>
                        <p>Phone: +94 11 240 7777</p>
                        <p>Email: info@horizoncampus.edu.lk</p>
                    </div>

                    {/* Management Team */}
                    <div>
                        <h3 className="text-lg font-bold text-yellow-400 mb-2">Management</h3>
                        <ul>
                            <li>Chancellor: Dr. Susantha Perera</li>
                            <li>Vice Chancellor: Prof. Indika Karunathilake</li>
                            <li>Director of Administration: Ms. Janaki Fernando</li>
                            <li>Head of IT Department: Dr. Pradeep Kumar</li>
                        </ul>
                    </div>

                    {/* Faculties */}
                    <div>
                        <h3 className="text-lg font-bold text-yellow-400 mb-2">Faculties</h3>
                        <ul>
                            <li>Faculty of Information Technology</li>
                            <li>Faculty of Business and Management</li>
                            <li>Faculty of Law</li>
                            <li>Faculty of Engineering</li>
                            <li>Faculty of Science</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-8 text-gray-500">
                    &copy; {new Date().getFullYear()} Horizon Campus. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
