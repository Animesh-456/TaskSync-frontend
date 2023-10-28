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

    const handleclick = async () => {
        //window.location.href = "/register"
        var pdfjs = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                @page {
                  size: A4;
                  margin: 0;
                }
                
                body {
                  margin: 1cm;
                  font-family: Arial;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 12px;
                }
                
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                
                th {
                    background-color: #dfdfdf;
                }
            </style>
        </head>
        <body>    
            <table>
                <tr>
                    <th>Name of the project</th>
                    <th>Project amount</th>
                    <th>Commission (%)</th>
                    <th>Commission Paid</th> 
                </tr>
                <tr>
                    <td>asder</td>
                    <td>$8569</td>
                    <td>8%</td>
                    <td>$895</td> 
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>14.9</td>
                    <td>77.07</td>
                </tr>
            </table>
        </body>
        </html>`;

        var pdfjs2 = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style type="text/css">
            table{
                font-family: Arial;
            }
        </style>
        </head>
        <body>    
        <table width="650px" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; display: table;">
            <tr>
                <td>
                    <img width="150px" src="http://jhunsinfobay.net/usineur/img/logo.png" width="100px" alt="" />
                </td>
                <td align="right" style="color:#1e4066">
                    <b style="font-size: 14px;">Date: 2023-09-23</b>
                </td>
            </tr>
            <tr><td height="10px"></td></tr>
            <tr>
                <td style= "color: '#1e4066';font-size: 14px;"><b>Machining-4U -SAS Faberville</b></td>
                <td align="right" style=" color: #1e4066; font-size: 14px;"><b>Invoice No: 2023-2021001</b></td>
            </tr>
            <tr><td height="10px"></td></tr>
            <tr>
                <td>
                    <address style="font-size: 14px;">
                        15 rue Racine<br />
                        91400 Orsay<br />
                        No SIRET: 821 296 092<br />
                        HOWRAH<br />
                        KOLKATA<br />
                        711303
                    </address>
                </td>
            </tr>
           
            <tr>
                <td height="10px"></td>
            </tr>
            <tr>
                <td align="center" colspan="2"><b style="font-size: 14px;">Invoice</b></td>
            </tr>
            <tr>
                <td height="10px"></td>
            </tr>
            <tr align="center">
                <td colspan="2">
                    <table width="100%" cellpadding="5" cellspacing="0" style="border: 1px solid #ccc;">
                        <tr style="font-size: 14px" bgcolor="#dfdfdf" align="center">
                            <td><b>Name of the project</b></td>
                            <td align="left"><b>Project amount</b></td>
                            <td><b>Commission(%)</b></td>
                            <td><b>Commission Paid</b></td> 
                        </tr>
                        <tr style="font-size: 14px" align="center">
                            <td style="border-bottom: 1px solid #ccc; border-right: 1px solid #ccc;"><b>asder</b></td>
                            <td align="left" style="border-bottom: 1px solid #ccc; border-right: 1px solid #ccc;"><b>$8569</b></td>
                            <td style="border-bottom: 1px solid #ccc; border-right: 1px solid #ccc;">8%</td>
                            <td style="border-bottom: 1px solid #ccc;">$895</td> 
                        </tr>
                        <tr align="center">
                            <td style="border-right: 1px solid #ccc;"></td>
                            <td style="border-right: 1px solid #ccc;"></td>
                            <td align="center" style="border-right: 1px solid #ccc;">14.9</td>
                            <td align="center">77.07</td>
                        </tr>
                    </table>
                </td>        
            </tr>
            
        </table>
        </body>
        </html>`;

        // const doc = new jsPDF('p', 'mm', 'a4');

        // doc.html(pdfjs, {
        //     callback: function (doc) {
        //         doc.save(`output.pdf`);
        //         // var pdfBase64 = doc.output('blob');
        //         // const formData = new FormData();
        //         // formData.append('pdfFile', pdfBase64, `${transaction_id}.pdf`);
        //         // api.project.save_pdf({ body: formData, params: { tid: transaction_id } });
        //     }

        // });

        //generatePDFFromHTML(htmlContent);

    }
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
                            //onClick={handleclick}
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