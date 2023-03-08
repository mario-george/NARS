import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRef } from "react";
import React from 'react';
import InstructorDashboard from '@/components/InstructorDashboard';
import { string } from "yup";
const addassignment = ({ cookies }) => {
    if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }

    const [msg, setMsg] = useState("");
    const closeMsg = () => {
        setMsg("");
    };

    const [selectedFile, setSelectedFile] = useState(null);

    const token = Cookies.get("token");
    const name = useRef();
    const desc = useRef();
    const router = useRouter();
    const { courseID } = router.query;
    const [id, setId] = useState("");
    const date = useRef();

    useEffect(() => {
        get_id();
    }, []);
    const get_id = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const resp = await fetch(`${process.env.url}api/v1/courses/created-courses/${courseID}`, {
                headers: {
                    Authorization: "Bearer " + cookies.token,
                },
            });
            const data = await resp.json();
            setId(data.data.course);
            Cookies.set('original_id', data.data.course);
            //console.log(id);
        } catch (e) {
            console.log(e);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // console.log(origninal_id);
        const data = new FormData();
        data.append("assignmentPath", selectedFile);
        data.append("name", name.current.value);
        data.append("course", cookies.original_id);
        data.append("deuTO", date.current.value);

        try {
            const r = await fetch(
                `${process.env.url}api/v1/courses/assignment`,
                {
                    method: "POST",
                    body: data,
                    headers: {
                        Accept: "application/form-data",
                        Authorization: "Bearer " + token,
                    },
                }
            );

            const resp = await r.json();
            console.log(resp);
            //console.log(origninal_id);
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
                Failed to upload the assignment
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
                Assignment has been uploaded successfully
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
                <InstructorDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1">
                    <div className="contentAddUser2 flex flex-col gap-10 overflow-auto" >
                        <p className="font-normal">Assignments {'>'} Upload assignment</p>
                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-1/3">
                                {/*final quiz midterm*/}
                                <div>Assignment name:</div>
                                <input
                                    type="text"
                                    name='name'
                                    className="input-form w-full"
                                    ref={name}
                                />
                            </div>
                            <div className="flex flex-col gap-5  w-2/5">
                                <div> Due to:</div>
                                <input
                                    type="datetime-local"
                                    name='date'
                                    className="input-form  w-full"
                                    ref={date}
                                />
                            </div>
                        </div>
                        <div className="flex gap-20 ">

                            <div className="flex flex-col gap-5 w-2/5">

                                <div> Select file:</div>
                                <input type="file" class="text-sm text-grey-500
                                            file:mr-5 file:py-3 file:px-10
                                            file:rounded-full file:border-0
                                            file:text-md file:font-semibold  file:text-white
                                            file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
                                            hover:file:cursor-pointer hover:file:opacity-80
                                        " onChange={(e) => setSelectedFile(e.target.files[0])} />

                            </div>

                        </div>


                        <div className="flex gap-20 ">
                            {<div className="w-1/2 mt-10">{msg}</div>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Upload
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default addassignment;
