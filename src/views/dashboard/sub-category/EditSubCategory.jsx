import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Select from '../../../components/select/Select'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategoryDropdown, getSubCategoryById, editSubCategory } from '../../../store/subcategory.slice';
import CustomSelect from '../../../components/select/CustomSelect';

export default function EditCategory() {
  const [subCategory, setSubCategory] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(false);

  // const [subCategoryCopy, subCategoryCopy] = useState('')
  const [categoryCopy, setCategoryCopy] = useState('')
  const [subCategoryCopy, setSubCategoryCopy] = useState('')
  const [imageCopy, setImageCopy] = useState(null);
  const [statusCopy, setStatusCopy] = useState(false);

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { s_category_by_id, category_dropdown } = useSelector(state => state.subcategory)

  useEffect(() => {
    dispatch(getSubCategoryById(id));
    dispatch(getCategoryDropdown());
  }, [dispatch, id])

  useEffect(() => {
    if (s_category_by_id) {
      setSubCategory(s_category_by_id?.sub_c_name)
      setCategory({
        c_id: s_category_by_id?.c_id,
        c_name: s_category_by_id?.c_name
      })
      setImage(s_category_by_id?.sub_c_image)
      setStatus(s_category_by_id?.status)

      setSubCategoryCopy(s_category_by_id?.sub_c_name)
      setCategoryCopy({
        c_id: s_category_by_id?.c_id,
        c_name: s_category_by_id?.c_name
      })
      setImageCopy(s_category_by_id?.sub_c_image)
      setStatusCopy(s_category_by_id?.status)
    }
  }, [s_category_by_id])

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
    dispatch(editSubCategory({
      _id: id,
      sub_c_name: subCategory,
      sub_c_image: image,
      status,
      c_id: category.c_id
    }));
    toast.success('Product updated successfully');
  }

  const handleCancel = () => {
    setCategory(categoryCopy)
    setImage(imageCopy)
    setStatus(statusCopy)
    setSubCategory(subCategoryCopy)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative h-screen bg-white shadow-md rounded-md p-8 w-full max-w-6xl">
        <div className="flex items-center mb-6">
          <FaArrowLeft onClick={handleBack} className="text-gray-600 cursor-pointer" />
          <h1 className="text-2xl font-bold ml-4">Edit Sub Category</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <label htmlFor="categoryName" className="block text-gray-700 mb-2">
              Sub Category Name
            </label>
            <input
              type="text"
              value={subCategory}
              onChange={e => setSubCategory(e.target.value)}
              id="categoryName"
              placeholder="Enter Sub Category Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
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
