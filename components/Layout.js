import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/userSlice";
import Cookies from "js-cookie";
import { MdOutlineLogin } from 'react-icons/md'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
export default function Layout({ children, cookies }) {
  const d = useDispatch();

  d(userActions.setCookies(cookies));
  const dispatch = useDispatch();
  const navStatus = useSelector((s) => s.user.navStatus);
  const router = useRouter();
  console.log(process.env.url);

  let logged = <div>{cookies.name}</div>;
  let not = (
    <><div className="flex items-center justify-center gap-10  ">
      <div className="translate-x-24"><MdOutlineLogin style={{ fontSize: 30 }} /></div>
      <Link
        href="/login"
        className={router.pathname == "/login" ? "activeLink" : "normalLink"}
      >
        <div className="text translate-y-7 translate-x-10"> Login</div>
      </Link>
      <div className="translate-x-14"><AiOutlineUsergroupAdd style={{ fontSize: 30 }} /></div>
      <Link
        href="/register"
        className={router.pathname == "/register" ? "activeLink" : "normalLink"}
      >
        <div className="text  translate-y-7">Register</div>
      </Link>
      
    </div></>
  );

  const hamHandler = () => {
    dispatch(userActions.toggleNav());
  };

  return (
    <>
      <div className="layout ">
        <div className="flex justify-between items-center md:mx-[3rem] h-[5rem]">
          <div className="flex space-x-8 items-center justify-center ">
            <div className="flex flex-col space-y-2">
              <div className="text ">NARQA </div>
              <div className="text  ">Quality Assurance</div>
            </div>
          </div>
          {cookies.loggedInStatus ? logged : not}
          
        </div>
        
      </div>
      
      <div>{children}</div>
      
    </>
  );
}
