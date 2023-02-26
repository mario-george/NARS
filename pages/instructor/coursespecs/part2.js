import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Cookies from "js-cookie";
import InstructorDashboard from '@/components/InstructorDashboard';

const part2 = ({ cookies }) => {
    /* if (cookies.role != 'instructor' || cookies.loggedInStatus != 'true') {
 
         return <div className='error'>404 could not found</div>
     }*/

    const token = Cookies.get("token");
    const courseAims = useRef()
    const courseContent = useRef()
    const lvla = useRef()
    const lvlb = useRef()

    const submitHandler = async (e) => {
        e.preventDefault();
        const r = await fetch(
            "http://localhost:80/api/v1/courses/created-courses/63f773d83a9367d385403c1c",
            {
                method: "PATCH",
                body: JSON.stringify({
                    "courseSpecs": {
                        "courseAims": courseAims.current.value,
                        "courseContent": courseContent.current.value,
                        "levelA": lvla.current.value,
                        "levelB": lvlb.current.value,
                    }
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        //Cookies.set('courseAims',courseAims.current.value)
        const resp = await r.json();
        console.log(resp);
        window.location.href = '/instructor/coursespecs/part3';
    }

    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2">
                <InstructorDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1">
                    <div className="contentAddUser2 flex flex-col gap-10">

                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-full">
                                <div>-Course Aims:</div>
                                <textarea
                                    rows="6"
                                    name='aims'
                                    className="w-full input-form"
                                    //defaultValue={cookies.courseAims}
                                    ref={courseAims}
                                    placeholder="Type here the Course Aims"></textarea>
                            </div>
                            <div className="flex flex-col gap-5  w-full">
                                <div> -Course Contents(As indicated in the program):</div>
                                <textarea
                                    ref={courseContent}

                                    rows="6"
                                    name='contents'
                                    className="w-full input-form"
                                    placeholder="Type here the Course Contents"></textarea>
                            </div>
                        </div>


                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-full">
                                <div>-Level (A) Competencies:</div>
                                <textarea
                                    ref={lvla}

                                    rows="6"
                                    name='lvla'
                                    className="w-full input-form pl-1"
                                    placeholder="Level (A) Competencies"></textarea>
                            </div>
                            <div className="flex flex-col gap-5  w-full">
                                <div> -Level (B) Competencies: </div>
                                <textarea
                                    ref={lvlb}

                                    rows="6"
                                    name='lvlb'
                                    className="w-full input-form pl-1"
                                    placeholder="Level (B) Competencies"></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Next
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
};
export default part2;
