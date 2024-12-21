import React, { useEffect } from 'react'
import LoginView from '../views/login/LoginView'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
    else navigate('/');
  }, [navigate])
  return <LoginView />
}
