import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userActions } from "@/components/store/userSlice";
export default function register() {
  const d = useDispatch();
  const [notAdded, setNotAdded] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const onSubmit = async (data) => {
    console.log(data.email);
    const r = await fetch(
      `${process.env.url}/api/v1/users/signup`,
      {
        

        method: "POST",
        body: JSON.stringify({ email: data.email }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const resp = await r.json();
    console.log(resp);
    if (resp.status == "fail") {
      setNotAdded(true);
    } else {
      d(userActions.registerCompletionPart1());
      router.push("/otp");
    }
  };
  return (
    <div class="flex flex-col gap-5 justify-center items-center w-full">
      <div className="text-2xl font-bold mt-20 mb-5">Create your account </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="/otp"
        className="flex flex-col gap-10 justify-center items-center text-1xl border-none border-black shadow-2xl rounded-2xl px-7 py-4"
        method="post"
      >
        <div className="flex flex-col gap-5">
          <label for="email" className="font-bold mr-10">
            Edu mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="button"
            placeholder=""
            required
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <span className="text-red-500">Invalid email</span>}
          {notAdded && (
            <span className="text-red-500">
              There is no user with this email address
            </span>
          )}
        </div>
        <button type="submit" class="home-btn1 px-10 w-full ">
          Verify your mail
        </button>
      </form>
    </div>
  );
}
