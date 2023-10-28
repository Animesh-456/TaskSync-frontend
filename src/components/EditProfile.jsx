import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { getUser } from '../api/endpoints'
import maleavatar from '../assets/male-avatar.svg'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import common from '../helpers/common'
import { updateemployee } from '../api/endpoints';
const EditProfile = () => {
    const [profileData, setProfileData] = useState(null);


    useEffect(() => {

        const userdata = localStorage.getItem('empdetails');
        const token = JSON.parse(userdata);
        getUser(token)
            .then(d => {
                if (d.status == 500) {
                    localStorage.removeItem("empdetails")
                    window.location.href = "/login"
                }
                console.log("data is ", d.status)
                //setProfileData(d.data)
                //setFormData(d.data);
                localStorage.setItem("usereditprofile", JSON.stringify(d.data))
            }).catch(error => {
                toast.error(error)
            })
    }, [])

    const handleSubmit = () => {

        updateemployee(formData).then(d => {
            if (d.status == 201) {
                toast.success("Profile Updated!");
                const userdata = localStorage.getItem('empdetails');
                const token = JSON.parse(userdata);
                getUser(token)
                    .then(d => {
                        if (d.status == 500) {
                            localStorage.removeItem("empdetails")
                            window.location.href = "/login"
                        }
                        localStorage.setItem("usereditprofile", JSON.stringify(d.data))
                        setTimeout(() => {
                            window.location.href='/dash'
                        }, 1000);
                    }).catch(error => {
                        toast.error(error)
                    })

            } else {
                toast.error("Error Occured!");
            }
        }).catch(error => {
            toast.error(error)
        })
    }




    let editstate = JSON.parse(localStorage.getItem("usereditprofile"))

    const [formData, setFormData] = useState({
        fname: editstate?.fname,
        lname: editstate?.lname,
        email: editstate?.email,
        description: editstate?.description || ""
    });

    const setprofile = common(setFormData)


    console.log("For rdit profile console", formData)


    return (
        <div class='flex items-center justify-center mx-auto mt-10'>
            <form >
                <div className="space-y-8">
                    <div class="flex items-center justify-center">
                        <img src={maleavatar} alt="male avatar" class="w-20 h-20" />
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-3xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        name='fname'
                                        value={formData?.fname}
                                        onChange={setprofile('fname')}
                                        className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData?.lname}
                                        onChange={setprofile('lname')}
                                        className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={formData?.email}
                                        disabled='true'
                                        className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:red-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div> */}

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description/Bio
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        rows={5}
                                        value={formData?.description}
                                        onChange={setprofile('description')}
                                        className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <a href='/dash' type="button" className="text-sm font-semibold leading-6 text-blue-900">
                        Cancel
                    </a>
                    <a
                        onClick={handleSubmit}
                        //type="submit"
                        className="cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Save Changes
                    </a>
                </div>
            </form>

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

export default EditProfile
