import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { header } from "./header";
export default function InstructorDashboard() {
  const router = useRouter();
  const courseName = useSelector((s) => s.user.data.courses);
  return (
    <nav className="nav2">
      <Link className="link2 focus:text-green-400 " href="/instructor/profile">
        Profile
      </Link>
      {header("courses", [
        header(courseName, [
          "course specs",
          "Materials",
          "Assignments",
          "Exams",
          "Grades",
          "Direct assesment",
          "Indirect assesment",
        ]),
      ])}
      {header("Create Course", [
        <a
          className="link2 focus:text-green-400 "
          href="/instructor/coursespecs/part1"
        >
          Course Specs
        </a>,
      ])}
      <a className="link2 focus:text-green-400 " href="/instructor/report">
        Course report
      </a>
      <Link className="link2 focus:text-green-400 " href="/login">
        Logout
      </Link>
    </nav>
  );
}
