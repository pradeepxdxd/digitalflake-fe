import React from 'react'

export default function Home() {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="flex items-center justify-center">
                    <img src="/dash-logo.jpg" alt="dash-logo" className='rounded-lg size-10' />
                </div>
                <h1 className="text-2xl text-gray-700"><span className='font-bold'>digital</span>flake</h1>
                <p className="text-gray-500">Welcome to Digitalflake admin</p>
            </div>
        </div>
    )
}
