import Link from 'next/link';

export default function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 w-full mt-10">
        <div class="text2 text-5xl "> Login</div>
        <form
          action="/login"
          className="text-2xl border-2 border-black shadow-xl rounded-2xl px-16 py-4  gap-10"
          method="post">
          <label for="email" className="font-bold mr-10">
            Edu email
          </label>
          <div class=" my-5">
            <input
              type="email"
              id="email"
              name="email"
              className="button"
              placeholder=""
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
            />
          </div>
          <button type="submit" class="w-full text-center home-btn1 my-10">
            Login
          </button>
          <div className="mx-auto">
            <p className="text-2xl inline  ">
              Don't have account?{' '}
              <Link
                href="/register"
                className={`inline text-2xl underline  text-[#0277BD]`}>
                Register now!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
