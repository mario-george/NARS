import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import successFailMsg from "@/components/successFail/success-fail";
import { useSelector } from "react-redux";
import { read, utils } from "xlsx";


const addStudent = () => {
  const userState = useSelector((s) => s.user);
  // if (userState.role != "system admin" || userState.loggedInStatus != "true") {
  //   return <div className="error">404 could not found</div>;
  // }
  
  useEffect(() => {
    
  }, []);
  const [data, setData] = useState([]);
  const token = Cookies.get("token");
  const [codes, setCodes] = useState([]);
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
      let codes = sheetData.map(s => s.code)
      console.log("DATA IS " + JSON.stringify(sheetData), JSON.stringify(codes));
      setStudentData(sheetData);
      setCodes(codes)
    };
    reader.readAsArrayBuffer(f);
  }
  const submitStep = (e) => {
    handleFile(e);
  };
  
  const what = async() => {
    console.log(studentData, typeof(studentData))//, codes);
    const resp = await fetch(`${process.env.url}api/v1/users/addStudentsToProgram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userState.token,
      },
      body: JSON.stringify({
        program: "641c402494aa301ff9781823",
        codes : codes
      }),
    });
    const data = await resp.json();
    console.log(JSON.stringify(data));
  }
  //{"name":"jfdjdj","code":2324,"email":"jds@lxsdxksd.com","faculty":"ss","academicYear":1}

  return (
    <>
      <div className="flex flex-col ml-96 px-10 mt-28">
        <div className="items-center ml-10 mt-28">
          {/* <form> */}
            <input type='file' name='file' onChange={submitStep} />
            {/* <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Email</th>
                  <th>Academic Year</th>
                </tr>
              </thead>
            </table> */}
            <button onClick={what}>Add Student</button>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};
export default addStudent;
