import register from '../assets/register.svg'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import common from '../helpers/common'
import { Outlet, Link } from "react-router-dom";
import add from "../controller/employee/reg"
import { regschema } from '../validation/emp/empschema';

const Reg = () => {
    const [user, setuser] = useState({
        fname: "",
        lname: "",
        email: "",
        account_type: "Assigner",
        password: "",
    })

    const [confirmPassword, setconfirmPassword] = useState({
        confirm_pass: "Anim"
    })

    const [check, setcheck] = useState(false)

    const setprofile = common(setuser)
    const confirm_pass = common(setconfirmPassword)

    const final = () => {
        if (check == true) {
            setcheck(false)
        } else {
            setcheck(true)
        }
    }

    const handelsubmit = () => {
        if (!check) {
            toast.error("Please agree to the terms!")
            return
        }

        const { error } = regschema.validate(user)
        if (error) {
            toast.warning(error.message)
            return
        }
        add(user).then(response => {
            if (response == 201) {
                toast.success("Registered Successfully !")
                window.location.href = '/login'
            } else {
                toast.error("Email already exists!")
                return
            }

        }).catch(error => {
            toast.error(error)
        })
    }

    console.log("checkbox state:- ", check)
    console.log("user data is :-", user)

    console.log("Password confirmation", confirmPassword)


    return (
        <>
            <div className="min-h-screen py-20 bg-gradient-to-b from-gray-50 via-red-100 to-red-200">
                <div class="container mx-auto">
                    <div class="flex flex-col lg:flex-row w-10/12 lg:w-9/12 bg-gray-50 rounded-xl mx-auto shadow-lg overflow-hidden">
                        <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center">
                            {/* <h1 class="text-red-500 text-3xl mb-3">Welcome</h1>
                            <div>
                                <p class="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac </p>
                            </div> */}
                            <img src={register} alt="joh" className="mx-auto w-2/3 md:w-full md:flex hidden" />
                        </div>
                        <div class="w-full lg:w-1/2 py-16 px-12">
                            <h2 class="text-4xl mb-4 font-medium text-gray-700"> <span className='text-red-500'>TaskSync</span> Registration</h2>
                            <p class="mb-4">
                                Create your account. It’s free and only take a minute
                            </p>
                            <form action="#">
                                <div class="grid grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="Fname" className='px-2 font-medium'>First Name</label>
                                        <input type="text" placeholder="Firstname" value={user.fname} onChange={setprofile("fname")} class="border border-gray-400 py-3 px-5 rounded-md" />
                                    </div>
                                    <div>
                                        <label htmlFor="Lname" className='px-2 font-medium'>Last Name</label>
                                        <input type="text" placeholder="Surname" value={user.lname} onChange={setprofile("lname")} class="border border-gray-400 py-3 px-5 rounded-md" />
                                    </div>
                                </div>
                                <div class="mt-5">
                                    <label htmlFor="Email" className='px-2 font-medium'>Email</label>
                                    <input type="text" placeholder="Email" value={user.email} onChange={setprofile("email")} class="border border-gray-400 py-3 px-5 w-full rounded-md" />
                                </div>

                                <div class="mt-5">
                                    <label htmlFor="TypeOfAccount" className='px-2 font-medium'>Type of account</label>
                                    <select name="id" value={user.account_type} onChange={setprofile("account_type")} className='border border-gray-400 py-3 px-5 w-full rounded-md'>
                                        <option value="Assigner">Assigner</option>
                                        <option value="Employee">Employee</option>
                                    </select>
                                    {/* <input type="option" placeholder="Email" class="border border-gray-400 py-3 px-5 w-full rounded-md" /> */}
                                </div>
                                <div class="mt-5">

                                    <label htmlFor="Password" className='px-2 font-medium'>Password</label>
                                    <input type="password" value={user.password} onChange={setprofile("password")} placeholder="Password" class="border border-gray-400 py-3 px-5 w-full rounded-md" />
                                </div>
                                {/* <div class="mt-5">
                                    <label htmlFor="ConfirmPassword" className='px-2 font-medium'>Confirm Password</label>
                                    <input type="password" value={confirmPassword} onChange={confirm_pass("confirm_pass")} placeholder="Confirm Password" class="border border-gray-400 py-3 px-5 w-full rounded-md" />
                                </div> */}
                                <div class="mt-5">
                                    <input type="checkbox" onChange={final} class="border border-gray-400 ml-5" />

                                    <span>
                                        I accept the <a href="#" className='text-red-500 font-semibold'>Terms of Use</a> &  <a href="#" className='text-red-500 font-semibold'>Privacy Policy</a>
                                    </span>
                                </div>
                                <div class="grid grid-cols-2 gap-5 mt-5">
                                    <a className="w-full cursor-pointer bg-white py-3 border border-red-500 rounded-md text-center text-red-500 hover:text-white hover:bg-red-500 hover:duration-700 " onClick={handelsubmit}>Register Now</a>
                                    <Link className="w-full bg-white py-3 border border-gray-500 rounded-md text-center text-gray-500 hover:text-white hover:bg-gray-500 hover:duration-700 " to="/">Cancel</Link>
                                </div>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Reg