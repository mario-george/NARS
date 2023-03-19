import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/userSlice";
import Cookies from "js-cookie";
import { MdOutlineLogin } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Image from 'next/image'
import { relative } from "path";
export default function Layout({ children, cookies }) {
  const d = useDispatch();

  d(userActions.setCookies(cookies));
  const dispatch = useDispatch();
  const userState= useSelector((s) => s.user);
  console.log(userState)
  const router = useRouter();

  const [img, setImg] = useState();
  useEffect(() => {

    const fetchImage = async () => {
      try {
        const r = await fetch(`${process.env.url}api/v1/users/staff/getPhoto/${cookies._id}`, {
          method: "GET",

          headers: {
            Accept: "application/form-data",
            Authorization: "Bearer " + cookies.token,
          },
        });

        const res = await r;
        console.log(res);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL)
        setImg(imageObjectURL);
      } catch (e) { console.log(e) }
    }
    fetchImage();
  }, []);


  let logged = <a className="relative hover:underline hover:text-green-400" href="/profile">
    <div>
      <Image
        src={img}
        alt="no photo"
        style={{ position: "absolute", left: -50, top: -6, borderRadius: "50%" }}
        width={40}
        height={50}
        Layout={"fixed"}
        quality={100}

  let logged = <div>{userState.name}</div>;
  let not = (
    <>
      <div className="flex items-center justify-center gap-10  ">
        <div className="translate-x-24">
          <MdOutlineLogin style={{ fontSize: 30 }} />
        </div>
        <Link
          href="/login"
          className={router.pathname == "/login" ? "activeLink" : "normalLink"}
        >
          <div className="text translate-y-7 translate-x-10"> Login</div>
        </Link>
        <div className="translate-x-14">
          <AiOutlineUsergroupAdd style={{ fontSize: 30 }} />
        </div>
        <Link
          href="/register"
          className={
            router.pathname == "/register" ? "activeLink" : "normalLink"
          }
        >
          <div className="text  translate-y-7">Register</div>
        </Link>
      </div>
    </>
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
          {userState.loggedInStatus==="true" ? logged : not}
        </div>
      </div>

      <div>{children}</div>
    </>
  );
}
