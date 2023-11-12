import React, { useEffect, useRef } from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { Link } from "react-scroll";
import logo from "../assets/logo.svg"
// import { Routes, Route } from 'react-router-dom';
// import Register from "./Register"
import Navbar from './Navbar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Home = () => {


    return (
        <>
            <Navbar />
            <div name="home" className="h-screen w-full bg-gray-50">
                <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
                    <div className='flex flex-col justify-center h-full'>
                        <div>
                            <h2 className='mt-20 text-4xl sm:text-5xl font-bold text-black'>
                                {/* <TypingAnimation text="Hi, I am Animesh, Full Stack Developer" speed={100} /> */}
                                Efficiently Manage Your Team's Tasks with
                                <br />
                                <span className='text-gray-700'><a href="/"><span className="text-red-500">T</span>ask<span className="text-red-500">S</span>ync</a></span>
                            </h2>
                            <p className='text-black py-4 max-w-md'>
                                Our task assigner web application simplifies task management by helping you assign, track, and organize your team's tasks in one centralized location.
                            </p>
                            <p>Sign up now to streamline your team's workflow and increase productivity!</p>
                        </div>
                        <br />
                        <div>
                            <Link
                                to="project"
                                smooth
                                duration={500}
                                className="cursor-pointer group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-red-400 to-red-500"
                                onClick={() => window.location.href = '/register'}
                            //onClick={() => generatePDFFromHTML(htmlContent)}
                            >
                                SignUp
                                <span className="duration-300">
                                    <MdOutlineKeyboardArrowRight size={25} className="ml-1" />
                                </span>
                            </Link>
                        </div>
                        {/* <button onClick={handleclick}>Click</button> */}
                    </div>
                    <div>
                        <img src={logo} alt="joh" className="mx-auto w-2/3 md:w-full  md:flex" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home