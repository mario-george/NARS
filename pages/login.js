import { userActions } from "../components/store/userSlice";
import { updateField } from "../components/store/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import MainHeader from "@/components/shared/MainHeader";
import LoginModal from "@/components/LoginModal";

export default function Login({ cookies }) {
  const s = useSelector((s) => s.user);
  console.log(s);
  const email = useRef();
  const password = useRef();
  const role = useRef();
  const dispatch = useDispatch();
  const [invalidData, setInvalidData] = useState(false);
  const [rolesArr, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const r = await fetch(`${process.env.url}api/v1/users/login`, {
      method: "POST",

      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const resp = await r.json();
    console.log(resp);
    if (resp.status == "fail") {
      setInvalidData(true);
    } else {
      const courses = JSON.stringify(resp.data.user.courses);
      dispatch(userActions.toggleLoggedIn(true));
      dispatch(updateField({ field: "courses", value: courses }));
      dispatch(updateField({ field: "loggedInStatus", value: "true" }));
      console.log("FIX THIS");
      dispatch(updateField({ field: "_id", value: resp.data.user._id }));
      dispatch(updateField({ field: "email", value: resp.data.user.email }));
      dispatch(updateField({ field: "jwt", value: resp.token }));
      dispatch(updateField({ field: "token", value: resp.token }));
      dispatch(updateField({ field: "name", value: resp.data.user.name }));
      dispatch(
        updateField({ field: "program", value: resp.data.user.program })
      );
      if (resp.data.user.role === "student") {
        dispatch(updateField({ field: "role", value: resp.data.user.role }));
        router.push("/studentProfile");
      }
      else if (resp.data.user.roles.length <= 1) {
        dispatch(updateField({ field: "role", value: resp.data.user.roles[0] }));
        router.push("/profile");
      }
      else {
        setRoles(resp.data.user.roles);
        setShowModal(true);
      }
    }
  };
  const submitRole = async(e) => {
    if (e) {
      e.preventDefault();
    }
    dispatch(updateField({ field: "role", value: role.current.value }));
    router.push("/profile");
  }
  return (
    <>
      <div className=" flex flex-col">
        <MainHeader />
        <div className="flex flex-col justify-center items-center gap-10 w-full mt-10">
          <div class="text2 text-2xl "> Login</div>
          <form
            onSubmit={submitHandler}
            className="text-1xl border-2  border-none shadow-2xl rounded-2xl px-7 py-4  gap-10"
          >
            <label for="email" className="font-bold mr-10">
              Edu email
            </label>
            <div class="my-5">
              <input
                type="email"
                id="email"
                name="email"
                className="button"
                placeholder=""
                required
                ref={email}
              />
            </div>
            <label for="password" className="font-bold ">
              Password
            </label>
            <div class="flex-for-reg mt-5">
              <input
                type="password"
                id="password"
                name="password"
                className="button"
                placeholder=""
                required
                ref={password}
              />
            </div>
            <button type="submit" class="w-full  text-center home-btn1 my-5">
              Login
            </button>
            <div className="mx-auto">
              <p className="text-1xl inline ">
                Don't have account?{" "}
                <Link
                  href="/register"
                  className={`inline text-1xl underline  text-[#0277BD]`}
                >
                  Register now!
                </Link>
              </p>
            </div>
            {invalidData && (
              <span className="text-red-500 flex justify-center">
                Wrong email or passoword{" "}
              </span>
            )}
          </form>
          <p className="text-1xl">
            -Forgot your password?
            <Link
              href="/forget_password"
              className={`inline text-1xl underline  text-[#0277BD]`}
            >
              Reset now!
            </Link>{" "}
          </p>
        </div>
      </div>

      <LoginModal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900">
            Select your role
          </h3>
          <form className="space-y-6" onSubmit={submitRole}>
            <select
              ref={role}
              id="small"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"            >
              <option selected>Choose a role</option>
              {rolesArr.map((e) => {
                return <option value={e}>{e}</option>;
              })}{" "}
            </select>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
            rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Confirm
            </button>
          </form>
        </div>
      </LoginModal>
    </>
  );
}

Login.getPageLayout = function PageLayout(page) {
  return <div className=" flex flex-col">{page}</div>;
};