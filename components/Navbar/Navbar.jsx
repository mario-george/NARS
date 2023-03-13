import React, { useState } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Cookies from "js-cookie";
const Navbar = ({cookies,id}) => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-gray-200 rounded-3xl">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          {/*<img src={Logo} alt="logo" className="md:cursor-pointer h-9" />*/}
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <li>
            <a href={`/instructor/courses/${cookies.instance_id}/courseSpecs/part1`} className="py-7 px-3 inline-block  hover:opacity-25">
              Specs
            </a>
          </li>
          <NavLinks cookies={cookies} id={id}/>
          <li>
            <Link href={ `/instructor/courses/${cookies.instance_id}/report/courseReport`} className="py-7 px-3 inline-block  hover:opacity-25">
              Report
            </Link>
          </li>
        </ul>
        <div className="md:block hidden">
          {/*<Button />*/}
        </div>
        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          <li>
            <Link href={"/"} className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks cookies={cookies} id={id}/>
          <div className="py-5">
            {/*<Button />*/}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
