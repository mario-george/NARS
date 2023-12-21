import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import SolutionFileItem from "@/components/filesView/SolutionFileItem";

import { TbFileAlert } from "react-icons/tb";

const viwesolution = ({ cookies }) => {
    const [Lottie, setLottie] = useState(null);
const [notFound, setNotFound] = useState(null);
useEffect(() => {
  import("lottie-react").then((module) => {
    setLottie(module.default);
  });

  import("./notFound.json").then((module) => {
    setNotFound(module.default);
  });

  // Your logic for setting sections...
}, [
  isInDirectAssessmentComplete,
  isDirectAssessmentComplete,
  isCourseSpecsComplete,
  doesCourseHaveCompetences,
  doesCourseHaveTarget,
]);

if (!Lottie || !notFound) {
  return <div>Not found</div>; // or a loading indicator while waiting for the dynamic imports

}
    if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }
    useEffect(() => {
        document.querySelector("body").classList.add("scrollbar-none");
    });
    const router = useRouter();
    const [solution, setSolution] = useState([]);
    const {assignmentID,possibleMarks} = router.query;
    console.log("id hereeeeeeee",assignmentID);
    // const cookies = useSelector((s) => s.cookies);
    console.log(cookies.token);
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
                `${process.env.url}api/v1/courses/assignmentSolution?Assignment=${assignmentID}`,
                {
                    headers: {
                        Authorization: "Bearer " + cookies.token,
                    },
                }
            );
            const data = await resp.json();
            // console.log("dataaaaaaa",data);
            let arr = data.data;

            arr = arr.map((e) => {
                return {
                    id: e._id,
                    name: e.name,
                    Assignment: e.Assignment,
                    Mark: e.Mark
                };
            });
            setSolution(arr);

        } catch (e) {
            console.log(e);
        }
    };
    console.log(solution);
    if (solution.length === 0) {
        return (

            <div className="flex flex-row w-screen h-screen mt-2 scrollbar-none">
                <form className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none ">
                    <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
                        <Navbar cookies={cookies} />
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

            <div className="flex flex-row w-screen h-screen mt-2 scrollbar-none">
                <form className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none ">
                    <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
                        <Navbar cookies={cookies} />
                        <div className="flex items-center justify-between scrollbar-none">
                            {/*<p className="font-normal">Assignments {'>'} View assignments</p>*/}
                        </div>
                        <div className="fileView">


                            <div className="fileView__titles">
                                <div className="fileView__titles--left">
                                    <p>Name</p>
                                </div>
                                <div className="fileView__titles--right">
                                    {/*<p>Last modified</p>*/}
                                    <p>Grade</p>
                                </div>
                            </div>
                            {solution.map((e) => (
                                <SolutionFileItem id={e.id} name={e.name} possibleMarks={possibleMarks} cookies={cookies} Mark={e.Mark}  />
                            ))}
                        </div>
                    </div>
                </form>
            </div>

        );
    }
};

export default viwesolution;
