import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import { MdLogin } from "react-icons/md"
import maleavatar from '../assets/male-avatar.svg'

const Navbar = () => {

    const [nav, setNav] = useState(false);
    const local = localStorage.getItem("empdetails")

    const links = [
        {
            id: 1,
            link: "home",
        },
        {
            id: 2,
            link: "about",
        },
        {
            id: 3,
            link: "Blog",
        },
        {
            id: 4,
            link: "contact",
        },

    ];

    const redirectLogin = () => {
        window.location.href = "/login"
    }
    return (
        <div className="flex justify-between items-center w-full h-20 px-4 text-black bg-gray-50 fixed z-20">
            <div>
                <a href="/">
                    <h1 className="font-bold text-4xl ml-10 text-gray-600"><a href="/"><span className="text-red-500">T</span>ask<span className="text-red-500">S</span>ync</a></h1>
                </a>
            </div>
            <ul className="items-center hidden md:flex">
                {links.map(({ id, link }) => (
                    <li
                        key={id}
                        className="px-4 cursor-pointer capitalize font-medium text-black hover:border-b-2 border-red-500 duration-10 hover:text-red-500"
                    >
                        <Link
                            to={link}
                            smooth
                            duration={500}
                        >
                            {link}
                        </Link>
                    </li>
                ))}
                {local != null ? (
                    <a href="/EditProfile"> <img
                        className=" cursor-pointer h-10 w-10 rounded-full object-cover hover:h-20 hover:w-20 duration-150"
                        src={maleavatar}
                        alt="Avatar"
                    /></a>
                ) : (
                    <div>
                        <a
                            onClick={redirectLogin}
                            className="cursor-pointer group text-red-500 w-fit h-10 px-6 py-3 my-2 ml-10 flex items-center ring-1 duration-500 ring-red-500 rounded-md hover:bg-red-500 hover:text-white"
                        >
                            Login
                            <span className="">
                                <MdLogin size={25} className="ml-1" />
                            </span>
                        </a>
                    </div>
                )}
            </ul>

            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-red-500 md:hidden"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white text-red-500">
                    {links.map(({ id, link }) => (
                        <li
                            key={id}
                            className=" px-4 cursor-pointer capitalize  py-6 text-4xl hover:scale-105 duration-200"
                        >
                            <Link
                                onClick={() => setNav(!nav)}
                                to={link}
                                smooth
                                duration={500}
                            >
                                {link}
                            </Link>
                        </li>
                    ))}
                    <br />

                    <div>
                        <a
                            onClick={redirectLogin}

                            className="cursor-pointer group text-red-500 w-fit h-10 px-6 py-3 my-2 ml-auto flex items-center ring-1 duration-500 ring-red-500 rounded-md hover:bg-bg-gradient-to-r from-red-400 to-red-500 hover:text-white"
                        >
                            Login
                            <span className="">
                                <MdLogin size={25} className="ml-1" />
                            </span>
                        </a>
                    </div>
                </ul>
            )}
        </div>
    );
}

export default Navbar;