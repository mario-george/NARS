import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { MdOutlineLogin } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Image from "next/image";

function MainHeader() {
  const router = useRouter();
  const userState = useSelector((s) => s.user);

  const [img, setImg] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(
          `${process.env.url}api/v1/users/staff/getPhoto/${userState._id}`,
          {
            method: "GET",

            headers: {
              Accept: "application/form-data",
              Authorization: "Bearer " + userState.token,
            },
          }
        );

        console.log(res);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL);
        setImg(imageObjectURL);
      } catch (e) {
        console.log(e);
      }
    };
    fetchImage();
  }, []);

  let logged = (
    <Link
      className="relative hover:underline hover:text-green-400"
      href="/profile"
    >
      <div>
        <Image
          src={img}
          alt="no photo"
          style={{
            position: "absolute",
            left: -50,
            top: -6,
            borderRadius: "50%",
          }}
          width={40}
          height={50}
          Layout={"fixed"}
          quality={100}
        />
      </div>
      <span className="">{userState.name}</span>
    </Link>
  );

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

  return (
    <div>
      <div className="layout ">
        <div className="flex justify-between items-center md:mx-[3rem] h-[5rem]">
          <div className="flex space-x-8 items-center justify-center ">
            <div className="flex flex-col space-y-2">
              <div className="text ">NARQA </div>
              <div className="text  ">Quality Assurance</div>
            </div>
          </div>
          {userState.loggedInStatus === "true" ? logged : not}
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
