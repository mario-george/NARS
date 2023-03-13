import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import FacultyList from "@/components/user/FacultyList";
import FacultyadminDashboard from "@/components/FacultyadminDashboard";

const viewfaculty = ({ cookies }) => {
   /* if (cookies.role != "system admin" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }*/
    

    console.log(cookies.token);
    const router = useRouter();
    const [faculty, setFaculty] = useState([]);
    useEffect(() => {
        submitHandler();
    }, []);
    const submitHandler = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const resp = await fetch(`${process.env.url}api/v1/faculty/`, {
                headers: {
                    Authorization: "Bearer " + cookies.token,
                },
            });
            const data = await resp.json();
            console.log(data.data);
            let arr = data.data;

            arr = arr.map((e) => {
                return { name: e.name, id: e._id, academicYears: e.academicYears, dean: e.dean, about: e.about,competences:e.competences };
            });
            setFaculty(arr);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2">
                <FacultyadminDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black  ml-1 "
                >
                    <div className="contentAddUser2 overflow-auto flex flex-col gap-10">
                        <div className="flex items-center justify-between">
                            <p className="font-normal">Faculty {'>'} View Faculties</p>
                        </div>

                        <FacultyList faculties={faculty} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default viewfaculty;
