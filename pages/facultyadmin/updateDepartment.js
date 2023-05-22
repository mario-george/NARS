import Link from "next/link";
import { createRef } from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import Cookies from "js-cookie";
import Checkbox from "@/components/checkbox/checkbox";
import MassageAlert from "@/components/MassageAlert";

const updateDepartment = () => {
  const [inputs, setInputs] = useState([]);
  const [inputs2, setInputs2] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [oldHeaderRole, setOldHeaderRole] = useState([]);
  const [currentHeaderRole, setCurrentHeaderRole] = useState([]);
  const [oldHeaderID, setOldHeaderID] = useState(null);
  const [currentHeaderID, setCurrentHeaderID] = useState(null);

  const userState = useSelector((s) => s.user);
  
  const department = useRef();
  const token = userState.token;
  const name = useRef();
  const email = useRef();
  const about = useRef();
  const objectives = useRef();


  // useEffect(() => {
  //   document.querySelector("body").classList.add("scrollbar-none");
  // });
  useEffect(() => {
    async function doThis() {
      const resp = await fetch(`${process.env.url}api/v1/department/`, {
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
      console.log("rr", department.current.value);
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

      setOldHeaderID(data.data.departmentHead);

      try {
        const r1 = await fetch(`${process.env.url}api/v1/users/staff/${data.data.departmentHead}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
  
        const resp1 = await r1.json();
        console.log("r1", resp1);
        if (resp1.status !== "success") {
          setAlerts([...alerts, <MassageAlert 
            fail="Error with Old Department Header"
            status="fail"
            key={Math.random()} 
        />])
        }else{
          setCurrentHeaderID(resp1.data._id);
          setCurrentHeaderRole(resp1.data.roles);
          setOldHeaderRole(resp1.data.roles);
          email.current.value = resp1.data.email;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  // if (userState.role != "faculty admin" || userState.loggedInStatus != "true") {
  //   return <div className="error">404 could not found</div>;
  // }

  const emailCheck = async() => {
    if(email.current.value){try {
      let pattern = ''
      const r = await fetch(`${process.env.url}api/v1/users/staff?email=${email.current.value}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      

      const resp = await r.json();
      // console.log(resp);
      if (resp.status !== "success") {
        setAlerts([...alerts, <MassageAlert 
          fail="Email have Problem"
          status="fail"
          key={Math.random()} 
      />])
      }else{
        setCurrentHeaderID(resp.data[0]._id);
        setCurrentHeaderRole(resp.data[0].roles);
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

    try {
      const r = await fetch(
        `${process.env.url}api/v1/department/${department.current.value}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name: name.current.value,
            departmentHead: currentHeaderID,
            about: about.current.value,
            competences: competences,
            faculty: Cookies.get('faculty'),
            objectives: objectives.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const resp = await r.json();
      console.log(resp);
      if (resp.status == "success") {
        setAlerts([...alerts, <MassageAlert 
          success="Department updated Successfully"
          status="success"
          key={Math.random()} 
      />]);
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
    // update old header
    try {
      let oldRoles = []
      oldHeaderRole.forEach(r => {
        if(r !== 'department admin'){
          oldRoles.push(r);
        }
      });
      console.log('old roles', oldRoles, oldHeaderRole);
      const r1 = await fetch(`${process.env.url}api/v1/users/staff/${oldHeaderID}`, {
        method: "PATCH",

        body: JSON.stringify({
          "roles": oldRoles,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const resp1 = await r1.json();
      console.log("r1", resp1);
      if (resp1.status !== "success") {
        setAlerts([...alerts, <MassageAlert 
          fail="Error with Old Department Header"
          status="fail"
          key={Math.random()} 
      />])
      }
    } catch (e) {
      console.log(e);
    }
    // update Current Header Role
    try {
      const r2 = await fetch(`${process.env.url}api/v1/users/staff/${currentHeaderID}`, {
        method: "PATCH",

        body: JSON.stringify({
          "roles":[
            ...currentHeaderRole,
            "department admin"
          ],
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const resp2 = await r2.json();
      console.log("r2", resp2);
      if (resp1.status !== "success") {
        setAlerts([...alerts, <MassageAlert 
          fail="Error with Department Header Email"
          status="fail"
          key={Math.random()} 
      />])
      }
    } catch (e) {
      console.log(e);
    }
  };

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

  return (
    <>
      <div className="flex flex-row w-screen h-[100%] mt-2">
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-[100%] w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center 
          text-black ml-1 rounded-2xl"
          >
          <div className="contentAddUser2 flex flex-col gap-10 h-[100%]">
            <p className="font-normal">Faculty {">"} Update Department</p>
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
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Department Header:</div>
                <input
                  type="text"
                  name="year"
                  className="input-form  w-full"
                  ref={email}
                  onChange={emailCheck}
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
                />
              </div>
              <div className="flex flex-col gap-5 w-1/3">
                <div>Objectives:</div>
                <input
                  type="text"
                  name="about"
                  className="w-full input-form"
                  ref={objectives}
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
                          defaultValue={input.value ? input.value : ''}
                          ref={input.ref}
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
                            defaultValue={input2.value ? input2.value : ''}
                            ref={input2.ref}
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
export default updateDepartment;
