import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "./header";
import { userActions } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { HiDownload } from "react-icons/hi";

export default function QualityCoordinatorDashboard() {
  const router = useRouter();
  const navStatus = useSelector((s) => s.user.navStatus);
  const userState = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const logoutHandler = () => {
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
        <span className="ml-2">Assign competences</span>
      </Link>
      {/* <Link
        className="link2 focus:text-green-400 "
        href="/qualitycoordinator/downloadSpecs"
      >
        <span>
          <HiDownload
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Download courses Specs</span>
      </Link> */}
      <Link
        className="link2 focus:text-green-400 "
        href="/report/programReport"
      >
        <span>
          <VscChecklist
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Program Report</span>
      </Link>
      <Link
        className="link2 focus:text-green-400 "
        href={`${process.env.url}api/v1/programs/programSpcs/${userState.program}`}
        target="_blank"
        download
      >
        <span>
          <HiDownload
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Download program Specs</span>
      </Link>
      <Link
        className="link2 focus:text-green-400 "
        href={`${process.env.url}api/v1/programs/programSpcs/${userState.program}`}
        target="_blank"
        download
      >
        <span>
          <HiDownload
            style={{ fontSize: 30, display: "inline", marginBottom: 5 }}
          />
        </span>
        <span className="ml-2">Download program Specs</span>
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
