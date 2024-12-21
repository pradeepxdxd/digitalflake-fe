import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin, clearErrorMsg, clearToken } from '../../store/admin.slice';
import { toast } from 'react-toastify';

export default function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector(state => state.admin);

  const handleForgetPassword = () => {
    navigate('/forget-password')
  }

  const handleLogin = () => {
    dispatch(adminLogin({ email, password }))
  }

  useEffect(() => {
    if (token) {
      toast.success('Login successfully');
      dispatch(clearToken())
      navigate('/dashboard');
    }
  }, [dispatch, navigate, token])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrorMsg());
    }
  }, [dispatch, error])

  return (
    <div className='h-screen bg-cover bg-no-repeat bg-center'
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className='grid grid-cols-2 gap-4 h-full'>
        <div className='relative bg-white rounded-md m-20 flex items-center flex-col'>
          <img src="/logo.jpg" alt="logo" className='size-8 mt-16' />
          <h1 className='text-2xl'><span className='font-bold'>digital</span>flake</h1>
          <h1 className='mt-2 text-sm font-normal'>Welcome to the Digitalflake admin</h1>
          <div className='mt-14 max-w-[400px]'>
            <input disabled={loading} required type="email" onChange={e => setEmail(e.target.value)} className='w-full border border-gray-700 rounded-md my-2 p-2' placeholder='Enter email' />
            <input disabled={loading} required type="password" onChange={e => setPassword(e.target.value)} className='w-full border border-gray-700 rounded-md my-2 p-2' placeholder='Enter password' />
            <div onClick={handleForgetPassword} className='flex justify-end w-full hover:underline text-violet-500 mr-3 cursor-pointer'>
              Forget Password?
            </div>
          </div>
          <div className='absolute bottom-20'>
            <button disabled={loading} onClick={handleLogin} className='bg-violet-500 py-2 px-4 rounded-md text-white hover:bg-violet-800'>Log in</button>
          </div>
        </div>
      </div>
    </div>
  )
}
