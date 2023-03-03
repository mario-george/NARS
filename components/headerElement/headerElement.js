import { header } from "../header";

const { useState } = require("react");

function HeaderElement({ id }) {
    // Call your Hook here
    const [state, setState] = useState(null);
  
    return header(id, [
      <a href={`/instructor/courses/${id}/courseSpecs/part1`}>Course Specs</a>,
      "Materials",
      "Assignments",
      "Exams",
      "Grades",
      "Direct assesment",
      "Indirect assesment",
    ]);
  }
export default HeaderElement