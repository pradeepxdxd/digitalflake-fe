import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getProducts = createAsyncThunk('product/getProducts', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.get('http://localhost:8000/api/v1/product', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const getProductById = createAsyncThunk('product/getProductById', async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.get(`http://localhost:8000/api/v1/product/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const getActiveSubCategoryDropdown = createAsyncThunk('product/getActiveSubCategoryDropdown', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.get('http://localhost:8000/api/v1/sub-category/active/sub-category', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const addProduct = createAsyncThunk('product/addProduct', async (data, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.post(`http://localhost:8000/api/v1/product`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const editProduct = createAsyncThunk('product/editProduct', async (data, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await axios.patch(`http://localhost:8000/api/v1/product/${data._id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
        await axios.delete(`http://localhost:8000/api/v1/product/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return id;
    } catch (error) {
        return rejectWithValue({ msg: error.response.data.msg })
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        products: [],
        error: '',
        success: '',
        o_product: null,
        subCategory_dropdown: []
    },
    reducers: {
        clearSuccess: (state) => {
            state.success = ''
        },
        clearError: (state) => {
            state.error = ''
        },
    },
    extraReducers: builder => {
        builder.addCase(getProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.product;
            state.success = action.payload.msg;
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg;
        })

        builder.addCase(deleteProduct.pending, state => {
            state.loading = true
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = state.products.filter(pro => pro._id !== action.payload);
            state.success = action.payload.msg;
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg;
        })

        builder.addCase(getActiveSubCategoryDropdown.pending, state => {
            state.loading = true
        })
        builder.addCase(getActiveSubCategoryDropdown.fulfilled, (state, action) => {
            state.loading = false;
            state.subCategory_dropdown = action.payload.data;
            state.success = action.payload.msg;
        })
        builder.addCase(getActiveSubCategoryDropdown.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg;
        })

        builder.addCase(addProduct.pending, state => {
            state.loading = true
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = [...state.products, action.payload.product]
            state.success = action.payload.msg;
        })
        builder.addCase(addProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg;
        })

        builder.addCase(editProduct.pending, state => {
            state.loading = true
        })
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.map(pro => {
                if (pro._id === action.payload.product._id) {
                    return action.payload.product
                }
                else return pro;
            })
            state.success = action.payload.msg;
        })
        builder.addCase(editProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg;
        })

        builder.addCase(getProductById.pending, state => {
            state.loading = true
        })
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.o_product = action.payload.product
            state.success = action.payload.msg;
        })
        builder.addCase(getProductById.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg;
        })
    }
})

export const { clearError, clearSuccess } = productSlice.actions;
export default productSlice.reducer;