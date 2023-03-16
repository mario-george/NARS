import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/userSlice";
import Cookies from "js-cookie";

export default function LayoutLoggedIn({ children, cookies }) {
  const [logged, setLogged] = useState(false);

  const d = useDispatch();
  console.log(cookies);
  const token = Cookies.get("token");
  const data = Cookies.get("data");
  const name = Cookies.get("name");
  const loggedInStatus = Cookies.get("loggedInStatus");
  const dispatch = useDispatch();
  const navStatus = useSelector((s) => s.navStatus);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const userName = useSelector((s) => s.data.name);
  d(userActions.toggleLoggedIn(loggedInStatus));
  let content;
  console.log(loggedInStatus);
  console.log(data);
  if (loggedInStatus) {
    // content = <div className="text-blue-500  ">{userName}</div>;
    // setLogged(true)
  } else {
    // content = (
    //   <div className="flex items-center justify-center gap-10  ">
    //     <Link
    //       href="/login"
    //       className={router.pathname == "/login" ? "activeLink" : "normalLink"}
    //     >
    //       <div className="text translate-y-5">Login</div>
    //     </Link>
    //     {/* NavLink is better than Link that it has activeClassName prop that activate when the route is active */}
    //     <Link
    //       href="/register"
    //       className={
    //         router.pathname == "/register" ? "activeLink" : "normalLink"
    //       }
    //     >
    //       <div className="text  translate-y-5">Register</div>
    //     </Link>
    //   </div>
    // );
  }

  const hamHandler = () => {
    dispatch(userActions.toggleNav());
  };
  return (
    <>
      <div className="layout ">
        <div className="flex justify-between items-center md:mx-[3rem] h-[5rem]">
          <div className="flex space-x-8 items-center justify-center ">
            {/* ham */}
            {/* {loggedInStatus && (
              <>
                <button
                  className={`block hamburger focus:outline-none md:hidden ${
                    navStatus ? `` : `open`
                  }`}
                  type="button"
                  onClick={hamHandler}
                >
                  <div class=" hamburger-top"></div>
                  <div class="hamburger-middle"></div>
                  <div class="hamburger-bottom"></div>
                </button>
              </>
            )} */}
            <div className="flex flex-col space-y-2">
              <div className="text ">N.A.R.S </div>
              <div className="text  ">Quality Assurance</div>
            </div>
          </div>
          <div className="text-blue-500  ">{cookies.name}</div>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
