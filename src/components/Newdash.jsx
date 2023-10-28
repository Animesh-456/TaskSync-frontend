// src/components/Dashboard.js

import React, { useState, useEffect, useRef, Fragment } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai"
import { BsListTask } from "react-icons/bs"
import { BiBold, BiLogOut } from "react-icons/bi"
import { FiEdit } from "react-icons/fi"
import { AiFillSetting } from "react-icons/ai"
import Navbar from './Navbar'
import maleavatar from '../assets/male-avatar.svg'





//import React, { useState, Fragment, useRef, useEffect, } from "react";
import register from '../assets/register.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import common from '../helpers/common'
import { Outlet, Link } from "react-router-dom";
//import { AiFillHome } from "react-icons/ai"
//import { BsListTask } from "react-icons/bs"
import { AiFillEdit } from "react-icons/ai"
//import { BiBold, BiLogOut } from "react-icons/bi"
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
//import Navbar from "./Navbar";

import updateemployee from "../controller/employee/empdetails";
import { getUser, recentTasks, createdrecentTasks } from '../api/endpoints'
import Tasks from "./Tasks";
import { AiFillFileAdd } from 'react-icons/ai'
import AssignTask from "./AssignTask";
const Newdash = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Function to check if the screen width is less than a certain breakpoint
    const checkScreenWidth = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Check screen width on initial render and when the window is resized
    useEffect(() => {
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkScreenWidth);
        };
    }, []);

    const toggleSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const [editdiv, seteditdiv] = useState(false);



    //Prev dash 


    const [empdetails, setempdetails] = useState([]);
    const [recenttasks, setrecenttasks] = useState([]);
    const [createdrecent, setcreatedrecent] = useState([]);


    useEffect(() => {
        const userdata = localStorage.getItem('empdetails');
        const token = JSON.parse(userdata);


        getUser(token).then(d => {

            console.log("data is ", d.status)
            setempdetails(d.data)

        }).catch(error => {
            toast.error(error)
        })


        recentTasks(token.id).then(d => {
            if (d.status == 201) {
                setrecenttasks(d.data)
            }
        }).catch(error => {
            toast.error(error)
        })

        createdrecentTasks(token.id).then(d => {
            if (d.status == 201) {
                setcreatedrecent(d.data)
            }
        }).catch(error => {
            toast.error(error)
        })
    }, [])


    const employee = localStorage.getItem("empdetails")
    const emp = JSON.parse(employee)
    const [homestate, sethomestate] = useState(true)
    const [taskstate, settaskstate] = useState(false)
    const [assigntaskstate, setassigntaskstate] = useState(false);
    const changehomestate = () => {
        sethomestate(true)
        settaskstate(false)
        setassigntaskstate(false);
    }

    const changeeditstate = () => {
        sethomestate(false)
        settaskstate(false)
    }

    const changetaskstate = () => {
        settaskstate(true)
        sethomestate(false)
    }


    const changetaskstate2 = () => {
        setassigntaskstate(true);
        sethomestate(false);
    }

    let edit = localStorage.getItem("empdetails")
    let edit2 = JSON.parse(edit)


    const [user, setuser] = useState({
        fname: edit2.fname
    })

    const [check, setcheck] = useState(false)

    const setprofile = common(setuser)

    const handelsubmit = () => {
        updateemployee(empdetails).then(resp => {
            editmodalshow()
        }).catch(error => {
            console.log(error)
        })
    }

    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const logout = () => {
        setOpen(true)
    }

    const confirmlogout = () => {
        setOpen(false)
        toast.success("Logged out!")
        window.location.href = "/"
        localStorage.removeItem("empdetails")
    }

    const [openeditmodal, setopeneditmodal] = useState(false)

    const editmodalshow = () => {
        setopeneditmodal(true)
    }

    const editmodalclose = () => {
        setopeneditmodal(false)
        changehomestate()
    }



    console.log("Local str")



    return (
        <div className="bg-gray-100 min-h-screen flex">

            {isMobile && (
                <div
                    onClick={() => toggleSidebar()}
                    className=" fixed top-6 left-4 cursor-pointer z-10 text-red-500"
                >

                    {isMobileSidebarOpen ? (
                        <FaTimes className='text-white transition-all duration-700 ease-in-out' size={30} />
                    ) : (
                        <FaBars className='transition-all duration-700 ease-in-out' size={30} />
                    )}

                </div>
            )}


            {!isMobile ? (
                <aside className="md:static md:block bg-gray-100 w-1/5 p-4 text-black shadow-xl">
                    <h2 className="text-3xl font-bold pt-5 px-5 text-gray-600"><a href="/"><span className="text-red-500">T</span>ask<span className="text-red-500">S</span>ync</a></h2>
                    <ul className="pt-2 pb-4 space-y-1 text-sm mt-10">
                        <li className="mt-10 pt-5">
                            <a
                                style={{ cursor: "pointer" }}
                                className="flex items-center p-2 space-x-3 rounded-md"
                                onClick={changehomestate}
                            >
                                <AiFillHome size={20} className="ml-1 text-red-500" />
                                <span className="">Home</span>
                            </a>
                        </li>
                        {empdetails?.account_type == "Assigner" ? (

                            <>
                                <li className="mt-10 pt-5">
                                    <a
                                        style={{ cursor: "pointer" }}
                                        className="flex items-center p-2 space-x-3 rounded-md"
                                        onClick={changetaskstate2}
                                    >
                                        <BsListTask size={20} className="ml-1 text-red-500" />
                                        <span>Assign Tasks</span>
                                    </a>
                                </li>
                            </>

                        ) : (
                            <li className="mt-10 pt-5">
                                <a
                                    style={{ cursor: "pointer" }}
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                    onClick={changetaskstate}
                                >
                                    <BsListTask size={20} className="ml-1 text-red-500" />
                                    <span>My Tasks</span>
                                </a>
                            </li>
                        )}
                        <li className="mt-10 pt-5">
                            <a
                                onClick={logout}
                                className="flex items-center p-2 space-x-3 rounded-md"
                                style={{ cursor: "pointer" }}
                            >
                                <BiLogOut size={20} className="ml-1 text-red-500" />
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </aside>

            ) : isMobileSidebarOpen ? (
                <div>

                    <aside className="fixed inset-0 bg-red-600 bg-opacity-100 inline-flex justify-center">


                        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-red-500 text-white">
                            <li className="mb-2">
                                <a href="#" className="text-lg hover:underline hover:text-xl hover:duration-100">
                                    Dashboard
                                </a>
                            </li>
                            <li className="mb-2 mt-5">
                                <a href="#" className="text-lg hover:underline hover:text-xl hover:duration-100">
                                    Reports
                                </a>
                            </li>
                            <li className="mb-2 mt-5">
                                <a href="#" className="text-lg hover:underline hover:text-xl hover:duration-100">
                                    Users
                                </a>
                            </li>
                            {/* Add more sidebar links as needed */}
                        </ul>

                    </aside>
                </div>
            ) : (<></>)}

            {/* Main Content */}
            <main
                className={`${isMobile ? 'w-full' : 'w-3/4'
                    } p-6 transition-all duration-700 ease-in-out`}
            >
                {/* Content goes here */}
                {/* <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2> */}
                {!isMobileSidebarOpen && (
                    <>

                        <div class="fixed top-6 right-8 cursor-pointer">
                            <img src={maleavatar} onClick={() => editdiv ? seteditdiv(false) : seteditdiv(true)} alt="Avatar" class="w-10 rounded-full ring-red-500" />
                        </div>


                        {editdiv && (
                            <div id="avatar-dropdown" className="fixed top-20 right-8 w-48 bg-white border border-gray-300 rounded-lg shadow-lg bg-opacity-100 shadow-lg">
                                <div className='fixed right-10 mt-2 cursor-pointer' onClick={() => seteditdiv(false)}>
                                    <FaTimes className='transition-all duration-700 ease-in-out text-red-500' size={20} />
                                </div>
                                <ul class="py-8 pb-5">
                                    <li><a
                                        //onClick={logout}
                                        className="flex items-center p-2 space-x-3 hover:bg-gray-200"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <FiEdit size={20} className="ml-1 text-red-500" />
                                        <span>Edit Profile</span>
                                    </a></li>
                                    <li><a
                                        //onClick={logout}
                                        className="flex items-center p-2 space-x-3 hover:bg-gray-200"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <AiFillSetting size={20} className="ml-1 text-red-500" />
                                        <span>Settings</span>
                                    </a></li>
                                    <li><a
                                        //onClick={logout}
                                        className="flex items-center p-2 space-x-3 hover:bg-gray-200"
                                        style={{ cursor: "pointer" }}
                                        onClick={logout}
                                    >
                                        <BiLogOut size={20} className="ml-1 text-red-500" />
                                        <span>Logout</span>
                                    </a></li>
                                </ul>
                            </div>
                        )}


                        {homestate ? (
                            <div className="mx-auto mt-10 pt-20">

                                {empdetails?.account_type == 'Assigner' && (
                                    <button onClick={() => window.location.href = '/task/AddTask'} className="flex items-center text-white px-5 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-lg mb-4"><AiFillFileAdd size={25} />Add Task</button>
                                )}

                                <h1 className="text-2xl font-bold mb-4">Account Details</h1>



                                {/* <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div class="bg-blue-300 p-4 h-32 md:h-48">Item 1</div>
                                    <div class="bg-green-300 p-4 h-32 md:h-48">Item 2</div>
                                    <div class="bg-red-300 p-4 h-32 md:h-48">Item 3</div>
                                </div> */}


                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow shadow-red-300 h-32 md:h-40">
                                        <div className="text-sm font-medium text-gray-500 truncate">
                                            My Name
                                        </div>
                                        <div className="mt-1 text-xl font-semibold text-gray-900">
                                            {empdetails?.fname}
                                        </div>
                                    </div>
                                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow shadow-red-300 h-32 md:h-40">
                                        <div className="text-sm font-medium text-gray-500 truncate">
                                            Email
                                        </div>
                                        <div className="mt-1 text-xl font-semibold text-gray-900">
                                            {empdetails?.email}
                                        </div>
                                    </div>
                                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow shadow-red-300 h-32 md:h-40">
                                        <div className="text-sm font-medium text-gray-500 truncate">
                                            Type of Account
                                        </div>
                                        <div className="mt-1 text-xl font-semibold text-gray-900">
                                            {empdetails?.account_type}
                                        </div>
                                    </div>
                                </div>
                                <br />


                                <h1 className="text-2xl font-bold mb-4">Recent Activity</h1>


                                <section class="text-gray-600 body-font">
                                    <div class="container py-4 mx-auto">

                                        <div class="w-full mx-auto overflow-auto">

                                            {empdetails?.account_type == "Assigner" ? (
                                                createdrecent.length > 0 ? (

                                                    <>
                                                        <table class="table-auto w-full text-left whitespace-no-wrap">

                                                            <thead>
                                                                <tr>
                                                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Title</th>
                                                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Description</th>
                                                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Status</th>
                                                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Created</th>
                                                                </tr>
                                                            </thead>





                                                            {createdrecent?.length && createdrecent?.map((task, index) => {

                                                                return (
                                                                    <tbody>
                                                                        <tr key={index}>
                                                                            <td class="px-4 py-3">{task?.title}</td>
                                                                            <td class="px-4 py-3">{task?.description}</td>
                                                                            <td class="px-4 py-3"><span className={`inline-flex items-center rounded-md ${task?.status == 'complete' ? 'bg-green-50' : 'bg-yellow-50'} px-2 py-1 text-xs font-medium ${task?.status == 'complete' ? 'text-green-700 ring-green-600/20' : 'text-yellow-700 ring-yellow-500/100'} ring-1 ring-inset`}>{task?.status}</span></td>
                                                                            <td class="px-4 py-3">{task?.createdAt}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                )


                                                            }).slice(0, 3)}

                                                        </table>

                                                    </>
                                                ) : (<><p>No recent Tasks</p></>)
                                            ) : (

                                                recenttasks?.length > 0 ? (
                                                    <>
                                                        <table class="table-auto w-full text-left whitespace-no-wrap">
                                                            <thead>
                                                                <tr>
                                                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Title</th>
                                                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Description</th>
                                                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Status</th>
                                                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Created</th>
                                                                </tr>
                                                            </thead>

                                                            {recenttasks.length && recenttasks.map((task, index) => {

                                                                return (

                                                                    <tbody>
                                                                        <tr key={index}>
                                                                            <td class="px-4 py-3">{task?.title}</td>
                                                                            <td class="px-4 py-3">{task?.description}</td>
                                                                            <td class="px-4 py-3"><span className={`inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium ${task?.status == 'complete' ? 'text-green-700 ring-green-600/20' : 'text-yellow-400 ring-yellow-500/100'} ring-1 ring-inset`}>{task?.status}</span></td>
                                                                            <td class="px-4 py-3">{task?.createdAt}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                )

                                                            })}
                                                        </table>
                                                    </>
                                                ) : (
                                                    <><p>No Recent Tasks</p></>
                                                )


                                            )}

                                        </div>
                                        {/* <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                                            <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                                </svg>
                                            </a>
                                            <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
                                        </div> */}
                                    </div>
                                </section>
                            </div>
                        ) : (<></>)}

                        {taskstate ? <Tasks /> : <></>}

                        {assigntaskstate ? <AssignTask /> : <></>}

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
                                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                                        </div>
                                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                                Logging Out
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500">
                                                                    Are you sure you want to logout ?
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                        onClick={confirmlogout}
                                                    >
                                                        Logout
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


                        <Transition.Root show={openeditmodal} as={Fragment}>
                            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={editmodalclose}>
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
                                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center bg-green-100 justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                            <CheckCircleIcon className="h-8 w-10 text-green-600" aria-hidden="true" />
                                                        </div>
                                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                                Profile Updated
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500">
                                                                    Your profile has been updated
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <a
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                        onClick={editmodalclose}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        Back to Dashboard
                                                    </a>
                                                    {/* <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button> */}
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>
                    </>


                )}



            </main>
        </div>
    );
};

export default Newdash;
