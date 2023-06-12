import Link from "next/link";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { header } from "./header";
import { FaUniversity } from "react-icons/fa";
import { FaBlackTie } from "react-icons/fa";

export default function FacultyAdminDashboard() {
  const router = useRouter();
  const logoutHandler = () => {
    router.push("/logout");
  };
  return (
    <nav className="nav2">
      <Link className="link2 focus:text-green-400 " href="/profile">
        <span>
          <CgProfile
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Profile</span>
      </Link>

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
