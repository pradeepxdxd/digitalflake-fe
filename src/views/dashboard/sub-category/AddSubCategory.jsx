import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategoryDropdown, addSubCategory } from '../../../store/subcategory.slice';
import CustomSelect from '../../../components/select/CustomSelect';
import { toast } from 'react-toastify';

export default function AddCategory() {
    const [categoryName, setCategoryName] = useState('')
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { category_dropdown } = useSelector(state => state.subcategory)

    useEffect(() => {
        dispatch(getCategoryDropdown());
    }, [dispatch])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleBack = () => {
        navigate('/dashboard/sub-category')
    }

    const handleSave = () => {
        if (!categoryName || typeof category !== 'object' || !image) {
            console.log({
                category,
                categoryName,
                image
            })
            toast.error('All fields are required');
        }
        else {
            dispatch(addSubCategory({ sub_c_name: categoryName, sub_c_image: image, status: true, c_id: category._id }))
            setCategoryName('')
            setImage(null)
            setCategory('')
        }
    }

    const handleCancel = () => {
        setCategoryName('')
        setImage(null)
        setCategory('')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="relative h-screen bg-white shadow-md rounded-md p-8 w-full max-w-6xl">
                <div className="flex items-center mb-6">
                    <FaArrowLeft onClick={handleBack} className="text-gray-600 cursor-pointer" />
                    <h1 className="text-2xl font-bold ml-4">Add Category</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <label htmlFor="categoryName" className="block text-gray-700 mb-2">
                            Sub Category Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Enter Category Name"
                            value={categoryName}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
                            onChange={e => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className=''>
                        <label>Category</label>
                        <CustomSelect data={category_dropdown} status={category} setStatus={setCategory} />
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
