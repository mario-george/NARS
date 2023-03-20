import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import QualityCoordinatorDashboard from "@/components/QualityCoordinatorDashboard";
import { constants } from "buffer";


const coursecomp = ({ cookies }) => {
    if (cookies.role != "quality coordinator" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    useEffect(() => { document.querySelector("body").classList.add("scrollbar-none") });
    const [courses, setCourses] = useState([]);
    const [comp, setComp] = useState([]);
    const numRows = courses.length;
    const numCols = comp.length;


    useEffect(() => {
        const get_courses = async (e) => {
            if (e) {
                e.preventDefault();
            }
            try {
                const resp = await fetch(`${process.env.url}api/v1/courses/original-courses?program=${cookies.program}`, {
                    headers: {
                        Authorization: "Bearer " + cookies.token,
                    },
                });
                const data = await resp.json();
                let arr = data.data;
                arr = arr.map((e) => {
                    return { id: e._id, name: e.name, code: e.code, competences: e.competences };
                });
                setCourses(arr);
            } catch (e) {
                console.log(e);
            }
        };

        const get_comp = async (e) => {
            if (e) {
                e.preventDefault();
            }
            try {
                const resp2 = await fetch(`${process.env.url}api/v1/programs/${cookies.program}`, {
                    headers: {
                        Authorization: "Bearer " + cookies.token,
                    },
                });
                const data2 = await resp2.json();
                let arr2 = data2.data.competences;
                setComp(arr2);

            } catch (e) {
                console.log(e);
            }

        };
        get_comp();
        get_courses();
    }, []);

    const checkboxRefs = useRef([[]]);

    checkboxRefs.current = Array.from(
        { length: courses.length },
        () => Array.from({ length: comp.length }, () => false)
    );

    //to check the boxes for the given competences of courses 
    courses.map((course, i) => {
        let comps = course.competences;
        checkboxRefs.current[i].forEach((isChecked, index) => {
            comps.map((e)=>{if(e.code===comp[index].code){checkboxRefs.current[i][index]=true}});
        });
    })

    const handleCheckboxChange = (rowIndex, colIndex, value) => {
        checkboxRefs.current[rowIndex][colIndex] = value;
    };

    const handleSubmit = async () => {
        courses.map((course, index) => {
            const comps = [];
            checkboxRefs.current[index].forEach((isChecked, index) => {
                if (isChecked) {
                    comps.push(comp[index].code);
                }
            });
            console.log(course.name);
            console.log(comps);
            //course.competences = comps;
            return course;
        })

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2">
                <QualityCoordinatorDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black  ml-1 "
                >
                    <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
                        <label class="label-form md:text-2xl text-center">
                            Matrix of Program's Courses Vs Program's Competences
                        </label>
                        <table className="table-auto mt-8">
                            <thead>
                                <tr>
                                    <th className="border-2 px-4 py-2">Course code</th>
                                    <th className="border-2 px-4 py-2">Course name</th>
                                    {comp.map((e, i) => (
                                        <th key={i} className="border-2 px-4 py-2" title={e.description}>
                                            {e.code}
                                        </th>
                                    ))}
                                    <th className="border-0 px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((e, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="border-2 px-4 py-2">
                                            {e.code}
                                        </td>
                                        <td className="border-2 px-4 py-2">
                                            {e.name}
                                        </td>
                                        {Array.from({ length: comp.length }).map(
                                            (_, colIndex) => (
                                                <td className="border-2 px-4 py-2" key={colIndex}>
                                                    <label className="inline-flex items-center justify-center" key={colIndex}>
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox cursor-pointer"
                                                            onChange={(e) =>
                                                                handleCheckboxChange(rowIndex, colIndex, e.target.checked)
                                                            }
                                                            defaultChecked={checkboxRefs.current[rowIndex][colIndex]}
                                                        />
                                                    </label>
                                                </td>
                                            ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );

};

export default coursecomp;
