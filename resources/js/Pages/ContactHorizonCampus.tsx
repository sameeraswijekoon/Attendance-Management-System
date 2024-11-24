import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ContactHorizonCampus: React.FC = () => {
    const whatsappNumber = "1234567890"; // Replace with the actual WhatsApp number
    const whatsappMessage = "Hello, I would like to get in touch with Horizon Campus.";

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Contact Horizon Campus</h2>}>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Image Section */}
                    <div className="relative">
                        <img src="/img1.jpg" alt="Horizon Campus" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
                            <h1 className="text-3xl font-bold">Get in Touch with Horizon Campus</h1>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="p-6 space-y-4">
                        <p className="text-lg text-gray-700">We are here to assist you with any inquiries or information about our programs and services. Feel free to reach out to us!</p>

                        {/* WhatsApp Button */}
                        <div className="mt-4">
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center px-6 py-3 bg-green-500 text-white font-bold rounded-md shadow-lg hover:bg-green-600 transition-all duration-200"
                            >
                                <img src="/logo.png" alt="WhatsApp" className="w-6 h-6 mr-2" />
                                Contact us on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <form action="/contact-horizon" method="POST" className="p-6 space-y-4">
                        <input type="hidden" name="_token" value="{csrf_token()}" />

                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
                            <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-md" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-md" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-gray-700 font-semibold">Message</label>
                            <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border rounded-md" required></textarea>
                        </div>

                        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-md shadow-lg hover:bg-blue-700 transition-all duration-200">Send Message</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ContactHorizonCampus;
