import { header } from "../header";

const { useState } = require("react");

function HeaderElement({ id,name ,createdAt}) {
    // Call your Hook here
    const [state, setState] = useState(null);
  
    return header(name, [
      <a href={`/instructor/courses/${id}/courseSpecs/part1`}>Course Specs</a>,
      "Materials",
      "Assignments",
      "Exams",
      "Grades",
      "Direct assesment",
      "Indirect assesment",
    ],createdAt);
  }
export default HeaderElement