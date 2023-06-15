import { createRef } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import getStaffRolesAndEmail from "@/common/getStaffRolesAndEmail";

const viewDepartment = () => {
  const userState = useSelector((s) => s.user);
  if (userState.role != "faculty admin" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }

  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });

  const [inputs, setInputs] = useState([]);
  const [inputs2, setInputs2] = useState([]);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [alerts, setAlerts] = useState([]);
  
  //old
  const [oldHeaderID, setOldHeaderID] = useState(null);
  const [oldAdminID, setOldAdminID] = useState(null);

  
  const department = useRef();
  const token = userState.token;
  const name = useRef();
  const emailH = useRef();
  const emailA = useRef();
  const about = useRef();
  const objectives = useRef();


  useEffect(() => {
    async function doThis() {
      const resp = await fetch(`${process.env.url}api/v1/department/?faculty=${userState.faculty}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await resp.json();
      console.log(data);
      const newData = data.data.map((e) => {
        return { name: e.name, id: e._id };
      });
      setDepartmentArr(newData);
    }
    doThis();
  }, []);

  const getDepartmentData = async () => {
    if(department.current.value !== 'Choose a Department'){
      try{
        const resp = await fetch(`${process.env.url}api/v1/department/${department.current.value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await resp.json();
        console.log(data);
        name.current.value = data.data.name;
        about.current.value = data.data.about;
        objectives.current.value = data.data.objectives;
        let comps = data.data.competences;

        setInputs(comps.map(c => {
          let out = {
            ref: createRef(),
            value: c.code,
          };
          return out;
        }));
        setInputs2(comps.map(c => {
          let out = {
            ref: createRef(),
            value: c.description,
          };
          return out;
        }));

        // header
        setOldHeaderID(data.data.departmentHead);

        getStaffRolesAndEmail(
          data.data.departmentHead,
          'department head',
          [],
          emailH,
          setAlerts
        );

        // admin
        setOldAdminID(data.data.departmentAdmin);

        getStaffRolesAndEmail(
          data.data.departmentAdmin,
          'department admin',
          [],
          emailA,
          setAlerts
        );
      }catch(e){
        setAlerts(alerts => [...alerts, <MassageAlert 
          fail={`error happen with department`}
          status="fail"
          key={Math.random()} 
      />]);
      }
    }
  }


  return (
    <>
      <div className="flex flex-row w-screen h-[100%] mt-2">
        <form
          className="bg-sky-50 h-[100%] w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
          >
          <div className="contentAddUser2 flex flex-col h-[100%] gap-10">
            <p className="font-normal">Faculty {">"} View Department</p>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Department:</div>
                <select
                  onChange={getDepartmentData}
                  ref={department}
                  id="small"
                  class="block w-full text-xl md:text-lg p-3   text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                >
                  <option selected>Choose a Department</option>
                  {departmentArr.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}{" "}
                </select>
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Department Name:</div>
                <input
                  type="text"
                  name="name"
                  className="input-form w-full"
                  ref={name}
                  readOnly
                />
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5  w-2/5">
                <div> Department Header:</div>
                <input
                  type="text"
                  name="year"
                  className="input-form  w-full"
                  ref={emailH}
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div>Department Admin:</div>
                <input
                  type="email"
                  name="year"
                  className="input-form  w-full"
                  ref={emailA}
                  readOnly
                />
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>About:</div>
                <input
                  type="text"
                  name="about"
                  className="w-full input-form"
                  ref={about}
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-5 w-1/3">
                <div>Objectives:</div>
                <input
                  type="text"
                  name="about"
                  className="w-full input-form"
                  ref={objectives}
                  readOnly
                />
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col space-y-1 w-full">
                <p className=" mb-0 ">Competences:</p>

                <div className="grid grid-cols-2 ">
                  <div className="">
                    <div className="mb-5">
                      Code: &emsp; &emsp; &emsp; &emsp; &emsp;Description:
                    </div>
                    {inputs.map((input, index) => {
                      return (
                        <input
                          key={index}
                          type="text"
                          defaultValue={input.value ? input.value : ''}
                          ref={input.ref}
                          className="input-form w-1/6"
                          readOnly
                        />
                      );
                    })}
                  </div>
                  <div className="-space-x-96 ">
                    <div className="mb-10  inline-block"></div>
                    {inputs2.map((input2, index) => {
                      const input = inputs[index];
                      return (
                        <div className="relative">
                          <input
                            key={index}
                            type="text"
                            defaultValue={input2.value ? input2.value : ''}
                            ref={input2.ref}
                            className="input-form w-3/6"
                            readOnly
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-20 ">
              {<div className="w-1/2 mt-10">{alerts.map(s => s)}</div>}
            </div>

          </div>
        </form>
      </div>
    </>
  );
};
export default viewDepartment;