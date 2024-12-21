import React, { useEffect, useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { CiCircleList } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../../components/modal/DeleteModal'
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategory } from '../../../store/subcategory.slice';

export default function SubCategory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uid, setUid] = useState(undefined);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { subcategorys } = useSelector(state => state.subcategory);

    useEffect(() => {
        dispatch(getSubCategory())
    }, [dispatch])

    const handleAddCategory = () => {
        navigate('/dashboard/sub-category/add');
    }

    const handleEdit = (id) => {
        navigate(`/dashboard/sub-category/edit/${id}`);
    }

    const handleDelete = (id) => {
        setIsModalOpen(true)
        setUid(id);
    }

    return (
        <>
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold flex items-center">
                        <span className="mr-2"><CiCircleList /></span>Sub Category
                    </h1>
                    <button onClick={handleAddCategory} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                        Add New
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-yellow-200">
                            <tr>
                                <th className="py-2 px-4 text-left font-medium">Id</th>
                                <th className="py-2 px-4 text-left font-medium">Sub Category name</th>
                                <th className="py-2 px-4 text-left font-medium">Category name</th>
                                <th className="py-2 px-4 text-left font-medium">Image</th>
                                <th className="py-2 px-4 text-left font-medium">Status</th>
                                <th className="py-2 px-4 text-left font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subcategorys && subcategorys.length > 0 && subcategorys.map((category, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                        } hover:bg-gray-200`}
                                >
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{category.sub_c_name}</td>
                                    <td className="py-3 px-4">{category.c_id.c_name}</td>
                                    <td className="py-3 px-4 text-2xl">
                                        <img src={category.sub_c_image} alt={category.sub_c_name} className='size-5' />
                                    </td>
                                    <td
                                        className={`py-3 px-4 ${category.status ? 'text-green-500' : 'text-red-500'
                                            }`}
                                    >
                                        {category.status ? 'Active' : 'Inactive'}
                                    </td>
                                    <td className="py-3 px-4 flex gap-4">
                                        <button onClick={() => handleEdit(category._id)} className="text-gray-600 hover:text-blue-500">
                                            <FaRegEdit />
                                        </button>
                                        <button onClick={() => handleDelete(category._id)} className="text-gray-600 hover:text-red-500">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} uid={uid} apiType={'sub-category'} />
        </>
    );
}