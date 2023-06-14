import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import MassageAlert from "@/components/MassageAlert";
import { useSelector } from "react-redux";
import { read, utils } from "xlsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const addStudent = () => {
  const userState = useSelector((s) => s.user);
  // if (userState.role != "program admin" || userState.loggedInStatus != "true") {
  //   return <div className="error">404 could not found</div>;
  // }
  
  useEffect(() => {
    
  }, []);
  const [data, setData] = useState([]);
  const token = Cookies.get("token");
  const [codes, setCodes] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [studentData, setStudentData] = useState([]);
  
  const handleFile = (event) => {
    const files = event.target.files;
    const f = files[0];
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const sheetData = utils.sheet_to_json(worksheet);
      let codes = sheetData.map(s => {
        if(s.code){
          return s.code
        }
      });
      console.log("DATA IS " + JSON.stringify(sheetData) + '\n' + JSON.stringify(codes));
      setStudentData(sheetData);
      if (codes.length){
        console.log('dd');
        setAlerts([...alerts, <MassageAlert 
          fail="Wrong Format"
          status="fail"
          key={Math.random()} 
      />])
      }
      setCodes(codes);
    };
    reader.readAsArrayBuffer(f);
  };

  const downloadTemplateHandler = () => {
    const header = [
      "Name",
    "Code",
    "Email",
    "Academic Year"
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([header]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const fileBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([fileBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, "assesmentTemplate.xlsx");
  };
  
  const submitHandler = async() => {
    const resp = await fetch(`${process.env.url}api/v1/users/addStudentsToProgram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userState.token,
      },
      body: JSON.stringify({
        program: Cookies.program,
        codes : codes
      }),
    });
    const data = await resp.json();
    console.log(data);
    if(data.status == 'success'){
      setAlerts([...alerts, <MassageAlert 
        success="Student added to Current Program successfully"
        status="success"
        key={Math.random()} 
    />])
    }else if(data.status == 'error'){
      setAlerts([...alerts, <MassageAlert 
        fail="Some Student Codes aren't Exist"
        status="fail"
        key={Math.random()} 
    />])
    }
    else if(data.status == 'fail'){
      setAlerts([...alerts, <MassageAlert 
        fail="Failed to add Student to Current Program"
        status="fail"
        key={Math.random()} 
    />])
    }
    console.log(alerts);
  };

  const createTable = (s) => {
    return s.map(s => {
      try {
        return (<tr>
          <td className="border-spacing-2 border-black border-2 px-6 py-4 first:text-sm first:text-gray-500">
            {s.Name}</td>
          <td className="border-spacing-2 border-black border-2 px-6 py-4 first:text-sm first:text-gray-500">
            {s.Code}</td>
          <td className="border-spacing-2 border-black border-2 px-6 py-4 first:text-sm first:text-gray-500">
            {s.Email}</td>
          <td className="border-spacing-2 border-black border-2 px-6 py-4 first:text-sm first:text-gray-500">
            {s["Academic Year"]}</td>
        </tr>)
      } catch (e) {
        return (<tr><td className="col-span-4">{e}</td></tr>)
      }
    })
    
  }
  //{"name":"jfdjdj","code":2324,"email":"jds@lxsdxksd.com","faculty":"ss","academicYear":1}

  return (
    <div className="z-30">
      <div className="flex flex-col ml-96 px-10">
        <div className="items-center flex flex-col gap-10 ml-10 mt-28">
          {/* <form> */}
            <div>
              <input type='file'
              className="text-sm text-grey-500
              file:mr-5 file:py-3 file:px-10
              file:rounded-full file:border-0
              file:text-sm file:font-medium
              file:bg-gray-200 file:text-gray-700
              hover:file:cursor-pointer hover:file:bg-sky-100
              hover:file:text-amber-700
              "
              name='file' onChange={handleFile} />
            </div>
            <div>
              <table className="mx-4 border-spacing-2 border-black border-2 rounded-lg text-center p-6 w-full h-full">
                <thead className="bg-sky-100">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Code</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Email</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Academic Year</th>
                  </tr>
                </thead>
                <tbody className="bg-sky-50">
                  {createTable(studentData).map(s => s)}
                </tbody>
              </table>
            </div>

            <div className="flex gap-20 ">
              {<div className="w-1/2 mt-10">{alerts.map(s => s)}</div>}
            </div>

            <div className="flex justify-end">
              <button onClick={submitHandler}
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                          font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 
                          dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Add Student
              </button>
            </div>

            <div className="flex justify-end">
              <button onClick={downloadTemplateHandler}
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                          font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 
                          dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Download Template
              </button>
            </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};
export default addStudent;
