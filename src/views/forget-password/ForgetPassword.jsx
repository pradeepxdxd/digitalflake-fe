import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { forgetPassword } from '../../store/admin.slice'

export default function ForgetPassword() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.admin)

    const handleLoginRedirect = () => {
        navigate('/')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(forgetPassword({ email }))
    }

    return (
        <div className='h-screen bg-cover bg-no-repeat bg-center'
            style={{ backgroundImage: "url('/bg.jpg')" }}
        >
            <div className="h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl">
                    <h2 className="text-center text-xl font-semibold text-purple-700 mb-4">
                        Did you forget password?
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Enter your email address and we’ll send you a link to restore password
                    </p>

                    <form className="space-y-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Enter email address"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-600"
                        >
                            Request reset link
                        </button>
                    </form>

                    <div className="text-center mt-4 underline font-thin cursor-pointer" onClick={handleLoginRedirect}>
                        Back to log in
                    </div>
                </div>
            </div>
        </div>
    )
}
