import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useRef,useState,useEffect } from 'react';
import Cookies from "js-cookie";
import InstructorDashboard from '@/components/InstructorDashboard';
const addexam = ({ cookies }) => {

    const globalStateCookies = useSelector((s) => s.user.cookies);
    /*const router = useRouter();
    const { courseID } = router.query;
    const [id, setId] = useState("");*/
    console.log(cookies);
    if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
        if (
            globalStateCookies.role != "instructor" ||
            globalStateCookies.loggedInStatus != "true"
        ) {

            return <div className="error">404 could not found</div>;

        }
    }
    const name = useRef();
   /* useEffect(() => {
        get_id();
    }, []);
    const get_id = async (e) => {
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
            console.log(data.data.course);
            Cookies.set('original_id', id);
        } catch (e) {
            console.log(e);
        }
    };*/
    const submitHandler = async (e) => {
        e.preventDefault();
    };
    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2">
                <InstructorDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1">
                    <div className="contentAddUser2 flex flex-col gap-10">
                        <p className="underline mb-1">Profile details:</p>
                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div>Role</div>
                                <input
                                    type="text"
                                    className="inputAddUser2 w-full"
                                    value={cookies.role}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-5  w-2/5">
                                <div> Name</div>
                                <input
                                    type="text"
                                    className="inputAddUser2  w-full"
                                    defaultValue={cookies.name}
                                    ref={name}
                                />
                            </div>
                        </div>
                        <div className="flex gap-20 ">
                            <div className="flex flex-col gap-5 w-1/3">
                                <div>ID</div>
                                <input
                                    type="text"
                                    className="inputAddUser2 w-full"
                                    value={cookies._id}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-5  w-2/5">
                                <div> Email </div>
                                <input
                                    type="text"
                                    className="inputAddUser2  w-full"
                                    value={cookies.email}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Edit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default addexam;
