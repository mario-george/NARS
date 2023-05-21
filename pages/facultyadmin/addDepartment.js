import MassageAlert from "@/components/MassageAlert";
import { createRef } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import React from "react";
const addDepartment = () => {
  const userState = useSelector((s) => s.user);
  // Cookies.set('faculty', '641c3dfc8ba1dcd2d20388d9')
  // if (userState.role != "faculty admin" || userState.loggedInStatus != "true") {
  //   return <div className="error">404 could not found</div>;
  // }
  
  useEffect(() => {
    document.querySelector("body").classList.add("scrollbar-none");
  });
  const [inputs, setInputs] = useState([]);
  const [inputs2, setInputs2] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [headersRole, setHeaderRole] = useState([]);
  const [headerID, setHeaderID] = useState(null);

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

  const token = userState.token;
  const name = useRef();
  const email = useRef();
  const about = useRef();
  const objectives = useRef();

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
        setHeaderID(resp.data[0]._id);
        setHeaderRole(resp.data[0].roles);
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
      const r = await fetch(`${process.env.url}api/v1/department/`, {
        method: "POST",

        body: JSON.stringify({
          name: name.current.value,
          departmentHead: headerID,
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
      });

      const resp = await r.json();
      console.log(resp);
      console.log(selectedItems);
      //console.log(arr1);
      //console.log(arr2);
      if (resp.status == "success") {
        setAlerts([...alerts, <MassageAlert 
          success="Department added Successfully"
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


    try {
      const r1 = await fetch(`${process.env.url}api/v1/users/staff/${headerID}`, {
        method: "POST",

        body: JSON.stringify({
          "roles":[
            ...headersRole,
            "department admin"
          ],
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
          success="Error with Department Header Email"
          status="fail"
          key={Math.random()} 
      />])
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2 scrollbar-none">
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%]  translate-x-[25%]  flex flex-col justify-center items-center text-black ml-1 rounded-2xl"
          >
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none">
            <p className="font-normal">Faculty {">"} Add Department</p>
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
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default addDepartment;
