import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetPassword, clearSuccess } from '../../store/admin.slice'

export default function ResetPassword() {
  const [current, setCurrent] = useState('')
  const [confirm, setConfirm] = useState('')

  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success } = useSelector(state => state.admin)

  useEffect(() => {
    if (success) {
      toast.success(success)
      dispatch(clearSuccess())
    }
  }, [dispatch, success])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!current || !confirm) {
      return toast.error('Please provide all fields');
    }
    else if (current.length < 6 && confirm.length < 6) {
      return toast.error('Password length should be greater than 6');
    }
    else if (current !== confirm) {
      return toast.error('current and confirm passwords are not matched');
    }
    else {
      dispatch(resetPassword({ password: current, token }))
      navigate('/')
    }
  }

  const handleLoginRedirect = () => {
    navigate('/')
  }

  return (
    <div className='h-screen bg-cover bg-no-repeat bg-center'
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl">
          <h2 className="text-center text-xl font-semibold text-purple-700 mb-4">
            Reset your password
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label htmlFor="email1" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              id="email1"
              value={current}
              disabled={loading}
              onChange={e => setCurrent(e.target.value)}
              required
              placeholder="Enter current password"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <label htmlFor="email2" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="email2"
              value={confirm}
              disabled={loading}
              onChange={e => setConfirm(e.target.value)}
              required
              placeholder="Enter confirm password"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-600"
            >
              Submit
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
