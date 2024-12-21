import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Select from '../../../components/select/Select'
import { useDispatch, useSelector } from 'react-redux';
import { editCategory, getCategoryById } from '../../../store/category.slice';
import { toast } from 'react-toastify';

export default function EditCategory() {
    const [category, setCategory] = useState('')
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(false);
    const [categoryCopy, setCategoryCopy] = useState('')
    const [imageCopy, setImageCopy] = useState(null);
    const [statusCopy, setStatusCopy] = useState(false);

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { o_category } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getCategoryById(id));
    }, [dispatch, id])

    useEffect(() => {
        if (o_category) {
            setCategory(o_category.c_name)
            setImage(o_category.c_image)
            setStatus(o_category.status)
            setCategoryCopy(o_category.c_name)
            setImageCopy(o_category.c_image)
            setStatusCopy(o_category.status)
        }
    }, [o_category])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleBack = () => {
        navigate('/dashboard/category')
    }

    const handleSave = () => {
        dispatch(editCategory({ _id: o_category._id, c_name: o_category.c_name, c_image: o_category.c_image, status }));
        toast.success('Product updated successfully');
    }

    const handleCancel = () => {
        setCategory(categoryCopy)
        setImage(imageCopy)
        setStatus(statusCopy)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="relative h-screen bg-white shadow-md rounded-md p-8 w-full max-w-6xl">
                <div className="flex items-center mb-6">
                    <FaArrowLeft onClick={handleBack} className="text-gray-600 cursor-pointer" />
                    <h1 className="text-2xl font-bold ml-4">Edit Category</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div>
                        <label htmlFor="categoryName" className="block text-gray-700 mb-2">
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            id="categoryName"
                            placeholder="Enter Category Name"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Upload Image</label>
                        <div className="flex gap-4 items-center">
                            {image && (
                                <img
                                    src={image}
                                    alt="Uploaded"
                                    className="w-32 h-32 object-cover border rounded-md"
                                />
                            )}
                            <label className="w-32 h-32 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                {!image && (
                                    <div className="text-center text-gray-500">
                                        <p>📷</p>
                                        <p className="text-xs mt-2">
                                            Upload Maximum allowed file size is 10MB
                                        </p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                    <Select status={status} setStatus={setStatus} />
                </div>
                <div className="absolute bottom-5 right-5 flex justify-end gap-4 mt-8">
                    <button onClick={handleCancel} className="px-9 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-200">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-9 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
