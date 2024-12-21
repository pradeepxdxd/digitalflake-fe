import React from 'react'
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Modal({ isModalOpen, setIsModalOpen }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear()
        sessionStorage.clear()
        navigate('/');
    }
    return (
        <>
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="w-full max-w-sm p-6 bg-white rounded shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Heading */}
                        {/* <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">
                            Logout
                        </h2> */}
                        <div className="flex items-center justify-center mb-1">
                            <IoIosWarning className="w-6 h-6 text-red-500 mr-2" />
                            <h2 className="text-xl font-bold text-center text-gray-800">
                                Log out
                            </h2>
                        </div>
                        <div className='mb-4'>
                            <h2 className='text-gray-400 font-normal text-[20px] text-center'>Are you sure you want to logout</h2>
                        </div>
                        {/* Buttons */}
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
