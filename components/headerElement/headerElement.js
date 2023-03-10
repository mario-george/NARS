import { header } from "../header";


const { useState } = require("react");

function HeaderElement({ id,name ,createdAt}) {
    // Call your Hook here
    const [state, setState] = useState(null);
  
    return header(name, [
      <a href={`/instructor/courses/${id}/courseSpecs/part1`}>Course Specs</a>,
      "Materials",
      header("Assignments", [
        <a
          href={`/instructor/courses/${id}/assignment/addassignment`}
        >
          Add assignment
        </a>,
        <a
          href={`/instructor/courses/${id}/assignment/viewassignments`}
        >
          View assignments
        </a>,
      ]),
      header("Exams", [
        <a
          href={`/instructor/courses/${id}/exams/addexam`}
        >
          Add exam
        </a>,
        <a
          href={`/instructor/courses/${id}/exams/viewexams`}
        >
          View exams
        </a>,
      ]),
      "Grades",
      "Direct assesment",
      "Indirect assesment",
      "Course report"
    ],createdAt);
  }
export default HeaderElement