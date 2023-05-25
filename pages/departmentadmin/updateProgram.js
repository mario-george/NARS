import MassageAlert from "@/components/MassageAlert";
import { createRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import React from "react";
import addRole from "@/common/addRole";
import deleteRole from "@/common/deleteRole";
import getStaffRolesAndEmail from "@/common/getStaffRolesAndEmail";

const updateProgram = () => {
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
  
  //current
  const [currentHeaderRole, setCurrentHeaderRole] = useState([]);
  const [currentHeaderID, setCurrentHeaderID] = useState(null);
  const [currentHeader1ID, setCurrentHeader1ID] = useState(null);
  const [currentHeader1Role, setCurrentHeader1Role] = useState([]);
  const [currentAdminRole, setCurrentAdminRole] = useState([]);
  const [currentAdminID, setCurrentAdminID] = useState(null);

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
        setCurrentHeaderID(data.data.programCoordinator);

        getStaffRolesAndEmail(
          data.data.programCoordinator,
          'program coordinator',
          [setOldHeaderRole,
          setCurrentHeaderRole],
          emailH,
          setAlerts
        );

        // admin
        setOldAdminID(data.data.programAdmin);
        setCurrentAdminID(data.data.programAdmin);

        getStaffRolesAndEmail(
          data.data.programAdmin,
          'program admin',
          [setOldAdminRole,
          setCurrentAdminRole],
          emailA,
          setAlerts
        )

        // quality
        setOldHeader1ID(data.data.qualityCoordinator);
        setCurrentHeader1ID(data.data.qualityCoordinator);

        getStaffRolesAndEmail(
          data.data.qualityCoordinator,
          'quality coordinator',
          [setOldHeader1Role,
          setCurrentHeader1Role],
          emailQ,
          setAlerts
        );
    }catch(e){
      setAlerts(alerts => [...alerts, <MassageAlert 
        fail={`error happen with program`}
        status="fail"
        key={Math.random()} 
    />])
    }

    }
  }

  const handleAddInput = (e) => {
    e.preventDefault();

    setInputs([
      ...inputs,
      {
        ref: createRef(),
      },
    ]);

    setInputs2([
      ...inputs2,
      {
        ref: createRef(),
      },
    ]);
  };
  const removeLO1 = (e, input2, input) => {
    e.preventDefault();
    setInputs2(
      inputs2.filter((e) => {
        return e != input2;
      })
    );
    setInputs(
      inputs.filter((e) => {
        return e != input;
      })
    );
  };


  const emailCheck = async(e) => {
    if(e.target.value){try {
      const r = await fetch(`${process.env.url}api/v1/users/staff?email=${e.target.value}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      

      const resp = await r.json();
      console.log(resp);
      if (resp.status !== "success" || !resp.data.length) {
        setAlerts([...alerts, <MassageAlert 
          fail="Email have Problem"
          status="fail"
          key={Math.random()} 
      />])
      }else if (resp.data[0].department !== userState.department) {
        console.log(userState.department)
        setAlerts([...alerts, <MassageAlert 
          fail="Not in This Department"
          status="fail"
          key={Math.random()} 
      />])
      }else{
        switch(e.target.attributes.fPar.nodeValue){
          case 'h':
            setCurrentHeaderID(resp.data[0]._id);
            setCurrentHeaderRole(resp.data[0].roles);
            break;
          case 'q':
            setCurrentHeader1ID(resp.data[0]._id);
            setCurrentHeader1Role(resp.data[0].roles);
            break;
          case 'a':
            setCurrentAdminID(resp.data[0]._id);
            setCurrentAdminRole(resp.data[0].roles);
            break;
        }
      }
    } catch (e) {
      console.log(e);
    }}
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const arr1 = inputs.map((input1) => {
      return {
        code: input1.ref.current.value,
      };
    });
    const arr2 = inputs2.map((input2) => {
      return {
        value: input2.ref.current.value,
      };
    });
    const competences = arr1.map((a, index) => {
      const b = arr2[index];
      return {
        code: a.code,
        description: b.value,
      };
    });

    let setStaffProgram = {'program': null};

    try {
      const r = await fetch(`${process.env.url}api/v1/programs/${program.current.value}`, {
        method: "PATCH",

        body: JSON.stringify({
          name: name.current.value,
          competences: competences,
          department: userState.department,
          qualityCoordinator: currentHeader1ID,
          programCoordinator: currentHeaderID,
          programAdmin: currentAdminID,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const resp = await r.json();
      console.log(resp);

      if (resp.status == "success") {
        setAlerts([...alerts, <MassageAlert 
          success="Program updated Successfully"
          status="success"
          key={Math.random()} 
      />]);
        setStaffProgram['program'] = resp.data._id;
      } else {
        setAlerts([...alerts, <MassageAlert 
          fail="Problem Happened with Data"
          status="fail"
          key={Math.random()} 
      />]);
      }
    } catch (e) {
      console.log(e);
    }

    // admin
      // old
    await deleteRole(
      "program admin",
      oldAdminRole,
      oldAdminID,
      setAlerts
    )
      // current
    await addRole(
      "program admin",
      currentAdminRole,
      currentAdminID,
      setAlerts,
      setStaffProgram
    )

    // header
      // old
    await deleteRole(
      "program coordinator",
      oldHeaderRole,
      oldHeaderID,
      setAlerts
    )
      // current
    await addRole(
      "program coordinator",
      currentHeaderRole,
      currentHeaderID,
      setAlerts,
      setStaffProgram
    )

    //quality
      // old
    await deleteRole(
      "quality coordinator",
      oldHeader1Role,
      oldHeader1ID,
      setAlerts
    )
      // current
    await addRole(
      "quality coordinator",
      currentHeader1Role,
      currentHeader1ID,
      setAlerts,
      setStaffProgram
    )
  };

  return (
    <>
      <div className="flex flex-row w-screen h-[100%] mt-2 scrollbar-none">
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-[100%] w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
          >
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto h-[100%] scrollbar-none">
            <p className="font-normal">Department {">"} Update Program</p>

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
                  onChange={emailCheck}
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
                  onChange={emailCheck}
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
                  onChange={emailCheck}
                  fPar="a"
                />
              </div>
            </div>

            

            <div className="flex gap-20 ">
              <div className="flex flex-col space-y-1 w-full">
                <p className=" mb-0 ">Competences:</p>
                <div class="flex items-center justify-end mr-6 text-lg text-gray-700 capitalize ">
                  <button
                    onClick={handleAddInput}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                </div>

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
                            className="input-form w-3/6"
                          />
                          <button
                            type="button"
                            onClick={(e) => removeLO1(e, input2, input)}
                            className="ml-100 absolute bottom-2 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                            data-dismiss-target="#alert-border-2 "
                            aria-label="Close"
                          >
                            <span className="sr-only ">Dismiss</span>
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default updateProgram;
