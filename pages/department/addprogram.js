import { createRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import React from "react";
const addprogram = ({ cookies }) => {
    const userState = useSelector((s) => s.user);
    if (userState.role != "department admin" || userState.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    const [msg, setMsg] = useState("");
    const closeMsg = () => {
        setMsg("");
    };
    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
    });
    const [inputs, setInputs] = useState([]);
    const [inputs2, setInputs2] = useState([]);
    const handleAddInput = (e) => {
        e.preventDefault();

        setInputs([
            ...inputs,
            {
                ref: createRef(),
            },
        ]);

        setInputs2([
            ...inputs2,
            {
                ref: createRef(),
            },
        ]);
    };
    const removeLO1 = (e, input2, input) => {
        e.preventDefault();
        setInputs2(
            inputs2.filter((e) => {
                return e != input2;
            })
        );
        setInputs(
            inputs.filter((e) => {
                return e != input;
            })
        );
    };
    const [err, setErr] = useState("");

    const name = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        const arr1 = inputs.map((input1) => {
            return {
                code: input1.ref.current.value,
            };
        });
        const arr2 = inputs2.map((input2) => {
            return {
                value: input2.ref.current.value,
            };
        });
        const competences = arr1.map((a, index) => {
            const b = arr2[index];
            return {
                code: a.code,
                description: b.value,
            };
        });

        try {
            const r = await fetch(`${process.env.url}api/v1/programs/`, {
                method: "POST",

                body: JSON.stringify({
                    name: name.current.value,
                    competences: competences,
                    department: userState.department,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + userState.token,
                },
            });

            const resp = await r.json();
            console.log(resp);
            if (resp.status == "fail" || resp.status == "error") {
                setErr(resp.error.errors.dean.message);
                console.log(resp, err);
                setMsg(fail);
            }
            else {
                setMsg(success);
                console.log(resp);
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
                Failed to create program
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
                Program has been Created successfully
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
            <div className="flex flex-row w-screen h-screen mt-2 scrollbar-none">
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
                >
                    <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
                        <p className="font-normal">Department {">"} Add Program</p>
                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div>Program Name:</div>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-form w-full"
                                    ref={name}
                                />
                            </div>

                        </div>

                        
                        <div className="flex gap-20 ">
                            <div className="flex flex-col space-y-1 w-full">
                                <p className=" mb-0 ">Competences:</p>
                                <div class="flex items-center justify-end mr-6 text-lg text-gray-700 capitalize ">
                                    <button
                                        onClick={handleAddInput}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                    >
                                        Add
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 ">
                                    <div className="">
                                        <div className="mb-5">
                                            Code: &emsp; &emsp; &emsp; &emsp; &emsp;Description:
                                        </div>
                                        {inputs.map((input, index) => {
                                            return (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    ref={input.ref}
                                                    className="input-form w-1/6"
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className="-space-x-96 ">
                                        <div className="mb-10  inline-block"></div>
                                        {inputs2.map((input2, index) => {
                                            const input = inputs[index];
                                            return (
                                                <div className="relative">
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        ref={input2.ref}
                                                        className="input-form w-3/6"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => removeLO1(e, input2, input)}
                                                        className="ml-100 absolute bottom-2 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                                                        data-dismiss-target="#alert-border-2 "
                                                        aria-label="Close"
                                                    >
                                                        <span className="sr-only ">Dismiss</span>
                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-5 h-5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-20 ">
                            {<div className="w-1/2 mt-10">{msg}</div>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default addprogram;
