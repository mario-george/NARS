import { userActions } from "@/components/store/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
// api/v1/users/login
export default function Login({ cookies }) {
  console.log(cookies);

  useEffect(() => {
    if (cookies.role) {
      if (cookies.role === "system admin") {
        window.location.href = "/admin/profile";
      } else if (cookies.role === "instructor") {
        window.location.href = "/instructor/profile";
      } else {
        alert("not known role");
      }
    }
  });
  const email = useRef();
  const password = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const [invalidData, setInvalidData] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const r = await fetch(
      "http://ec2-52-3-250-20.compute-1.amazonaws.com/api/v1/users/login",
      {
        method: "POST",

        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const resp = await r.json();
    console.log(resp);
    if (resp.status == "fail") {
      setInvalidData(true);
    } else {
      Cookies.set("token", resp.token);
      Cookies.set("data", resp.data);
      Cookies.set("name", resp.data.user.name);
      Cookies.set("email", resp.data.user.email);
      Cookies.set("role", resp.data.user.role);
      console.log(resp.data.user.name);
      Cookies.set("loggedInStatus", true);
      dispatch(userActions.toggleLoggedIn(true));

      if (resp.data.user.role === "system admin") {
        await dispatch(userActions.getUserData(resp.data.user));
        // router.push('', undefined, { shallow: true, onComplete: () => window.location.reload() });
        // router.push('/', undefined, { shallow: true, onComplete: "window.location.reload()" });

        window.location.href = "/admin/profile";
        // router.push("/admin/profile", undefined, {
        //   shallow: true,
        //   onComplete: setTimeout(() => window.location.reload(), 100),
        // });
      } else if (resp.data.user.role === "instructor") {
        window.location.href = "/instructor/profile";
      } else {
        alert("not known role");
      }
    }
  };
  return (
    <>
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
              Invalid input{" "}
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
    </>
  );
}
