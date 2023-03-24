import { header } from "../header";
import Link from "next/link";
const { useState } = require("react");

function HeaderElement({ id, name, createdAt }) {
  // Call your Hook here
  const [state, setState] = useState(null);

  return header(
    name,
    [
      <Link href={`/instructor/courses/${id}/courseSpecs/part1`}>
        Course Specs
      </Link>,
      "Materials",
      "Assignments",
      "Exams",
      "Grades",
      "Direct assesment",
      "Indirect assesment",
    ],
    createdAt
  );
}
export default HeaderElement;
