import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useRef } from "react";
import React from 'react';
import ProgramAdminDashboard from '@/components/ProgramAdminDashboard';
const assigninstrctor = ({ cookies }) => {
    if (cookies.role != "program admin" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    const [msg, setMsg] = useState("");
    const closeMsg = () => {
        setMsg("");
    };
    const token = Cookies.get("token");
    const id1 = useRef();
    const id2 = useRef();


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const r = await fetch(
                `${process.env.url}api/v1/courses/assign-course-instructor`,
                {
                    method: "PATCH",

                    body: JSON.stringify({
                        instructorId: id1.current.value,
                        courseId: id2.current.value,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },

                }
            );

            const resp = await r.json();
            console.log(resp);
            if (resp.status == "success") {
                setMsg(success);
            } else {
                setMsg(fail);
            }
        } catch (e) {
            console.log(e);
        }

    };

    let fail = (
        <div
            id="alert-border-2"
            class="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
            role="alert"
        >
            <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
            <div class="ml-3 text-sm font-medium">
                Something went wrong please try again
                <a href="#" class="font-semibold underline hover:no-underline"></a>.
            </div>
            <button
                type="button"
                onClick={closeMsg}
                class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-border-2"
                aria-label="Close"
            >
                <span class="sr-only">Dismiss</span>
                <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </button>
        </div>
    );

    let success = (
        <div
            id="alert-border-3"
            class="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
            role="alert"
        >
            <i class="fa-solid fa-circle-check"></i>
            <div class="ml-3 text-sm font-medium">
                Instructor has been Assigned to the course successfully
                <a href="#" class="font-semibold underline hover:no-underline"></a>
            </div>
            <button
                onClick={closeMsg}
                type="button"
                class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-border-3"
                aria-label="Close"
            >
                <span class="sr-only">Dismiss</span>
                <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </button>
        </div>
    );


    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2">
                <ProgramAdminDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1">
                    <div className="contentAddUser2 flex flex-col gap-10">
                        <p className="font-normal">Courses {'>'} Assign Instructor</p>
                        <div className="flex flex-col gap-10 ">
                            <div className="flex flex-col gap-5  w-2/5">
                                <div> Instrctor ID: </div>
                                <input
                                    type="text"
                                    name='id1'
                                    className="input-form  w-full"
                                    ref={id1}

                                />
                            </div>

                            <div className="flex flex-col gap-5 w-2/5">
                                <div>Course ID:</div>
                                <input
                                    type="text"
                                    name='id2'
                                    className="input-form w-full"
                                    ref={id2}
                                />

                            </div>
                            {<div className="w-1/2 mt-10">{msg}</div>}

                        </div>



                        <div className="flex justify-end">
                            <button
                                type="submit"
                                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Assign
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default assigninstrctor;
