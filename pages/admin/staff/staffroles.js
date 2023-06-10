import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import React from "react";
import Textarea from "@/components/Textarea/TextareaRoles";
const staffRoles = ({ cookies }) => {
    const userState = useSelector((s) => s.user);
    if (userState.role != "system admin" || userState.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
    });
    const [msg, setMsg] = useState("");
    const closeMsg = () => {
        setMsg("");
    };
    const staff = useRef();
    const role = useRef();
    const choosen = useRef()
    const [staffArr, setStaff] = useState([]);
    const [rolesArr, setRoles] = useState([]);
    let selectedItems = [];
    let memberID = "";

    const handleChangeRole = (role) => {
        console.log(selectedItems);
        if(role.current.value=="null"){
            return
        }
        selectedItems.push(role.current.value);
        choosen.current.value = selectedItems.map((e) => {
            return e;
        });
        //setRoles(rolesArr.filter(val => val !== role.current.value));
        console.log(selectedItems);
    };
    const handleReset = (e) => {
        e.preventDefault();
        selectedItems.length = 0;
        choosen.current.value = selectedItems.map((e) => {
            return e;
        });
        console.log(selectedItems);
    };
    const handleMember = (staff) => {
        memberID = staff.current.value;
        {
            staffArr.map((e) => {
                {
                    if (e.id === memberID) {
                        selectedItems = selectedItems.concat(e.roles);
                        choosen.current.value = selectedItems.map((e) => {
                            return e;
                        });
                    }
                }

            })
        }
        setRoles(items.filter(val => !selectedItems.includes(val)));
        console.log(selectedItems);
    };

    const items = [
        "instructor",
        "quality coordinator",
        "program coordinator",
        "dean",
        "teaching assistant",
        "faculty admin",
        "program admin",
        "department admin",
    ];
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        async function getAllStaff() {
            const resp = await fetch(`${process.env.url}api/v1/users/staff`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userState.token,
                },
            });
            const data = await resp.json();
            console.log(data);
            const newData = data.data.map((e) => {
                return { name: e.name, id: e._id, roles: e.roles };
            });
            setStaff(newData);
        
            if(staff.current?.value){
                try{
                  
                      newData.map((e) => {
                        {

                            if (e.id === staff.current?.value) {
                                setRoles(items.filter(val => !e.roles.includes(val)));
                              
                            }
                        }
        
                    })
                }catch(e){
                    console.log(e)
                }
             
              }
        }
        getAllStaff();
    }, [update]);
    //console.log("araaaaay",staffArr);
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(staff.current.value)
        try {
            const r = await fetch(
                `${process.env.url}api/v1/users/staff/role/${staff.current.value}`,
                {
                    method: "PATCH",

                    body: JSON.stringify({
                        roles: selectedItems,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + userState.token,
                    },
                }
            );
      setUpdate(!update);

            const resp = await r.json();
            console.log(resp);
            if (resp.status == "fail") {
                setMsg(fail);
            } else {
                setMsg(success);
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
                Failed to assign roles to the choosen user
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
                Roles has been added successfully
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
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
                >
                    <div className="contentAddUser2 flex flex-col gap-10">
                        <p className="font-normal">Staff {">"} Add roles</p>
                        <div className="flex gap-20  ">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div> Saff members: </div>
                                <select
                                    ref={staff}
                                    id="small"
                                    class="block w-full text-xl md:text-lg p-3   text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                                    onChange={() => handleMember(staff)}
                                >
                                    <option selected>Choose a member</option>
                                    {staffArr.map((e) => {
                                        {
                                            if (e.name !== "admin")
                                                return <option value={e.id}>{e.name}</option>;
                                        }

                                    })}{" "}
                                </select>
                            </div>

                            <div className="flex flex-col gap-5 w-2/5 ">
                                <div>Staff roles:</div>

                                <select
                                    ref={role}
                                    id="small"
                                    required
                                    class="block w-full text-xl md:text-lg p-3   text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                                    onChange={() => handleChangeRole(role)}
                                >
                                    <option value='null' selected>Choose a role</option>
                                    {rolesArr.map((e) => {
                                        return <option value={e}>{e}</option>;
                                    })}{" "}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-20 w-auto ">
                            <div className="flex flex-col gap-5  w-full">
                                <div> Choosen roles: </div>
                                <Textarea
                                    type="text"
                                    name="choosen"
                                    className="w-full "
                                    disabled
                                    ref={choosen}
                                />
                            </div>
                            <div className="flex flex-col gap-5 w-2/5 ">
                                <div class="flex items-center justify-start mr-6 text-lg text-gray-700 capitalize mt-12 ">
                                    <button
                                        onClick={handleReset}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                    >
                                        Reset roles
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-20 ">
                            {<div className="w-1/2 mt-10">{msg}</div>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                class="w-[8rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Add roles
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default staffRoles;
