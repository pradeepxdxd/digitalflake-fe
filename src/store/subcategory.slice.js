import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getSubCategory = createAsyncThunk('subcategory/getSubCategory', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.get('http://localhost:8000/api/v1/sub-category', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const getSubCategoryById = createAsyncThunk('subcategory/getSubCategoryById', async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.get(`http://localhost:8000/api/v1/sub-category/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const getCategoryDropdown = createAsyncThunk('subcategory/getCategoryDropdown', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.get('http://localhost:8000/api/v1/category/active-category', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const addSubCategory = createAsyncThunk('subcategory/addSubCategory', async (data, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.post(`http://localhost:8000/api/v1/sub-category`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const editSubCategory = createAsyncThunk('subcategory/editSubCategory', async (data, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.patch(`http://localhost:8000/api/v1/sub-category/${data._id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const deleteSubCategory = createAsyncThunk('', async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        await axios.delete(`http://localhost:8000/api/v1/sub-category/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return id;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

const subCategorySlice = createSlice({
    name: 'subcategory',
    initialState: {
        loading: false,
        subcategorys: [],
        s_category_by_id: null,
        category_dropdown: [],
        error: '',
        success: ''
    },
    reducers: {
        clearErrorMsg: (state) => {
            state.error = ''
        },
        clearSuccessMsg: (state) => {
            state.success = ''
        }
    },
    extraReducers: builder => {
        builder.addCase(getSubCategory.pending, state => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(getSubCategory.fulfilled, (state, action) => {
            state.loading = false
            state.subcategorys = action.payload.sub_category
        })
        builder.addCase(getSubCategory.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload.msg
        })

        builder.addCase(getCategoryDropdown.pending, state => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(getCategoryDropdown.fulfilled, (state, action) => {
            state.loading = false
            state.category_dropdown = action.payload.data
        })
        builder.addCase(getCategoryDropdown.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload.msg
        })

        builder.addCase(editSubCategory.pending, state => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(editSubCategory.fulfilled, (state, action) => {
            state.loading = false
            state.subcategorys = state.subcategorys.map(cate => {
                if (cate._id === action.payload.sub_category._id) {
                    return action.payload.sub_category;
                }
                else return cate;
            })
            state.success = action.payload.msg;
        })
        builder.addCase(editSubCategory.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload.msg
        })

        builder.addCase(addSubCategory.pending, state => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(addSubCategory.fulfilled, (state, action) => {
            state.loading = false
            state.subcategorys = [...state.subcategorys, action.payload.sub_category];
            state.success = action.payload.msg;
        })
        builder.addCase(addSubCategory.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload.msg
        })

        builder.addCase(getSubCategoryById.pending, state => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(getSubCategoryById.fulfilled, (state, action) => {
            state.loading = false
            state.s_category_by_id = action.payload.sub_category;
            state.success = action.payload.msg;
        })
        builder.addCase(getSubCategoryById.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload.msg
        })

        builder.addCase(deleteSubCategory.pending, state => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
            state.loading = false
            state.subcategorys = state.subcategorys.filter(cate => cate._id !== action.payload);
        })
        builder.addCase(deleteSubCategory.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload.msg
        })
    }
})

export const { clearErrorMsg, clearSuccessMsg } = subCategorySlice.actions;
export default subCategorySlice.reducer;