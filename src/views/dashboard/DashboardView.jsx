import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import Modal from '../../components/modal/Modal';
import { TiHomeOutline } from "react-icons/ti";
import { BiCategoryAlt } from "react-icons/bi";
import { CiCircleList } from "react-icons/ci";
import { FaBox } from "react-icons/fa6";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function DashboardView({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [route, setRoute] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setRoute(sessionStorage.getItem('current-route'))
    }, [])

    const handleRoute = (route) => {
        navigate(`/dashboard/${route}`)
        setRoute(route)
        sessionStorage.setItem('current-route', route);
    }

    return (
        <>
            <div className='bg-[#a31c9f] p-3 flex justify-between'>
                <div className='flex'>
                    <img src="/dash-logo.jpg" alt="" className='size-8' />
                    <h1 className='text-white text-xl ml-2'><span className='font-bold'>digital</span>flake</h1>
                </div>
                <div onClick={() => setIsModalOpen(true)} className='mr-5'>
                    <CgProfile className='text-4xl text-white cursor-pointer' />
                </div>
            </div>
            <div className="flex h-screen">
                <aside className="w-1/4 bg-gray-100 p-4">
                    <nav>
                        <ul>
                            <li onClick={() => handleRoute('')} className="mb-4 flex justify-between p-2 bg-yellow-100 hover:bg-gray-200 cursor-pointer" style={{
                                backgroundColor: (route === '') ? '#e8eba2' : 'rgb(243 244 246)'
                            }}>
                                <span className='flex'>
                                    <TiHomeOutline className='text-2xl mt-1' />
                                    <h6 className='ml-2 mt-1'>Home</h6>
                                </span>
                                <IoMdArrowDroprightCircle className='text-2xl' />
                            </li>
                            <li onClick={() => handleRoute('category')} className="mb-4 flex justify-between p-2 hover:bg-gray-200 cursor-pointer" style={{
                                backgroundColor: (route === 'category') ? '#e8eba2' : 'rgb(243 244 246)'
                            }}>
                                <span className='flex'>
                                    <BiCategoryAlt className='text-2xl mt-1' />
                                    <h6 className='ml-2 mt-1'>Category</h6>
                                </span>
                                <IoMdArrowDroprightCircle className='text-2xl mt-1' />
                            </li>
                            <li onClick={() => handleRoute('sub-category')} className="mb-4 flex justify-between p-2 hover:bg-gray-200 cursor-pointer" style={{
                                backgroundColor: route === 'sub-category' ? '#e8eba2' : 'rgb(243 244 246)'
                            }}>
                                <span className='flex'>
                                    <CiCircleList className='text-2xl mt-1' />
                                    <h6 className='ml-2 mt-1'>Subcategory</h6>
                                </span>
                                <IoMdArrowDroprightCircle className='text-2xl mt-1' />
                            </li>
                            <li onClick={() => handleRoute('products')} className="mb-4 flex justify-between p-2 hover:bg-gray-200 cursor-pointer" style={{
                                backgroundColor: route === 'products' ? '#e8eba2' : 'rgb(243 244 246)'
                            }}>
                                <span className='flex'>
                                    <FaBox className='text-2xl mt-1' />
                                    <h6 className='ml-2 mt-1'>Products</h6>
                                </span>
                                <IoMdArrowDroprightCircle className='text-2xl mt-1' />
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className='flex-1'>
                    {children}
                </main>
            </div>
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}
