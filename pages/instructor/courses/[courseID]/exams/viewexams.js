import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import InstructorDashboard from "@/components/InstructorDashboard";
import { title } from "process";
import ExamFileItem from '@/components/filesView/ExamFileItem'
import ExamFileCard from '@/components/filesView/ExamFileCard'

const viewexams = ({ cookies }) => {
    if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    const [exam, setExam] = useState([]);
    // const cookies = useSelector((s) => s.user.cookies);
    console.log(cookies.token);
    useEffect(() => {
        submitHandler();
    }, []);
    const submitHandler = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const resp = await fetch(`${process.env.url}api/v1/courses/exams?course=${cookies.original_id}`, {
                headers: {
                    Authorization: "Bearer " + cookies.token,
                },
            });
            const data = await resp.json();
            console.log(data.data);
            let arr = data.data;

            arr = arr.map((e) => {
                return { id: e._id, title: e.title, path: e.path, course: e.course, description: e.description, date: e.date };
            });
            setExam(arr);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2">
                <InstructorDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black  ml-1 "
                >
                    <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
                        <div className="flex items-center justify-between">
                            <p className="font-normal">Exams {'>'} View Exams</p>
                        </div>
                        <div className='fileView'>
                            <div className="fileView__row">
                                {
                                    exam.slice(0, 5).map((e) => (
                                        <ExamFileCard name={e.title} id={e.id} cookies={cookies} />
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

                                    <ExamFileItem id={e.id} caption={e.description} title={e.title} />
                                ))
                            }
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
};

export default viewexams;
