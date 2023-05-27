import { useEffect, useRef, useState } from "react";
import NavbarStudent from "@/components/NavbarStudent/Navbar";
import GradeFileItem from "@/components/filesView/GradeFileItem";


const courseGrade = ({ cookies }) => {
    if (cookies.role != "student" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
    });
    const [name,setName]=useState("");
    const [grade,setGrade]=useState("");
    const [fullMark,setFullMark]=useState("");
    useEffect(() => {
        getData();
        getMark();
    }, []);

    const getData = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const resp = await fetch(
                `${process.env.url}api/v1/courses/created-courses/${cookies.instance_id}`,
                {
                    headers: {
                        Authorization: "Bearer " + cookies.token,
                    },
                }
            );
            const data = await resp.json();
            setName(data.data.course.name) ;
            setFullMark(data.data.course.fullMark);

        } catch (e) {
            console.log(e);
        }
    };
    const getMark = async (e) => {
        if (e) e.preventDefault();
        try {
            const resp = await fetch(
                `${process.env.url}api/v1/courses/${cookies.instance_id}/marks/${cookies._id}`,
                {
                    headers: {
                        Authorization: "Bearer " + cookies.token,
                    },
                }
            );
            const data = await resp.json();
            setGrade(data.data);
        } catch (e) { console.log(e); }
    }
    return (

        <div className="flex flex-row w-screen h-screen mt-2 scrollbar-none">
            <form className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none ">
                <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
                    <NavbarStudent cookies={cookies} />
                    <div className="flex items-center justify-between scrollbar-none">
                    </div>
                    <div className="fileView">


                        <div className="fileView__titles">
                            <div className="fileView__titles--left">
                                <p>Course name</p>
                            </div>
                            <div className="fileView__titles--right">
                                <p>Final grade</p>
                            </div>
                        </div>
                        <GradeFileItem name={name} fullMark={fullMark} grade={grade}/>
                    </div>
                </div>
            </form>
        </div>

    );
};

export default courseGrade;
