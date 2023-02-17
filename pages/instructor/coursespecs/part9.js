import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Cookies from "js-cookie";
import InstructorDashboard from '@/components/InstructorDashboard';

const part2 = ({ cookies }) => {
    if (cookies.role != 'instructor' || cookies.loggedInStatus != 'true') {

        return <div className='error'>404 could not found</div>
    }

    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();
        /*const r = await fetch(
            "url",
            {
                method: "",

                body: JSON.stringify({
                     : notes.current.value,
                     : books.current.value,
                     : Rbooks.current.value,
                     : websites.current.value,
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
window.location.href='/instructor/coursespecs/part1';
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
                                <div>-Course Notes:</div>
                                <textarea
                                    rows="6"
                                    name='notes'
                                    className="w-full input-form"
                                    placeholder="Type here the Course Notes"></textarea>
                            </div>
                            <div className="flex flex-col gap-5  w-full">
                                <div> -Books:</div>
                                <textarea
                                    rows="6"
                                    name='books'
                                    className="w-full input-form"
                                    placeholder="Type here the books"></textarea>
                            </div>
                        </div>


                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-full">
                                <div>-Recommended Books:</div>
                                <textarea
                                    rows="6"
                                    name='Rbooks'
                                    className="w-full input-form pl-1"
                                    placeholder="Type here the Recommended Books"></textarea>
                            </div>
                            <div className="flex flex-col gap-5  w-full">
                                <div> -Course websites: </div>
                                <textarea
                                    rows="6"
                                    name='websites'
                                    className="w-full input-form pl-1"
                                    placeholder="Type here the Course websites"></textarea>
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
