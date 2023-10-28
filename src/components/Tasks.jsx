import React, { useEffect, useState, Fragment, useRef } from 'react'
import { markdone, viewTasks, viewtaskID } from '../api/endpoints';
import logo from "../assets/logo.svg"
// import frontendroute from '../common/links';
// import { Link } from 'react-router-dom';
// import { AiFillHome } from "react-icons/ai"
// import { BsListTask } from "react-icons/bs"
// import { AiFillEdit } from "react-icons/ai"
// import { BiBold, BiLogOut } from "react-icons/bi"
//import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
// import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { ToastContainer, toast } from 'react-toastify';

import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { PaperClipIcon } from '@heroicons/react/20/solid'

const Tasks = () => {




    const product = {
        name: 'Basic Tee 6-Pack ',
        price: '$192',
        rating: 3.9,
        reviewCount: 117,
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
        imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
        colors: [
            { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
            { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
            { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        ],
        sizes: [
            { name: 'XXS', inStock: true },
            { name: 'XS', inStock: true },
            { name: 'S', inStock: true },
            { name: 'M', inStock: true },
            { name: 'L', inStock: true },
            { name: 'XL', inStock: true },
            { name: 'XXL', inStock: true },
            { name: 'XXXL', inStock: false },
        ],
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    const [open2, setOpen2] = useState(false)


    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])

    const [activeLink, setactivelink] = useState('pending');
    const [task, settask] = useState([])
    const userdata = localStorage.getItem('empdetails');
    const usr = JSON.parse(userdata);

    useEffect(() => {
        console.log("Task description,", taskdescription)
        viewTasks(usr.id, activeLink).then(d => {
            settask(d.data)
        }).catch(error => {
            console.log(error)
        })
    }, [activeLink])

    console.log("tasks are:- ", task)

    const handleconfirm = () => {
        console.log("the task id is", tskid)
        let tk = tskid
        markdone(tk).then(resp => {
            if (resp.status == 201) {
                toast.success("Task Marked Done!")
                setOpen(false)
                viewTasks(usr.id, activeLink).then(d => {
                    settask(d.data)
                }).catch(error => {
                    console.log(error)
                })
            } else {
                toast.error("Error Occured!")
            }
        })
    }

    const cancelButtonRef = useRef(null)

    const [open, setOpen] = useState(false)


    const [tskid, settskid] = useState(null);
    const [taskdescription, settaskdescription] = useState([]);



    const handleview = async (id) => {
        await viewtaskID(id).then(d => {
            if (d.status == 201) {
                //settaskdescription(null)
                settaskdescription(d.data)
            }
        })
    }

    const handleselect = (e) => {
        const value = e.target.value;
        setactivelink(value);


    }


    return (

        <div class="w-full py-20 px-1 mx-auto">
            {/* <nav className="bg-gray-50 mt-5 w-1/4">
                <div className="container mx-auto py-4 flex justify-between">
                    <div>
                        <a
                            href="#"
                            className={`${activeLink === 'pending'
                                ? 'text-red-500 border-b-2 border-red-500'
                                : 'text-gray-500 hover:text-red-500'
                                } px-3 py-2 text-md font-medium `}
                            onClick={() => setactivelink('pending')}
                        >
                            Pending Tasks
                        </a>
                        <a
                            href="#"
                            className={`${activeLink === 'complete'
                                ? 'text-red-500 border-b-2 border-red-500'
                                : 'text-gray-500 hover:text-red-500'
                                } px-3 py-2 text-md font-medium`}
                            onClick={() => setactivelink('complete')}
                        >
                            Completed Tasks
                        </a>
                    </div>
                </div>
            </nav> */}

            <h2 className='text-xl text-gray-800 font-bold pl-5'>Filter results</h2>

            <div className='px-4 py-5'>
                <select onChange={handleselect} value={activeLink} className='w-full md:w-1/4 px-2 py-2' name="" id="">
                    <option value="pending">Pending</option>
                    <option value="complete">Complete</option>
                </select>
            </div>

            {activeLink === 'pending' ? (
                <div className="container mx-auto p-4">
                    {task.length ? (<h1 className="text-2xl font-bold mb-4">Task List</h1>) : (<h1 className="text-2xl font-bold mb-4">No Tasks yet</h1>)}

                    <div className="bg-white shadow overflow-x-auto sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            {task.length ? (
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                            ) : (<></>)}

                            <tbody className="bg-white divide-y divide-gray-200">
                                {task.length ? task.map((task) => (
                                    <tr key={task.id} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{task._id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{task.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                                {task.status}
                                            </span>

                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => { handleview(task?._id); settskid(task._id); setOpen2(true) }} className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded hover:bg-yellow-600">
                                                Details
                                            </button>

                                            <button onClick={() => { settskid(task._id); setOpen(true) }} className="bg-green-500 text-white px-4 py-2 mr-2 rounded hover:bg-green-600">
                                                Mark as Complete
                                            </button>

                                        </td>
                                    </tr>
                                )) : ((<div>
                                    <img src={logo} alt="joh" className="mx-auto w-4/3 md:w-1/4  md:flex" />
                                </div>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto p-4">
                    {task.length ? (<h1 className="text-2xl font-bold mb-4">Completed Task List</h1>) : (<h1 className="text-2xl font-bold mb-4">No Completed Task</h1>)}
                    <div className="bg-white shadow overflow-x-auto sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            {task.length ? (
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                            ) : (<></>)}
                            <tbody className="bg-white divide-y divide-gray-200">
                                {task.length ? task.map((task) => (
                                    <tr key={task.id} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{task._id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{task.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* <div className="text-sm font-bold text-green-500">{task.status}</div> */}
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => { handleview(task._id); settskid(task._id); setOpen2(true) }} className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded hover:bg-yellow-600">
                                                Details
                                            </button>
                                            {/* <Link className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded hover:bg-yellow-600" to={`/task/${task._id}`} >Details</Link> */}
                                        </td>
                                    </tr>
                                )) : (<div>
                                    <img src={logo} alt="joh" className="mx-auto w-4/3 md:w-1/4  md:flex" />
                                </div>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Mark as Complete
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to mark this task as completed ?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
                                            onClick={handleconfirm}
                                        >
                                            Mark Complete
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>




            <Transition.Root show={open2} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen2}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto mt-20">
                        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        <button
                                            type="button"
                                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                            onClick={() => setOpen2(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                                        </button>

                                        <div>
                                            <div className="px-4 sm:px-0">
                                                <h3 className="text-2xl font-bold leading-7 text-gray-900">{taskdescription[0]?.title}</h3>
                                                {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p> */}
                                            </div>
                                            <div className="mt-6 border-t border-gray-100">
                                                <dl className="divide-y divide-gray-100">

                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Task Id</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{taskdescription[0]?._id}</dd>
                                                    </div>


                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Task Name</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{taskdescription[0]?.title}</dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Assigned By</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{taskdescription[0]?.assignedBy?.fname} {taskdescription[0]?.assignedBy?.lname}</dd>
                                                    </div>

                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Assigned To</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{taskdescription[0]?.assignedTo?.fname} {taskdescription[0]?.assignedTo?.lname}</dd>
                                                    </div>


                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Date Created</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{taskdescription[0]?.createdAt}</dd>
                                                    </div>

                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Remaining Time</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Remaining time not yet updated</dd>
                                                    </div>


                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{taskdescription[0]?.status}</dd>
                                                    </div>
                                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                            {taskdescription[0]?.description}
                                                        </dd>
                                                    </div>

                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div>
    )
}

export default Tasks
