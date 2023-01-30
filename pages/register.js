import Link from 'next/link';

export default function register() {
  return (
    <div
      class="flex flex-col gap-5 justify-center items-center w-full
">
      <div className="text-5xl font-bold my-10"> Create Account</div>
      <form
        action="/users/register"
        className="flex flex-col gap-10 justify-center items-center text-3xl border-2 border-black shadow-xl rounded-2xl px-8 py-5"
        method="post">
        <div className="flex flex-col gap-5">
          <label for="name" className="mr-[10rem]">
            Name
          </label>
          <input
            type="name"
            id="name"
            className="button"
            name="name"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-5">
          <label for="email" className="mr-[10rem]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="button"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-5">
          <label for="password" className="mr-28">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="button"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-5">
          <label for="password2" className="">
            Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            className="button"
            placeholder=""
          />
        </div>{' '}
        <button type="submit" class="home-btn1 px-10 w-full">
          Register
        </button>
        <p class="text-xl mt-4 font-bold">
          Have An Account?{' '}
          <Link className="px-2 text-[#0277BD] underline" href="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
