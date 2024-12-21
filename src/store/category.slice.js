import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addCategory = createAsyncThunk('category/addCategory', async (data, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.post('http://localhost:8000/api/v1/category', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const getCategory = createAsyncThunk('category/getCategory', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.get('http://localhost:8000/api/v1/category', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const getCategoryById = createAsyncThunk('category/getCategoryById', async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.get(`http://localhost:8000/api/v1/category/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const editCategory = createAsyncThunk('category/editCategory', async (data, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.patch(`http://localhost:8000/api/v1/category/${data._id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        await axios.delete(`http://localhost:8000/api/v1/category/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return id;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        loading: false,
        error: '',
        category: [],
        success: '',
        o_category: null
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
        builder.addCase(addCategory.pending, state => {
            state.loading = true;
            state.error = ''
        })
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.category = [...state.category, action.payload.category]
            state.success = 'Category added successfully'
        })
        builder.addCase(addCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg
        })

        builder.addCase(editCategory.pending, state => {
            state.loading = true;
            state.error = ''
        })
        builder.addCase(editCategory.fulfilled, (state, action) => {
            state.loading = false;
            // eslint-disable-next-line array-callback-return
            state.category = state.category.filter(ctg => {
                if (ctg._id === action.payload.category._id) {
                    return action.payload.category;
                }
                return ctg;
            })
            state.success = 'Category updated successfully'
        })
        builder.addCase(editCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg
        })

        builder.addCase(getCategory.pending, state => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload.category;
        })
        builder.addCase(getCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
        })

        builder.addCase(getCategoryById.pending, state => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(getCategoryById.fulfilled, (state, action) => {
            state.loading = false;
            state.o_category = action.payload.category;
        })
        builder.addCase(getCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
        })

        builder.addCase(deleteCategory.pending, state => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.category = state.category.filter(ctg => ctg._id !== action.payload);
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
        })
    }
})

export const { clearErrorMsg, clearSuccessMsg } = categorySlice.actions;
export default categorySlice.reducer;