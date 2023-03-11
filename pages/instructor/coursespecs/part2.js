import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Cookies from "js-cookie";
import InstructorDashboard from '@/components/InstructorDashboard';

const part2 = ({ cookies }) => {
    const courseAims=useRef()
    const courseContent=useRef()
    const lvla=useRef()
    const lvlb=useRef()
    if (cookies.role != 'instructor' || cookies.loggedInStatus != 'true') {

        return <div className='error'>404 could not found</div>
    }

    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();
        Cookies.set('courseContent',courseContent.current.ref)
        Cookies.set('courseAims',courseAims.current.ref)
        Cookies.set('lvlb',lvlb.current.ref)
        Cookies.set('lvla',lvla.current.ref)
        /*const r = await fetch(
            "url",
            {
                method: "",

                body: JSON.stringify({
                     : aims.current.value,
                     : contents.current.value,
                     : lvla.current.value,
                     : lvlb.current.value,
                 }),
headers: { "Content-Type": "application/json" },
             }
         );

const resp = await r.json();
console.log(resp);
Cookies.set("data", resp.data);
Cookies.set("", resp.data.);
Cookies.set("", resp.data.);
Cookies.set("", resp.data.);
Cookies.set("", resp.data.);*/
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
                                    ref={courseAims}
                                    placeholder="Type here the Course Aims"></textarea>
                            </div>
                            <div className="flex flex-col gap-5  w-full">
                                <div> -Course Contents(As indicated in the program Bylaw):</div>
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
                                <div>-Level (A) Engineering Competencies:</div>
                                <textarea
                                    ref={lvla}

                                    rows="6"
                                    name='lvla'
                                    className="w-full input-form pl-1"
                                    placeholder="Level (A) Engineering Competencies"></textarea>
                            </div>
                            <div className="flex flex-col gap-5  w-full">
                                <div> -Level (B) Electrical Engineering Competencies: </div>
                                <textarea
                                    ref={lvlb}

                                    rows="6"
                                    name='lvlb'
                                    className="w-full input-form pl-1"
                                    placeholder="Level (B) Electrical Engineering Competencies"></textarea>
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