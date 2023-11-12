import React from 'react'
import { AiFillHome } from "react-icons/ai"
import { BsListTask } from "react-icons/bs"
import { BiBold, BiLogOut } from "react-icons/bi"
import { FiEdit } from "react-icons/fi"
import { AiFillSetting } from "react-icons/ai"
const Sidebar = () => {
    return (
        
            <aside className="md:static md:block bg-gray-100 w-1/5 p-4 text-black shadow-xl">
                <h2 className="text-3xl font-bold pt-5 px-5 text-gray-600"><a href="/"><span className="text-red-500">T</span>ask<span className="text-red-500">S</span>ync</a></h2>
                <ul className="pt-2 pb-4 space-y-1 text-sm mt-10">
                    <li className="mt-10 pt-5">
                        <a
                            style={{ cursor: "pointer" }}
                            className="flex items-center p-2 space-x-3 rounded-md"
                            //onClick={changehomestate}
                        >
                            <AiFillHome size={20} className="ml-1 text-red-500" />
                            <span className="">Home</span>
                        </a>
                    </li>
                    {/* {empdetails?.account_type == "Assigner" ? (

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
                    )} */}
                    <li className="mt-10 pt-5">
                        <a
                            //onClick={logout}
                            className="flex items-center p-2 space-x-3 rounded-md"
                            style={{ cursor: "pointer" }}
                        >
                            <BiLogOut size={20} className="ml-1 text-red-500" />
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </aside>
        
    )
}

export default Sidebar
