import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import InstructorDashboard from "@/components/InstructorDashboard";
import Navbar from "@/components/Navbar/Navbar"
import ExamFileItem from '@/components/filesView/AssignFileItem'
import ExamFileCard from '@/components/filesView/AssignFileCard'

const viewassignments = ({ cookies }) => {
    if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    useEffect(() => { document.querySelector("body").classList.add("scrollbar-none") });
    const router = useRouter();
    const { courseID } = router.query;
    const [exam, setExam] = useState([]);
    // const cookies = useSelector((s) => s.user.cookies);
    console.log(cookies.token);
    useEffect(() => {
        //get_id();
        submitHandler();
    }, []);
    /*const get_id = async (e) => {
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
    };*/
    const submitHandler = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const resp = await fetch(`${process.env.url}api/v1/courses/assignment?course=${courseID}`, {
                headers: {
                    Authorization: "Bearer " + cookies.token,
                },
            });
            const data = await resp.json();
            //console.log(data.data.length);
            let arr = data.data;

            arr = arr.map((e) => {
                return { id: e._id, name: e.name, course: e.course, deuTO: e.deuTO.split("T")[0] };
            });
            setExam(arr);
            console.log(exam.length)
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
                        onSubmit={submitHandler}
                        className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black  ml-1 "
                    >
                        <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
                            <Navbar cookies={cookies} />
                            <div>notthing</div>

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
                        onSubmit={submitHandler}
                        className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black  ml-1 "
                    >
                        <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
                            <Navbar cookies={cookies} />
                            <div className="flex items-center justify-between">
                                {/*<p className="font-normal">Assignments {'>'} View assignments</p>*/}
                            </div>
                            <div className='fileView'>
                                <div className="fileView__row">
                                    {
                                        exam.slice(0, 5).map((e) => (
                                            <ExamFileCard name={e.name} id={e.id} cookies={cookies} />
                                        ))

                                    }
                                </div>

                                <div className="fileView__titles">
                                    <div className="fileView__titles--left">
                                        <p>Name</p>
                                    </div>
                                    <div className="fileView__titles--right">
                                        {/*<p>Last modified</p>*/}
                                        <p>Due to</p>
                                    </div>
                                </div>
                                {
                                    exam.map((e) => (

                                        <ExamFileItem id={e.id} name={e.name} dueTo={e.deuTO} />
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

export default viewassignments;
