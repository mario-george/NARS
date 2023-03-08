import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { userActions } from "./store/userSlice.js";
import { useDispatch } from "react-redux";
import { header } from './header';
export default function FacultyadminDashboard() {
    const router = useRouter();
    const navStatus = useSelector((s) => s.user.navStatus);
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
                        router.pathname === "/facultyadmin/profile"
                            ? "activeLinkDashboard2"
                            : "normalLinkDashboard2"
                    }
                    href="/facultyadmin/profile"
                >
                    Profile details
                </a>,
            ])}
            {header('Faculty', [
                
                    <a
                        className={
                            router.pathname === "/facultyadmin/addfaculty"
                                ? "activeLinkDashboard2"
                                : "normalLinkDashboard2"
                        }
                        href="/facultyadmin/addfaculty"
                    >
                        Add Faculty
                    </a>,
                    <a
                        className={
                            router.pathname === "/facultyadmin/updatefaculty"
                                ? "activeLinkDashboard2"
                                : "normalLinkDashboard2"
                        }
                        href="/facultyadmin/updatefaculty"
                    >
                        Update Faculty
                    </a>,
                    <a
                    className={
                        router.pathname === "/facultyadmin/deletefaculty"
                            ? "activeLinkDashboard2"
                            : "normalLinkDashboard2"
                    }
                    href="/facultyadmin/deletefaculty"
                >
                    Delete Faculty
                </a>, <a
                className={
                    router.pathname === "/facultyadmin/viewfaculty"
                        ? "activeLinkDashboard2"
                        : "normalLinkDashboard2"
                }
                href="/facultyadmin/viewfaculty"
            >
                View Faculties
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
