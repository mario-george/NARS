import React, { useRef } from "react";
import {
    Document,
    Page,
    View,
    Text,
    Image,
    PDFViewer,
    StyleSheet,
    Font,
  } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

export default function CourseData  ()  {
//   const tw = createTw({
//     theme: {
//       fontFamily: {
//         sans: ["Roboto"],
//       },
//       extend: {
//         colors: {
//           custom: "#bada55",
//         },
//       },
//     },
//   });
//   const code = useRef(null);
//   const year = useRef(null);
//   const special = useRef(null);
//   const hours = useRef(null);
//   const lecture = useRef(null);
//   const practical = useRef(null);

//   const submitHandler = (event) => {
//     event.preventDefault();
//     // Handle form submission
//   };

  return (
   <Text>Course Code & Title:</Text>

    //   <Text style={tw(`flex flex-row w-screen h-screen mt-2`)}>
    //     <Text
    //       style={tw(`bg-sky-50 h-screen w-screen flex flex-col justify-center items-center text-black ml-1`)}
    //     >
    //       <Text style={tw(`contentAddUser2 flex flex-col gap-10`)}>
    //         <Text style={tw(`underline mb-1`)}>-Course Data:</Text>
    //         <Text style={tw(`flex gap-20 `)}>
    //           <Text style={tw(`flex flex-col gap-5 w-1/3`)}>
    //             <Text>Course Code & Title:</Text>
    //             <Text

    //               style={tw(`input-form w-full`)}
    //             />
    //           </Text>
    //           <Text style={tw(`flex flex-col gap-5  w-2/5`)}>
    //             <Text>Semester/Year:</Text>
    //             <Text

    //               style={tw(`input-form  w-full`)}
    //             />
    //           </Text>
    //         </Text>

    //         <Text style={tw(`flex gap-20 `)}>
    //           <Text style={tw(`flex flex-col gap-5 w-1/3`)}>
    //             <Text>Specialization:</Text>
    //             <Text

    //               style={tw(`input-form w-full`)}
    //             />
    //           </Text>
    //           <Text style={tw(`flex flex-col gap-5  w-2/5`)}>
    //             <Text>Contact Hours:</Text>
    //             <Text

    //               style={tw(`input-form  w-full`)}
    //             />
    //           </Text>
    //         </Text>

    //         <Text style={tw(`flex gap-20 `)}>
    //           <Text style={tw(`flex flex-col gap-5 w-1/3`)}>
    //             <Text>Lecture:</Text>
    //             <Text

    //               style={tw(`input-form w-full`)}
    //             />
    //           </Text>
    //           <Text style={tw(`flex flex-col gap-5  w-2/5`)}>
    //             <Text>Practical/Practice:</Text>
    //             <Text

    //               style={tw(`input-form  w-full`)}
    //             />
    //           </Text>
    //         </Text>

    //         <Text style={tw(`flex justify-end`)}>
    //           <Text style={tw(`w-[6rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`)} >
    //             <Text>Next</Text>
    //           </Text>
    //         </Text>
    //       </Text>
    //     </Text>
    //   </Text>
  );
};


