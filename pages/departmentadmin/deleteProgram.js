import MassageAlert from "@/components/MassageAlert";
import { createRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import React from "react";
import deleteRole from "@/common/deleteRole";
import getStaffRolesAndEmail from "@/common/getStaffRolesAndEmail";

const deleteProgram = () => {
  const userState = useSelector((s) => s.user);
  if (userState.role != "department admin" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  const [inputs, setInputs] = useState([]);
  const [inputs2, setInputs2] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [programArr, setProgramArr] = useState([]);

  //old
  const [oldHeaderRole, setOldHeaderRole] = useState([]);
  const [oldHeaderID, setOldHeaderID] = useState(null);
  const [oldHeader1ID, setOldHeader1ID] = useState(null);
  const [oldHeader1Role, setOldHeader1Role] = useState([]);
  const [oldAdminRole, setOldAdminRole] = useState([]);
  const [oldAdminID, setOldAdminID] = useState(null);

  const token = userState.token;
  const name = useRef();
  const emailH = useRef();
  const emailA = useRef();
  const emailQ = useRef();
  const program = useRef();

  useEffect(() => {
    async function doThis() {
      const resp = await fetch(`${process.env.url}api/v1/programs/?faculty=${userState.department}`, {
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
      setProgramArr(newData);
    }
    doThis();
  }, []);

  const getProgramData = async () => {
    if(program.current.value !== 'Choose a Program'){
      try{
        const resp = await fetch(`${process.env.url}api/v1/programs/${program.current.value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await resp.json();
        console.log(data);
        name.current.value = data.data.name;
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
        setOldHeaderID(data.data.programCoordinator);

        getStaffRolesAndEmail(
          data.data.programCoordinator,
          'program coordinator',
          [setOldHeaderRole],
          emailH,
          setAlerts
        );

        // admin
        setOldAdminID(data.data.programAdmin);

        getStaffRolesAndEmail(
          data.data.programAdmin,
          'program admin',
          [setOldAdminRole],
          emailA,
          setAlerts
        );

        // quality
        setOldHeader1ID(data.data.qualityCoordinator);

        getStaffRolesAndEmail(
          data.data.qualityCoordinator,
          'quality coordinator',
          [setOldHeader1Role],
          emailQ,
          setAlerts
        );
    }catch(e){
        setAlerts(alerts => [...alerts, <MassageAlert 
          fail={`error happen with program`}
          status="fail"
          key={Math.random()} 
      />]);
    }

    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const r = await fetch(`${process.env.url}api/v1/programs/${program.current.value}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

    } catch (e) {
      console.log(e);
    }

    // admin
    await deleteRole(
      "program admin",
      oldAdminRole,
      oldAdminID,
      setAlerts
    );

    // header
    await deleteRole(
      "program coordinator",
      oldHeaderRole,
      oldHeaderID,
      setAlerts
    );

    //quality
    await deleteRole(
      "quality coordinator",
      oldHeader1Role,
      oldHeader1ID,
      setAlerts
    );
  };

  return (
    <>
      <div className="flex flex-row w-screen h-[100%] mt-2 scrollbar-none">
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-[100%] w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
          >
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto h-[100%] scrollbar-none">
            <p className="font-normal">Department {">"} Delete Program</p>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Department:</div>
                <select
                  onChange={getProgramData}
                  ref={program}
                  id="small"
                  class="block w-full text-xl md:text-lg p-3   text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                >
                  <option selected>Choose a Program</option>
                  {programArr.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                  })}{" "}
                </select>
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Program Name:</div>
                <input
                  type="text"
                  name="name"
                  className="input-form w-full"
                  ref={name}
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div>Program Coordinator:</div>
                <input
                  type="email"
                  name="year"
                  className="input-form  w-full"
                  ref={emailH}
                  readOnly
                  fPar="h"
                />
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5  w-2/5">
                <div>Quality Coordinator:</div>
                <input
                  type="email"
                  name="year"
                  className="input-form  w-full"
                  ref={emailQ}
                  readOnly
                  fPar="q"
                />
              </div>

              <div className="flex flex-col gap-5  w-2/5">
                <div>Program Admin:</div>
                <input
                  type="email"
                  name="year"
                  className="input-form  w-full"
                  ref={emailA}
                  readOnly
                  fPar="a"
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
                          ref={input.ref}
                          defaultValue={input.value ? input.value : ''}
                          readOnly
                          className="input-form w-1/6"
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
                            ref={input2.ref}
                            defaultValue={input2.value ? input2.value : ''}
                            readOnly
                            className="input-form w-3/6"
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

            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default deleteProgram;
