import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Select from '../../../components/select/Select'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategoryDropdown } from '../../../store/subcategory.slice';
import CustomSelect from '../../../components/select/CustomSelect';
import { getActiveSubCategoryDropdown, getProductById, editProduct, clearSuccess } from '../../../store/product.slice';
import ProductSelect from '../../../components/select/ProductSelect';

export default function EditProduct() {
  const [productName, setProductName] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(false);

  const [productNameCopy, setProductNameCopy] = useState('')
  const [categoryCopy, setCategoryCopy] = useState('')
  const [subCategoryCopy, setSubCategoryCopy] = useState('')
  const [imageCopy, setImageCopy] = useState(null);
  const [statusCopy, setStatusCopy] = useState(false);

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { category_dropdown } = useSelector(state => state.subcategory)
  const { subCategory_dropdown, o_product, success } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getCategoryDropdown());
    dispatch(getActiveSubCategoryDropdown());
  }, [dispatch, id])

  useEffect(() => {
    if (success) {
      toast.success('Product updated successfully')
      dispatch(clearSuccess())
    }
  }, [dispatch, success])

  useEffect(() => {
    if (o_product) {
      setProductName(o_product.p_name)
      setCategory({
        _id: o_product.c_id,
        c_name: o_product.c_name
      })
      setSubCategory({
        _id: o_product.sub_id,
        sub_c_name: o_product.sub_c_name
      })
      setImage(o_product.sub_c_image)
      setStatus(o_product.status)

      setProductNameCopy(o_product.p_name)
      setCategoryCopy({
        _id: o_product.c_id,
        c_name: o_product.c_name
      })
      setSubCategoryCopy({
        _id: o_product.sub_id,
        sub_c_name: o_product.sub_c_name
      })
      setImageCopy(o_product.sub_c_image)
      setStatusCopy(o_product.status)
    }
  }, [o_product])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    navigate('/dashboard/products')
  }

  const handleSave = () => {
    if (
      !productName ||
      typeof category !== 'object' ||
      typeof subCategory !== 'object'
    ) {
      toast.success('All fields are required');
    }
    else dispatch(editProduct({
      _id: id,
      p_name: productName,
      c_id: category._id,
      sub_id: subCategory._id,
      status,
      sub_c_image: image
    }))
  }

  const handleCancel = () => {
    setCategory(categoryCopy)
    setImage(imageCopy)
    setStatus(statusCopy)
    setSubCategory(subCategoryCopy)
    setProductName(productNameCopy)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative h-screen bg-white shadow-md rounded-md p-8 w-full max-w-6xl">
        <div className="flex items-center mb-6">
          <FaArrowLeft onClick={handleBack} className="text-gray-600 cursor-pointer" />
          <h1 className="text-2xl font-bold ml-4">Edit Product</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <label htmlFor="categoryName" className="block text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              id="categoryName"
              placeholder="Enter Sub Category Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label>Sub Category</label>
            <ProductSelect data={subCategory_dropdown} status={subCategory} setStatus={setSubCategory} />
          </div>
          <div>
            <label>Category</label>
            <CustomSelect data={category_dropdown} status={category} setStatus={setCategory} />
          </div>
          <div>
            <label>Status</label>
            <Select status={status} setStatus={setStatus} />
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
