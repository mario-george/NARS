import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createRef, useRef, useState } from "react";
import Cookies from "js-cookie";
import InstructorDashboard from "@/components/InstructorDashboard";

const part69 = ({ cookies }) => {
    const outcomes = ['LO1', 'LO2', 'LO3', 'LO4', 'LO5', 'LO6']

    const numCols = outcomes.length
    const numRows = outcomes.length

    const checkboxRefs = useRef(
        Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => false))
    );

    const [tableData, setTableData] = useState(checkboxRefs.current);

    const handleCheckboxChange = (rowIndex, colIndex) => {
        checkboxRefs.current[rowIndex][colIndex] = !checkboxRefs.current[rowIndex][colIndex];
    };


    const handleSubmit = () => {
        setTableData([...checkboxRefs.current]);
        console.log(tableData)
    };
    if (cookies.role != "instructor" || cookies.loggedInStatus != "true") {
        return <div className="error">404 could not found</div>;
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        handleSubmit();
        window.location.href="/instructor/coursespecs/part6"
    };
    return (
        <>
            <div className="flex flex-row w-screen h-screen mt-2">
                <InstructorDashboard />
                <form
                    onSubmit={submitHandler}
                    className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1"
                >
                    <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Week</th>
                                    <th className="border px-4 py-2">Topics</th>
                                    <th className="border px-4 py-2">Planned <br /> Hours</th>
                                    {outcomes.map((e, i) => (
                                        <th key={i} className="border px-4 py-2">
                                            {e}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: numRows }).map((_, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="border px-4 py-2"> {[rowIndex + 1]}</td>
                                        <td className="border px-4 py-2 ">
                                            <input
                                                type="text"
                                                name="topic"
                                            />
                                        </td>
                                        <td className="border px-4 py-2 max-w-0">
                                            <input
                                                type="text"
                                                name="hours"
                                            />
                                        </td>
                                        {Array.from({ length: numCols }).map((_, colIndex) => (
                                            <td className="border px-4 py-2" key={colIndex}>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                                                        onChange={() => handleCheckboxChange(rowIndex, colIndex)}
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
                                onClick={handleSubmit}
                                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default part69;
