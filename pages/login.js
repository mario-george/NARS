import Link from 'next/link';
import { useState } from 'react';
import { useRef } from 'react';
// api/v1/users/login
export default function Login() {
  const email = useRef();
  const password = useRef();
  const [invalidData, setInvalidData] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    const r = await fetch(
      'http://ec2-54-158-207-145.compute-1.amazonaws.com/api/v1/users/login',
      {
        method: 'POST',
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const resp = await r.json();
    console.log(resp);
    if (resp.status == 'fail') {
      setInvalidData(true);
    } else {
      alert('success');
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 w-full mt-10">
        <div class="text2 text-2xl "> Login</div>
        <form
          onSubmit={submitHandler}
          className="text-1xl border-2  border-none shadow-2xl rounded-2xl px-7 py-4  gap-10">
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
              Don't have account?{' '}
              <Link
                href="/register"
                className={`inline text-1xl underline  text-[#0277BD]`}>
                Register now!
              </Link>
            </p>
          </div>
          {invalidData && <span className="text-red-500 flex justify-center">Invalid input </span>}
        </form>
        <p className="text-1xl">
          -Forgot your password?
          <Link
            href="/forget_password"
            className={`inline text-1xl underline  text-[#0277BD]`}>
            Reset now!
          </Link>{' '}
        </p>
      </div>
    </>
  );
}
