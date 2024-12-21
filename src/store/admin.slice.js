import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminLogin = createAsyncThunk('admin/adminLogin', async (data, { rejectWithValue }) => {
    try {
        const resp = await axios.post('http://localhost:8000/api/v1/admin/login', data);
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error })
    }
})

export const forgetPassword = createAsyncThunk('admin/forgetPassword', async (data, { rejectWithValue }) => {
    try {
        await axios.post('http://localhost:8000/api/v1/admin/forget-password', data);
    } catch (error) {
        return rejectWithValue({ msg: error })
    }
})

export const resetPassword = createAsyncThunk('admin/resetPassword', async (data, { rejectWithValue }) => {
    try {
        const resp = await axios.post('http://localhost:8000/api/v1/admin/reset-password', data, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });
        return resp.data;
    } catch (error) {
        return rejectWithValue({ msg: error })
    }
})

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        loading: false,
        error: '',
        token: '',
        success: ''
    },
    reducers: {
        clearErrorMsg: (state) => {
            state.error = ''
        },
        clearSuccess: (state) => {
            state.token = ''
        },
        clearToken: (state) => {
            state.token = ''
        }
    },
    extraReducers: builder => {
        builder.addCase(adminLogin.pending, state => {
            state.loading = true;
            state.error = ''
        })
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem('token', action.payload.token)
            state.token = action.payload.token;
        })
        builder.addCase(adminLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg.response.data.msg
        })

        builder.addCase(forgetPassword.pending, state => {
            state.loading = true;
            state.error = ''
        })
        builder.addCase(forgetPassword.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(forgetPassword.rejected, (state, action) => {
            state.loading = false;
        })

        builder.addCase(resetPassword.pending, state => {
            state.loading = true;
            state.error = ''
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.success = 'Password updated successfully'
        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Something went wrong'
        })
    }
})

export const { clearErrorMsg, clearSuccess, clearToken } = adminSlice.actions;
export default adminSlice.reducer;