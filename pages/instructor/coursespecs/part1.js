import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Cookies from "js-cookie";
import InstructorDashboard from '@/components/InstructorDashboard';

const part1 = ({ cookies }) => {
    if (cookies.role != 'instructor' || cookies.loggedInStatus != 'true') {

        return <div className='error'>404 could not found</div>
    }

    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        router.push('/instructor/coursespecs/part2');
    }

    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2">
                <InstructorDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1">
                    <div className="contentAddUser2 flex flex-col gap-10">
                        <p className="underline mb-1">-Course Data:</p>
                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div>Course Code & Title:</div>
                                <input
                                    type="text"
                                    className="input-form w-full"
                                />
                            </div>
                            <div className="flex flex-col gap-5  w-2/5">
                                <div> Semester/Year:</div>
                                <input
                                    type="text"
                                    className="input-form  w-full"

                                />
                            </div>
                        </div>

                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div>Specialization:</div>
                                <input
                                    type="text"
                                    className="input-form w-full"


                                />
                            </div>
                            <div className="flex flex-col gap-5  w-2/5">
                                <div> Contact Hours: </div>
                                <input
                                    type="text"
                                    className="input-form  w-full"
                                />
                            </div>
                        </div>

                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div>Lecture:</div>
                                <input
                                    type="text"
                                    className="input-form w-full"
                                />
                            </div>
                            <div className="flex flex-col gap-5  w-2/5">
                                <div> Practical/Practice: </div>
                                <input
                                    type="text"
                                    className="input-form  w-full"
                                />
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
export default part1;
