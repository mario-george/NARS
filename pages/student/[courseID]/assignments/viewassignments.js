import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import NavbarStudent from "@/components/NavbarStudent/Navbar";
import ExamFileItem from "@/components/filesView/AssignFileItem";
import ExamFileCard from "@/components/filesView/AssignFileCard";
import Lottie from "lottie-react";
import notFound from "./notFound.json";
import { TbFileAlert } from "react-icons/tb";

const viewassignments = ({ cookies }) => {
    if (cookies.role != "student" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
    });
    const [exam, setExam] = useState([]);
    const router = useRouter();
    const { courseID } = router.query;
    useEffect(() => {
        //get_id();
        submitHandler();
    }, []);

    const submitHandler = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const resp = await fetch(
                `${process.env.url}api/v1/courses/assignment?course=${courseID}`,
                {
                    headers: {
                        Authorization: "Bearer " + cookies.token,
                    },
                }
            );
            const data = await resp.json();
            console.log(data.data);
            let arr = data.data;

            arr = arr.map((e) => {
                return {
                    id: e._id,
                    name: e.name,
                    course: e.course,
                    possibleMarks:e.possibleMarks,
                    deuTO: e.deuTO.split(".")[0],
                };
            });
            setExam(arr);
            console.log("exam heree",arr);
        } catch (e) {
            console.log(e);
        }
    };

    if (exam.length === 0) {
        return (
            
                <div className="flex flex-row w-screen h-screen mt-2">
                    <form className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none ">
                        <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
                            <NavbarStudent cookies={cookies} />
                            <div className="flex justify-center flex-col items-center">
                                <Lottie
                                    animationData={notFound}
                                    style={{ height: "400px", width: "400px" }}
                                />
                                <div className="font-semibold text-xl text-red-400 ">
                                    <span>
                                        <TbFileAlert
                                            style={{
                                                fontSize: 30,
                                                display: "inline",
                                                marginBottom: 8,
                                            }}
                                        />
                                    </span>
                                    There are no files yet
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
        
        );
    } else {
        return (
            <>
                <div className="flex flex-row w-screen h-screen mt-2">
                    <form className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none ">
                        <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
                            <NavbarStudent cookies={cookies} />
                            <div className="flex items-center justify-between">
                                {/*<p className="font-normal">Assignments {'>'} View assignments</p>*/}
                            </div>
                            <div className="fileView">
                                {/*<div className="fileView__row">
                                    {exam.slice(0, 5).map((e) => (
                                        <ExamFileCard name={e.name} id={e.id} cookies={cookies} />
                                    ))}
                                    </div>*/}

                                <div className="fileView__titles">
                                    <div className="fileView__titles--left">
                                        <p>Name</p>
                                    </div>
                                    <div className="fileView__titles--right absolute right-96 ">
                                    {/*<p>Last modified</p>*/}
                                    <p>Possible marks</p>
                                </div>
                                    <div className="fileView__titles--right">
                                        {/*<p>Last modified</p>*/}
                                        <p>Due to</p>
                                    </div>
                                </div>
                                {exam.map((e) => (
                                    <ExamFileItem id={e.id} name={e.name} dueTo={e.deuTO} possibleMarks={e.possibleMarks} />
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
};

export default viewassignments;
