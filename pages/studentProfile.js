import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Modal from "@/components/Modal";

const studentProfile = ({ cookies }) => {
    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
    });
    const globalState = useSelector((s) => s.user);
    if (globalState.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }

    const passowrdHandler = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const r = await fetch(
                `${process.env.url}api/v1/users/students/updatePassword/${globalState._id}`,
                {
                    method: "PATCH",

                    body: JSON.stringify({
                        passwordCurrent: oldPassowrd.current.value,
                        password: newPassowrd.current.value,
                        passwordConfirm: cnfrmPassowrd.current.value,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/form-data",
                        Authorization: "Bearer " + globalState.token,
                    },
                }
            );
            const resp = await r.json();
            console.log(resp);
            setErrormsg(resp.message);
            console.log(errorMsg);
            if (resp.status == "success") {
                setInvalidData(false);
            } else {
                setInvalidData(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const [errorMsg, setErrormsg] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const name = useRef();
    const oldPassowrd = useRef();
    const newPassowrd = useRef();
    const cnfrmPassowrd = useRef();
    const [msg, setMsg] = useState("");
    const closeMsg = () => {
        setMsg("");
    };


    let fail = (
        <div
            id="alert-border-2"
            class="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
            role="alert"
        >
            <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
            <div class="ml-3 text-sm font-medium">
                Failed to update your information
                <a href="#" class="font-semibold underline hover:no-underline"></a>.
            </div>
            <button
                type="button"
                onClick={closeMsg}
                class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-border-2"
                aria-label="Close"
            >
                <span class="sr-only">Dismiss</span>
                <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </button>
        </div>
    );

    let success = (
        <div
            id="alert-border-3"
            class="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
            role="alert"
        >
            <i class="fa-solid fa-circle-check"></i>
            <div class="ml-3 text-sm font-medium">
                Your information has been updated successfully
                <a href="#" class="font-semibold underline hover:no-underline"></a>
            </div>
            <button
                onClick={closeMsg}
                type="button"
                class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-border-3"
                aria-label="Close"
            >
                <span class="sr-only">Dismiss</span>
                <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </button>
        </div>
    );
    const [showModal, setShowModal] = useState(false);
    const [invalidData, setInvalidData] = useState(false);
    const myFileInput = useRef(null)
    const handelFile = () => {
        myFileInput.current.click();
    }
    const [img, setImg] = useState();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch(
                    `${process.env.url}api/v1/users/students/getPhoto/${globalState._id}`,
                    {
                        method: "GET",

                        headers: {
                            Accept: "application/form-data",
                            Authorization: "Bearer " + globalState.token,
                        },
                    }
                );

                console.log(res);
                const imageBlob = await res.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                console.log("photoooooooo22222222222", imageObjectURL);
                setImg(imageObjectURL);
            } catch (e) {
                console.log(e);
            }
        };
        fetchImage();
    }, []);
    var photo;
    return (
        <>
            <form
                className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
            >
                <div className="contentAddUser2 flex flex-col gap-10">
                    <div class="p-16">
                        <div class="p-8 bg-white shadow mt-16">
                            <div class="grid grid-cols-1 md:grid-cols-3">
                                <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">

                                </div>
                                <div class="relative">
                                    <input type="file" className="" id="myFileInput" ref={myFileInput}
                                        onChange={async (e) => {
                                            setSelectedFile(e.target.files[0])
                                            photo = e.target.files[0];
                                            const data = new FormData();
                                            data.append("photo", photo);
                                            try {
                                                const r = await fetch(
                                                    `${process.env.url}api/v1/users/students/updateMe/${globalState._id}`,
                                                    {
                                                        method: "PATCH",
                                                        body: data,
                                                        headers: {
                                                            Accept: "application/form-data",
                                                            Authorization: "Bearer " + globalState.token,
                                                        },
                                                    }
                                                );

                                                const resp = await r.json();
                                                console.log(resp);

                                                if (resp.status == "success") {
                                                    setMsg(success);
                                                    Cookies.set("name", name.current.value);
                                                    cookies.set("photo", selectedFile);
                                                } else {
                                                    setMsg(fail);
                                                }
                                            } catch (e) {
                                                console.log(e);
                                            }
                                        }} />
                                    <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                        <img src={img} className="w-48 h-48 rounded-full mx-auto shadow-2xl cursor-pointer" onClick={handelFile}></img>
                                    </div>
                                </div>

                                <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">

                                </div>
                            </div>

                            <div class="mt-32 text-center border-b pb-12">
                                <h1 class="text-4xl font-medium text-gray-700">{cookies.name} </h1>
                                <p class="mt-8 text-gray-500">{cookies.role} - {cookies.email}</p>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowModal(true);
                                    }}
                                    class="text-white mt-8 py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                >
                                    Password
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </form>

            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className="py-6 px-6 lg:px-8 text-left">
                    <h3 className="mb-4 text-xl font-medium text-gray-900">
                        Change your password
                    </h3>
                    <form className="space-y-6" onSubmit={passowrdHandler}>
                        <div>
                            <label
                                for="oldPassowrd"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Old password
                            </label>
                            <input
                                type={"password"}
                                name="oldPassowrd"
                                id="oldPassowrd"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                                required
                                ref={oldPassowrd}
                            />
                        </div>
                        <div>
                            <label
                                for="newPassowrd"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                New passowrd
                            </label>
                            <input
                                type="password"
                                name="newPassowrd"
                                id="newPassowrd"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                                            rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                                required
                                ref={newPassowrd}
                            />
                        </div>
                        <div>
                            <label
                                for="cnfrmPassowrd"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                New passowrd
                            </label>
                            <input
                                type="password"
                                name="cnfrmPassowrd"
                                id="cnfrmPassowrd"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                                required
                                ref={cnfrmPassowrd}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
              rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Update your password
                        </button>
                        {invalidData && (
                            <div className="text-red-500 flex justify-center">{errorMsg}</div>
                        )}
                    </form>
                </div>
            </Modal>
        </>
    );
};
export default studentProfile;
