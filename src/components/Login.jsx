import loginsvg from '../assets/loginsvg.svg'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import common from '../helpers/common'
import { Outlet, Link } from "react-router-dom";
import add from "../controller/employee/reg"
import { loginschema, regschema } from '../validation/emp/empschema';
import login from '../controller/employee/login';

const Login = () => {
    const [user, setuser] = useState({
        email: "",
        //account_type: "Assigner",
        password: "",
    })



    const [check, setcheck] = useState(false)

    const setprofile = common(setuser)



    const handelsubmit = () => {

        const { error } = loginschema.validate(user)
        if (error) {
            toast.warning(error.message)
            return
        }
        login(user).then(response => {
            if (response.toString() == "true") {
                toast.success("Logged in!")
                window.location.href = "/dash"
            } else {
                toast.error("Invalid Email or Password")
            }
        }).catch(error => {
            toast.error(error)
        })
    }

    console.log("checkbox state:- ", check)
    console.log("user data is :-", user)


    return (
        <>
            <div className="min-h-screen py-20 bg-gradient-to-b from-gray-50 via-red-100 to-red-200">
                <div class="container mx-auto">
                    <div class="flex flex-col lg:flex-row w-10/12 lg:w-9/12 bg-gray-50 rounded-xl mx-auto shadow-lg overflow-hidden">
                        <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center">

                            <img src={loginsvg} alt="joh" className="mx-auto w-2/3 md:w-full md:flex hidden" />
                        </div>
                        <div class="w-full lg:w-1/2 py-16 px-12">
                            <h2 class="text-4xl mb-4 font-medium text-gray-700"> <span className='text-red-500'>TaskSync</span> Login</h2>
                            <p class="mb-4">
                                Get Started with TaskSync - Sign In
                            </p>
                            <form action="#">

                                <div class="mt-5">
                                    <label htmlFor="Email" className='px-2 font-medium'>Email</label>
                                    <input type="text" placeholder="Email" value={user.email} onChange={setprofile("email")} class="border border-gray-400 py-3 px-5 w-full rounded-md" />
                                </div>

                                {/* <div class="mt-5">
                                    <label htmlFor="TypeOfAccount" className='px-2 font-medium'>Type of account</label>
                                    <select name="id" value={user.account_type} onChange={setprofile("account_type")} className='border border-gray-400 py-3 px-5 w-full rounded-md'>
                                        <option value="Assigner">Assigner</option>
                                        <option value="Employee">Employee</option>
                                    </select>

                                </div> */}
                                <div class="mt-5">

                                    <label htmlFor="Password" className='px-2 font-medium'>Password</label>
                                    <input type="password" value={user.password} onChange={setprofile("password")} placeholder="Password" class="border border-gray-400 py-3 px-5 w-full rounded-md" />
                                </div>

                                <div class="grid grid-cols-2 gap-5 mt-5">
                                    <a className="w-full cursor-pointer bg-white py-3 border border-red-500 rounded-md text-center text-red-500 hover:text-white hover:bg-red-500 hover:duration-700 " onClick={handelsubmit}>Login</a>
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

export default Login