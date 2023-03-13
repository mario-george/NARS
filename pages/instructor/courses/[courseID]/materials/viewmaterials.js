import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import InstructorDashboard from "@/components/InstructorDashboard";
import MaterialFileItem from '@/components/filesView/MaterialFileItem'
import MaterialFileCard from '@/components/filesView/MaterialFileCard'
import Navbar from "@/components/Navbar/Navbar"
import Lottie from "lottie-react";
import notFound from "./notFound.json"
import { TbFileAlert } from 'react-icons/tb'

const viewmaterials = ({ cookies }) => {
    if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    useEffect(() => { document.querySelector("body").classList.add("scrollbar-none") });
    const [exam, setExam] = useState([]);
    const router = useRouter();
    const { courseID } = router.query;

    useEffect(() => {
        //get_id();
        submitHandler();
    }, []);
    /* const get_id = async (e) => {
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
             Cookies.set('original_id', data.data.course);
             console.log(data.data.course);
         } catch (e) {
             console.log(e);
         }
     };*/
    const submitHandler = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const resp = await fetch(`${process.env.url}api/v1/courses/original-courses/getAllMaterials/${cookies.original_id}`, {
                headers: {
                    Authorization: "Bearer " + cookies.token,
                },
            });
            const data = await resp.json();
            //console.log(data.data);
            let arr = data.data;

            arr = arr.map((e) => {
                return { id: e._id, title: e.name, path: e.path, description: e.description, date: e.date };
            });
            setExam(arr);
        } catch (e) {
            console.log(e);
        }
    };

    if (exam.length === 0) {
        return (
            <>
                <div className="flex flex-row w-screen h-screen mt-2">
                    <InstructorDashboard />
                    <form
                        className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black  ml-1 "
                    >
                        <div className="contentAddUser2 flex flex-col gap-10 overflow-auto ">
                            <Navbar cookies={cookies} />
                            <div className="flex justify-center flex-col items-center">
                                <Lottie animationData={notFound}
                                    style={{ height: '400px', width: '400px' }} />
                                <div className="font-semibold text-xl text-red-400 ">
                                    <span><TbFileAlert style={{ fontSize: 30, display: "inline", marginBottom: 8 }} /></span>
                                    There is not files yet
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className="flex flex-row w-screen h-screen mt-2">
                    <InstructorDashboard />
                    <form
                        className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black  ml-1 "
                    >
                        <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
                            <Navbar cookies={cookies} />
                            <div className="flex items-center justify-between">
                                {/*<p className="font-normal">Materials {'>'} View materials</p>*/}
                            </div>
                            <div className='fileView'>
                                <div className="fileView__row">
                                    {
                                        exam.slice(0, 5).map((e) => (
                                            <MaterialFileCard name={e.title} id={e.id} cookies={cookies} />
                                        ))

                                    }
                                </div>

                                <div className="fileView__titles">
                                    <div className="fileView__titles--left">
                                        <p>Name</p>
                                    </div>
                                    <div className="fileView__titles--right">
                                        {/*<p>Last modified</p>*/}
                                        <p>Description</p>
                                    </div>
                                </div>
                                {
                                    exam.map((e) => (

                                        <MaterialFileItem id={e.id} caption={e.description} title={e.title} cookies={cookies} />
                                    ))
                                }
                            </div>

                        </div>
                    </form>
                </div>
            </>
        );
    }
};

export default viewmaterials;
