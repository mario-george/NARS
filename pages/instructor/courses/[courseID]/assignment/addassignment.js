import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRef } from "react";
import React from 'react';
import InstructorDashboard from '@/components/InstructorDashboard';
import Navbar from "@/components/Navbar/Navbar"
import MassageAlert from "@/components/MassageAlert";
const addassignment = ({ cookies }) => {
    if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    useEffect( () => { document.querySelector("body").classList.add("scrollbar-none") } );
    // const [msg, setMsg] = useState("");
    const [status, setStatus] = useState("");
    // const closeMsg = () => {
    //     setMsg("");
    // };

    const [selectedFile, setSelectedFile] = useState(null);

    const token = Cookies.get("token");
    const name = useRef();
    const desc = useRef();
    const router = useRouter();
    const { courseID } = router.query;
    const [id, setId] = useState("");
    const [alerts, setAlerts] = useState([]);
    const date = useRef();

    useEffect(() => {
        get_id();
    }, []);
    const get_id = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const resp = await fetch(`${process.env.url}api/v1/courses/created-courses/${cookies.instance_id}`, {
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
        data.append("course", courseID);
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
            setStatus(resp.status);
            if(resp.status === "fail"){
                setAlerts(alt => [...alt, <MassageAlert 
                    fail="Failed to upload the assignment"
                    status="success"
                    key={Math.random()} 
                />])
            }
            if(resp.status === "success"){
                setAlerts(alt => [...alt, <MassageAlert 
                    success="Assignment has been uploaded successfully"
                    status="success"
                    key={Math.random()} 
                />])
            }
        } catch (e) {
            console.log(e);
        }

    };


    

    return (
        <>  
            <div>{alerts.map(e=><div>{e}</div>)}</div>
            <div className="flex flex-row w-screen h-screen mt-2">
                <InstructorDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1">
                    <div className="contentAddUser2 flex flex-col gap-10 overflow-auto" >
                    <Navbar cookies={cookies} />
                        {/*<p className="font-normal">Assignments {'>'} Upload assignment</p>*/}
                        <div className="flex gap-20">
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
                            <div className="flex flex-col gap-5  w-2/5 ">
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
                                file:text-sm file:font-medium
                                file:bg-gray-200 file:text-gray-700
                                hover:file:cursor-pointer hover:file:bg-amber-50
                                hover:file:text-amber-700
                            "  onChange={(e) => setSelectedFile(e.target.files[0])} />

                            </div>

                        </div>
                        {/* <div className="flex gap-20 ">
                        </div> */}

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
