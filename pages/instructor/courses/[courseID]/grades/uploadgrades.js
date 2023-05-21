import React from "react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { handleFile } from "../../../../../common/uploadFile";
import Navbar from "@/components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";

const uploadgrades = ({ cookies }) => {
    const userState = useSelector((s) => s.user);
    if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
    });
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState("");
    const closeMsg = () => {
        setMsg("");
    };
    const submitHandler = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            data.forEach(async (row) => {
                const { studentCode, mark} = row;
                const obj = { studentCode, mark };
                const resp = await fetch(`${process.env.url}api/v1/courses/${cookies.instance_id}/marks`, {
                    method: "POST",
                    body: JSON.stringify({
                        "marks": [obj]
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + cookies.token,
                    },

                });
                const r = await resp.json();
                console.log(obj,r);
            });

        } catch (e) {
            console.log(e);
        }

    }
    let success = (
        <div
            id="alert-border-3"
            class="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
            role="alert"
        >
            <i class="fa-solid fa-circle-check"></i>
            <div class="ml-3 text-sm font-medium">
                Grades has been uploaded successfully
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
            <div className=" flex flex-row w-screen h-screen mt-2 scrollbar-none">
                <div className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative">
                    <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
                        <Navbar cookies={cookies} />
                        <div className=" flex flex-col items-center justify-center">
                            <label className=" text-black text-2xl mb-5">
                                Failed to upload the grades
                            </label>
                            <div className="w-2/3 flex flex-col items-center content-center">
                                <div className="w-full flex flex-col border-2 px-4 py-5 border-gray-200 m-0 mt-4  items-center content-center">
                                    <div className="w-full flex flex-row  rounded   items-center content-center">
                                        <label className="grow ">Course grades</label>
                                        <div>
                                            <label
                                                for="selectFile"
                                                className="text-green-700 bg-green-200 p-3 rounded cursor-pointer"
                                            >
                                                Upload Grades
                                            </label>
                                            <input
                                                type="file"
                                                id="selectFile"
                                                onChange={(event) =>
                                                    handleFile(event, (data) => {
                                                        setData(data);
                                                        console.log("dataaaaa", data);
                                                    })
                                                }
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div>
                                <button
                                    onClick={submitHandler}
                                    className=" text-blue-500 rounded border-2 border-blue-400 px-4 py-2 hover:bg-blue-500 hover:text-white mt-6"
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                        <div className="flex gap-20 ">
                            {<div className="w-1/2 mt-10">{msg}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default uploadgrades;
