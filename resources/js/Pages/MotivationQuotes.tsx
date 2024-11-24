import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Quote {
  id: number;
  author: string | null;
  quote: string;
}

const MotivationQuotes: React.FC = () => {
  const { quotes, flash } = usePage().props as { quotes: Quote[]; flash: { success?: string } };
  const [quoteData, setQuoteData] = useState({ author: '', quote: '' });
  const [editQuoteId, setEditQuoteId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editQuoteId) {
      // Update quote
      Inertia.put(`/quotes/${editQuoteId}`, quoteData, {
        onSuccess: () => {
          setQuoteData({ author: '', quote: '' });
          setEditQuoteId(null);
        }
      });
    } else {
      // Add new quote
      Inertia.post('/quotes', quoteData, {
        onSuccess: () => {
          setQuoteData({ author: '', quote: '' });
        }
      });
    }
  };

  const handleEditClick = (quote: Quote) => {
    setEditQuoteId(quote.id);
    setQuoteData({ author: quote.author ?? '', quote: quote.quote });
  };

  const handleDeleteQuote = (id: number) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      Inertia.delete(`/quotes/${id}`);
    }
  };

  return (
    <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800">Motivation Quotes</h2>}>
      <Head title="Motivation Quotes" />
      <div className="py-12 bg-gradient-to-b from-blue-50 via-indigo-50 to-gray-100 transition-all duration-700">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
          {/* Success message */}
          {flash.success && <div className="bg-green-100 text-green-800 p-4 rounded shadow-md">{flash.success}</div>}

          {/* Add/Edit Quote Form */}
          <div className="bg-white p-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded transform transition-all duration-500 hover:shadow-[0_20px_60px_rgba(8,_112,_184,_0.9)] hover:-translate-y-2">
            <form onSubmit={handleQuoteSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Author</label>
                <input
                  type="text"
                  name="author"
                  value={quoteData.author}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  placeholder="Author name (optional)"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Quote</label>
                <textarea
                  name="quote"
                  value={quoteData.quote}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  placeholder="Enter the motivational quote"
                  required
                />
              </div>
              <button type="submit" className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white px-4 py-2 rounded hover:shadow-[0_10px_20px_rgba(99,_102,_241,_0.5)] transition-all duration-500 transform hover:scale-105 active:scale-95">
                {editQuoteId ? 'Update Quote' : 'Save Quote'}
              </button>
              {editQuoteId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditQuoteId(null);
                    setQuoteData({ author: '', quote: '' });
                  }}
                  className="ml-2 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white px-4 py-2 rounded hover:shadow-[0_10px_20px_rgba(156,_163,_175,_0.5)] transition-all duration-500 transform hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* List of Quotes */}
          <div className="bg-white p-6 shadow-[0_10px_40px_rgba(8,_112,_184,_0.4)] rounded-lg transform transition-all duration-500 hover:shadow-[0_20px_60px_rgba(8,_112,_184,_0.6)] hover:-translate-y-2">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
              Available Quotes
            </h3>
            <ul className="space-y-4">
              {quotes.map((quote) => (
                <li key={quote.id} className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-md transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1">
                  <div>
                    <p className="font-semibold text-gray-800 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">"{quote.quote}"</p>
                    {quote.author && <p className="text-gray-500">- {quote.author}</p>}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditClick(quote)}
                      className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-3 py-1 rounded hover:shadow-[0_10px_20px_rgba(252,_211,_77,_0.5)] transition-all duration-500 transform hover:scale-105 active:scale-95"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuote(quote.id)}
                      className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-3 py-1 rounded hover:shadow-[0_10px_20px_rgba(239,_68,_68,_0.5)] transition-all duration-500 transform hover:scale-105 active:scale-95"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default MotivationQuotes;
