import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Lecture {
  id: number;
  lecture_name: string;
  lecture_id: string;
}

const LectureManagement = () => {
  const { lectures, flash } = usePage().props as { lectures: Lecture[]; flash: { success?: string } };
  const [lectureData, setLectureData] = useState({ lecture_name: '', lecture_id: '' });
  const [message, setMessage] = useState('');
  const [editLectureId, setEditLectureId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (flash.success) {
      setMessage(flash.success);
      setTimeout(() => setMessage(''), 3000);
    }
  }, [flash.success]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLectureData({ ...lectureData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (editLectureId) {
      Inertia.put(`/lectures/${editLectureId}`, lectureData, {
        onSuccess: () => {
          setLectureData({ lecture_name: '', lecture_id: '' });
          setEditLectureId(null);
          Inertia.reload();
        }
      });
    } else {
      Inertia.post('/lectures', lectureData, {
        onSuccess: () => {
          setLectureData({ lecture_name: '', lecture_id: '' });
          Inertia.reload();
        }
      });
    }
  };

  const handleDeleteLecture = (id: number) => {
    if (confirm('Are you sure you want to delete this lecture?')) {
      Inertia.delete(`/lectures/${id}`, {
        onSuccess: () => Inertia.reload(),
      });
    }
  };

  const handleEditLecture = (lecture: Lecture) => {
    setLectureData({ lecture_name: lecture.lecture_name, lecture_id: lecture.lecture_id });
    setEditLectureId(lecture.id);
  };

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const buttonBaseStyle = "px-6 py-2.5 font-medium text-white rounded-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg";
  const inputBaseStyle = "w-full p-3 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:shadow-md";

  // Calculate movement offset based on mouse position
  const getMoveOffset = (strength: number) => ({
    transform: `translate(${(mousePos.x - window.innerWidth / 2) * strength}px, ${(mousePos.y - window.innerHeight / 2) * strength}px)`
  });

  return (
    <AuthenticatedLayout header={
      <h2 className="text-3xl font-bold leading-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
        Lecture Management
      </h2>
    }>
      <Head title="Lecture Management" />
      <div className="py-12 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {message && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow-lg transform hover:scale-102 transition-all duration-300 text-center">
              {message}
            </div>
          )}

          {/* Form Container with mouse move effect */}
          <div
            className="bg-white p-10 rounded-2xl shadow-2xl transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
            style={getMoveOffset(0.01)} // subtle parallax effect on mouse move
          >
            <form onSubmit={handleAddOrUpdateLecture} className="space-y-6">
              <div>
                <label htmlFor="lectureName" className="block text-gray-800 font-semibold mb-2">Lecture Name</label>
                <input
                  type="text"
                  id="lectureName"
                  name="lecture_name"
                  value={lectureData.lecture_name}
                  onChange={handleInputChange}
                  placeholder="Enter lecture name"
                  required
                  className={`${inputBaseStyle} hover:-translate-y-1`}
                />
              </div>
              <div>
                <label htmlFor="lectureId" className="block text-gray-800 font-semibold mb-2">Lecture ID</label>
                <input
                  type="text"
                  id="lectureId"
                  name="lecture_id"
                  value={lectureData.lecture_id}
                  onChange={handleInputChange}
                  placeholder="Enter lecture ID"
                  required
                  className={`${inputBaseStyle} hover:-translate-y-1`}
                />
              </div>
              <button
                type="submit"
                className={`${buttonBaseStyle} w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500`}
              >
                {editLectureId ? 'Update Lecture' : 'Save Lecture'}
              </button>
            </form>
          </div>

          {/* Lectures List Container with mouse move effect */}
          <div
            className="bg-white p-10 rounded-2xl shadow-2xl transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
            style={getMoveOffset(0.005)} // subtle parallax effect on mouse move
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Available Lectures
              </h2>
              <button
                onClick={() => window.location.reload()}
                className={`${buttonBaseStyle} px-4 py-2 bg-blue-500 text-white rounded-md shadow-md transition-all duration-300 hover:bg-blue-800 hover:shadow-lg`}
              >
                Refresh Page
              </button>
            </div>
            <ul className="space-y-4">
              {lectures.map((lecture) => (
                <li key={lecture.id} className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-102 transition-all duration-300">
                  <div>
                    <p className="font-semibold text-gray-800">{lecture.lecture_name}</p>
                    <p className="text-gray-500 text-sm">ID: {lecture.lecture_id}</p>
                  </div>
                  <div className="space-x-3">
                    <button
                      onClick={() => handleEditLecture(lecture)}
                      className={`${buttonBaseStyle} bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteLecture(lecture.id);
                      }}
                      className={`${buttonBaseStyle} bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500`}
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

export default LectureManagement;
