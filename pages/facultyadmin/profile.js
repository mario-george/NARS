import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useRef,useEffect } from 'react';
import Cookies from "js-cookie";
import FacultyadminDashboard from '@/components/FacultyadminDashboard';
const profile = ({ cookies }) => {

    const globalStateCookies = useSelector((s) => s.user.cookies);
    console.log(cookies);
    if (cookies.role != "system admin" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    useEffect( () => { document.querySelector("body").classList.add("scrollbar-none") } );
    const submitHandler = async (e) => {
        e.preventDefault();
    };
    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2">
                <FacultyadminDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1">
                    <div className="contentAddUser2 flex flex-col gap-10">
                        <p className="underline mb-1">Profile details:</p>
                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div>Role</div>
                                <input
                                    type="text"
                                    className="inputAddUser2 w-full"
                                    value={cookies.role}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-5  w-2/5">
                                <div> Name</div>
                                <input
                                    type="text"
                                    className="inputAddUser2  w-full"
                                    defaultValue={cookies.name}
                                />
                            </div>
                        </div>
                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div>ID</div>
                                <input
                                    type="text"
                                    className="inputAddUser2 w-full"
                                    value={cookies._id}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-5  w-2/5">
                                <div> Email </div>
                                <input
                                    type="text"
                                    className="inputAddUser2  w-full"
                                    value={cookies.email}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Edit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default profile;
