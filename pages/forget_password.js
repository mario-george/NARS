import React, { useRef } from 'react';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export default function forgetPassword() {
    const [notAdded, setNotAdded] = useState(false);
    const email=useRef();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const router = useRouter();
    const onSubmit = async (data) => {
        console.log(email.current.value);
        const r = await fetch(
            `${process.env.url}api/v1/users/forgotPassword`,
            {
                method: "POST",
                body: JSON.stringify({ email: email.current.value }),
                headers: { "Content-Type": "application/json" },
            }
        );

        const resp = await r.json();
        console.log(resp);
        if (resp.status == "fail") {
            setNotAdded(true);
        } else {
            router.push("/otp2");
        }
    };
    return (
        <div class="flex flex-col gap-5 justify-center items-center w-full">
            <div className="text-2xl font-normal mt-20 mb-5 "> Follow the upcoming steps to reset your password </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                action="/otp"
                className="flex flex-col gap-10 justify-center items-center text-1xl border-none border-black shadow-2xl rounded-2xl px-7 py-4"
                method="post">
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
                        ref={email}
                    />
                    {errors.email && <span className='text-red-500'>Invalid email</span>}
                    {notAdded && (
                        <span className="text-red-500">
                            There is no user with this email address
                        </span>
                    )}
                </div>
                <button type='submit' class="home-btn1 px-10 w-full ">
                    Verify your mail
                </button>
            </form>
        </div>
    );
}

