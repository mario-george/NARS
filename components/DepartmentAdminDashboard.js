import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "./header";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { GrOrganization } from "react-icons/gr";
import { FaUniversity } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DepartmentAdminDashboard(cookies) {
    const userState = useSelector((s) => s.user);
    const router = useRouter();
    const navStatus = useSelector((s) => s.user.navStatus);
    const [name, setName] = useState("")
    useEffect(() => {
        async function getName() {
            try {
                const r = await fetch(`${process.env.url}api/v1/department/${userState.department}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + userState.token,
                    },
                });

                const resp = await r.json();
                setName(resp.data.name);
                console.log(userState.token);
            } catch (e) {
                console.log(e);
            }
        };
        getName();
    }, []);
    const logoutHandler = () => {
        router.push('/logout')
    };
    return (
        <nav
            className={`nav2 transition-all duration-300 transform ${navStatus ? ` -translate-x-full` : `translate-x-0 `
                }`}
        >
            <Link className="link2 focus:text-green-400 " href="/profile">
                <span>
                    <CgProfile
                        style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
                    />
                </span>
                <span className="ml-2">Profile</span>
            </Link>

            {header(
                <span >
                    <GrOrganization
                        style={{
                            fontSize: 30,
                            display: "inline",
                            marginBottom: 4,
                            marginRight: 9,

                        }}
                    />
                    {name} Department
                </span>,
                [
                    <Link
                        className={
                            router.pathname === "/department/addprogram"
                                ? "activeLinkDashboard2"
                                : "normalLinkDashboard2"
                        }
                        href="/department/addprogram"
                    >
                        Add Program
                    </Link>,
                    <Link
                        className={
                            router.pathname === "/department/updateprogram"
                                ? "activeLinkDashboard2"
                                : "normalLinkDashboard2"
                        }
                        href="/department/updateprogram"
                    >
                        Update Program
                    </Link>,
                    <Link
                        className={
                            router.pathname === "/department/deleteprogram"
                                ? "activeLinkDashboard2"
                                : "normalLinkDashboard2"
                        }
                        href="/department/deleteprogram"
                    >
                        Delete Program
                    </Link>,
                    <Link
                        className={
                            router.pathname === "/department/viewprograms"
                                ? "activeLinkDashboard2"
                                : "normalLinkDashboard2"
                        }
                        href="/department/viewprograms"
                    >
                        View Programs
                    </Link>,
                ]
            )}

            <button
                className="link2 focus:text-green-400 text-left"
                onClick={logoutHandler}
            >
                <span>
                    <CgLogOut
                        style={{ fontSize: 30, display: "inline", marginBottom: 0 }}
                    />
                </span>
                <span className="ml-2">Logout</span>
            </button>
        </nav>
    );
}
