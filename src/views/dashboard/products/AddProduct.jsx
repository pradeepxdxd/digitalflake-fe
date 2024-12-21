import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategoryDropdown } from '../../../store/subcategory.slice';
import CustomSelect from '../../../components/select/CustomSelect';
import { toast } from 'react-toastify';
import { getActiveSubCategoryDropdown, addProduct, clearSuccess } from '../../../store/product.slice';
import ProductSelect from '../../../components/select/ProductSelect'

export default function AddProduct() {
    const [productName, setProductName] = useState('')
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { category_dropdown } = useSelector(state => state.subcategory)
    const { subCategory_dropdown, success } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getCategoryDropdown());
        dispatch(getActiveSubCategoryDropdown());
    }, [dispatch])

    useEffect(() => {
        if (success) {
            toast.success('Product added successfully')
            dispatch(clearSuccess())
        }
    }, [success, dispatch])

    const handleBack = () => {
        navigate('/dashboard/products')
    }

    const handleSave = () => {
        if (!productName || typeof category !== 'object' || typeof subCategory !== 'object') {
            toast.error('All fields are required');
        }
        dispatch(addProduct({ p_name: productName, c_id: category._id, sub_id: subCategory._id, status: true }))
        setProductName('')
        setCategory('')
        setSubCategory('')
    }

    const handleCancel = () => {
        setProductName('')
        setCategory('')
        setSubCategory('')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="relative h-screen bg-white shadow-md rounded-md p-8 w-full max-w-6xl">
                <div className="flex items-center mb-6">
                    <FaArrowLeft onClick={handleBack} className="text-gray-600 cursor-pointer" />
                    <h1 className="text-2xl font-bold ml-4">Add Product</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <label htmlFor="categoryName" className="block text-gray-700 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Enter Product Name"
                            value={productName}
                            className="w-full px-4 py-1.5 border rounded-md focus:ring-2 focus:ring-purple-500"
                            onChange={e => setProductName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Category</label>
                        <CustomSelect data={category_dropdown} status={category} setStatus={setCategory} />
                    </div>
                    <div>
                        <label>Sub Category</label>
                        <ProductSelect data={subCategory_dropdown} status={subCategory} setStatus={setSubCategory} />
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
