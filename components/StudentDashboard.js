import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "./header";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
export default function studentDashboard() {
    const router = useRouter();
    const courseName = useSelector((s) => s.user.data.courses);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(userActions.logOut());
        window.location.href = "/logout";
    };
    return (
        <nav className="nav2">
            <Link className="link2 focus:text-green-400 " href="/student/profile">
                Profile
            </Link>
            {header('courses', [header(courseName,
                [
                    'course specs',
                    'Materials',
                    'Assignments'
                ])

            ])}
            <button
                className="link2 focus:text-green-400 text-left mx-2"
                onClick={logoutHandler}
            >
                Logout
            </button>
        </nav>
    );
}
