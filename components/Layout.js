import Link from 'next/link';
import { useRouter } from 'next/router';
export default function Layout(props) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full font-bold font-Rubik">
      <div className="shadow-2xl p-0 m-0  w-full  h-[5rem] flex-1">
        <div className="flex justify-between items-center mx-[3rem]   ">
          <div className="text">N.A.R.S Quality Assurance</div>
          <div className="flex items-center  gap-10  ">
            <Link
              className={router.pathname == '/' ? 'activeLink' : 'normalLink'}
              href="/">
              <div className="text translate-y-5">Home</div>
            </Link>
            <Link
              href="/login"
              className={
                router.pathname == '/login' ? 'activeLink' : 'normalLink'
              }>
              <div className="text translate-y-5">Login</div>
            </Link>
            {/* NavLink is better than Link that it has activeClassName prop that activate when the route is active */}

            <Link
              href="/register"
              className={
                router.pathname == '/register' ? 'activeLink' : 'normalLink'
              }>
              <div className="text translate-y-5">Register</div>
            </Link>
          </div>
        </div>
      </div>

      <div>{props.children}</div>
    </div>
  );
}
