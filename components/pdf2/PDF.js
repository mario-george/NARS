import React from 'react';
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDF = (props) => {
  return (
    <>
      
  
      <div className="Post w-1/2" ref={ref}>
    <>
      <div className="flex flex-row w-50vw h-screen mt-2">
        <form
         
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1"
        >
          <div className="contentAddUser2 flex flex-col gap-10">
            <p className="underline mb-1">-Course Data:</p>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Course Code & Title:</div>
                <input
                  type="text"
                  name="code"
                  className="input-form w-full"
                  
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Semester/Year:</div>
                <input
                  type="text"
                  name="year"
                  className="input-form  w-full"
                />
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Specialization:</div>
                <input
                  type="text"
                  name="special"
                  className="input-form w-full"
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Contact Hours: </div>
                <input
                  type="number"
                  name="hours"
                  className="input-form  w-full"
                />
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Lecture:</div>
                <input
                  type="number"
                  name="lecture"
                  className="input-form w-full"
                  value={props.lecture}
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Practical/Practice: </div>
                <input
                  type="number"
                  name="practical"
                  className="input-form  w-full"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
    <>
      <div className="flex flex-row w-50vw h-screen mt-2">
        <form
         
          className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1"
        >
          <div className="contentAddUser2 flex flex-col gap-10">
            <p className="underline mb-1">-Course Data:</p>
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Course Code & Title:</div>
                <input
                  type="text"
                  name="code"
                  className="input-form w-full"
                  
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Semester/Year:</div>
                <input
                  type="text"
                  name="year"
                  className="input-form  w-full"
                />
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Specialization:</div>
                <input
                  type="text"
                  name="special"
                  className="input-form w-full"
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Contact Hours: </div>
                <input
                  type="number"
                  name="hours"
                  className="input-form  w-full"
                />
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-1/3">
                <div>Lecture:</div>
                <input
                  type="number"
                  name="lecture"
                  className="input-form w-full"
                  value={props.lecture}
                />
              </div>
              <div className="flex flex-col gap-5  w-2/5">
                <div> Practical/Practice: </div>
                <input
                  type="number"
                  name="practical"
                  className="input-form  w-full"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
        <h1 className='bg-red-500 text-center'>{props.title}</h1>
        <img  className='bg-red-500 text-center' src={props.image} alt={props.title} />
        <p className='bg-red-500 text-center'>{props.content}</p>
      </div>
      <Pdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
      </Pdf>
    </>
  );
}

export default PDF;