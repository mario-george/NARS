import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "./header";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
export default function ProgramAdminDashboard() {
    const router = useRouter();
    const navStatus = useSelector((s) => s.user.navStatus);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(userActions.logOut());
        window.location.href = "/logout";
    };
    return (
        <nav
            className={`nav2 transition-all duration-300 transform ${navStatus ? ` -translate-x-full` : `translate-x-0 `
                }`}
        >
            {header("Profile", [
                <a
                    className={
                        router.pathname === "/programadmin/profile"
                            ? "activeLinkDashboard2"
                            : "normalLinkDashboard2"
                    }
                    href="/programadmin/profile"
                >
                    Profile details
                </a>,
            ])}
            {header('Programs', [
                <a
                    className={
                        router.pathname === "/programadmin/assignprogramcoordinator"
                            ? "activeLinkDashboard2"
                            : "normalLinkDashboard2"
                    }
                    href="/programadmin/assignprogramcoordinator"
                >
                    Assign program  coordinator
                </a>,
                <a
                    className={
                        router.pathname === "/programadmin/assignprogramqualitycoordinator"
                            ? "activeLinkDashboard2"
                            : "normalLinkDashboard2"
                    }
                    href="/programadmin/assignprogramqualitycoordinator"
                >
                    Assign program quality coordinator
                </a>,
            ])}
            {header('Courses', [
                <a
                    className={
                        router.pathname === "/programadmin/addcourse"
                            ? "activeLinkDashboard2"
                            : "normalLinkDashboard2"
                    }
                    href="/programadmin/addcourse"
                >
                    Create course
                </a>,
                <a
                    className={
                        router.pathname === "/programadmin/getcourse"
                            ? "activeLinkDashboard2"
                            : "normalLinkDashboard2"
                    }
                    href="/programadmin/getcourse"
                >
                    Get courses
                </a>,
                <a
                    className={
                        router.pathname === "/programadmin/assigninstructor"
                            ? "activeLinkDashboard2"
                            : "normalLinkDashboard2"
                    }
                    href="/programadmin/assigninstructor"
                >
                    Assign instructor
                </a>,
                <a
                    className={
                        router.pathname === "/programadmin/assignta"
                            ? "activeLinkDashboard2"
                            : "normalLinkDashboard2"
                    }
                    href="/programadmin/assignta"
                >
                    Assign TA
                </a>,
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
