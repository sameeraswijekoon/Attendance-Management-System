import React from 'react';

export default function Welcome({ phpVersion }) {
    return (
        <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
            {/* Background Image */}
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
                <div className="absolute inset-0 bg-black opacity-60" />
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

            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center -mt-20">
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light mb-6 text-gray-200">
                    Welcome to
                </h2>
                <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold mb-8 text-yellow-400">
                    Horizon Campus
                </h1>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-12 text-gray-300">
                    — Knowledge City Malabe —
                </h3>

                {/* Button */}
                <button
                onClick={() => window.location.href = '/get-started'}
                className="px-8 py-4 bg-yellow-400 text-black rounded-full text-xl font-medium hover:bg-yellow-300 transition-colors">
                    Get Started
                </button>
            </main>

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
        </div>
    );
}
