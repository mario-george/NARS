import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "./header";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { VscChecklist } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { VscChecklist } from "react-icons/vsc";

export default function QualityCoordinatorDashboard() {
  const router = useRouter();
  const navStatus = useSelector((s) => s.user.navStatus);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    //window.location.href = "/logout";
    router.push("/logout");
  };
  return (
    <nav
      className={`nav2 transition-all duration-300 transform ${
        navStatus ? ` -translate-x-full` : `translate-x-0 `
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

      <Link
        className="link2 focus:text-green-400 "
        href="/qualitycoordinator/coursecomp"
      >
        <span>
          <VscChecklist
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Assign courses competences</span>
      </Link>

      <Link
        className="link2 focus:text-green-400 "
        href="/qualitycoordinator/coursecomp"
      >
        <span>
          <VscChecklist
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Assign courses competences</span>
      </Link>
      <Link
        className="link2 focus:text-green-400 "
        href="/qualitycoordinator/downloadSpecs"
      >
        <span>
          <VscChecklist
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Download courses Specs</span>
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
