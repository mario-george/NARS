import Link from 'next/link';

export default function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 w-full mt-10">
        <div class="text2 text-2xl "> Login</div>
        <form
          action="/login"
          className="text-1xl border-2  border-none shadow-2xl rounded-2xl px-7 py-4  gap-10"
          method="post">
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
        </form>
        <p className="text-1xl">-Forgot your password?
          <Link
            href="/forget_password"
            className={`inline text-1xl underline  text-[#0277BD]`}>
            Reset now!
          </Link> </p>
      </div>
    </>
  );
}
