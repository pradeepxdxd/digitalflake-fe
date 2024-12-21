import React from 'react'
import { IoIosWarning } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../store/category.slice';
import { deleteSubCategory } from '../../store/subcategory.slice';
import { deleteProduct } from '../../store/product.slice';

export default function DeleteModal({ isModalOpen, setIsModalOpen, uid, apiType }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (apiType === 'category')
            dispatch(deleteCategory(uid));
        else if (apiType === 'sub-category') {
            dispatch(deleteSubCategory(uid));
        }
        else if (apiType === 'product') {
            dispatch(deleteProduct(uid));
        }
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
                                Delete
                            </h2>
                        </div>
                        <div className='mb-4'>
                            <h2 className='text-gray-400 font-normal text-[20px] text-center'>Are you sure you want to delete</h2>
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
                                onClick={() => {
                                    setIsModalOpen(false);
                                    handleDelete()
                                }}
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
