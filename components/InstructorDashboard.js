import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "./header";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
export default function InstructorDashboard() {
    const router = useRouter();
    const courseName = useSelector((s) => s.user.data.courses);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(userActions.logOut());
        window.location.href = "/logout";
    };
    return (
        <nav className="nav2">
            {header("Profile", [
                <a
                    className={
                        router.pathname === "/instructor/profile"
                            ? "activeLinkDashboard2"
                            : "normalLinkDashboard2"
                    }
                    href="/instructor/profile"
                >
                    Profile details
                </a>,
            ])}
            {header('courses', [header(courseName,
                [
                    <a
                        className={
                            router.pathname === "/instructor/coursespecs/part1"
                                ? "activeLinkDashboard2"
                                : "normalLinkDashboard2"
                        }
                        href="/instructor/coursespecs/part1"
                    >
                        Course Specs
                    </a>,
                    'Materials',
                    'Assignments',
                    'Exams',
                    <a
                        className={
                            router.pathname === "/instructor/grades"
                                ? "activeLinkDashboard2"
                                : "normalLinkDashboard2"
                        }
                        href="/instructor/grades"
                    >
                    Grades
                    </a>,
                    'Direct assesment',
                    'Indirect assesment'
                ])

            ])}
            <Link className="link2 focus:text-green-400 " href="/instructor/report">
                Course report
            </Link>
            <button
                className="link2 focus:text-green-400 text-left mx-2"
                onClick={logoutHandler}
            >
                Logout
            </button>
        </nav>
    );
}
