import Link from 'next/link';
import { useRouter } from 'next/router';
export default function Layout(props) {
  const router = useRouter();

  return (
    <>
      <div className="layout">
        <div className="flex justify-between items-center mx-[3rem] h-[5rem] ">
          <div className='text'>N.A.R.S Quality Assurance</div>
          <div className="flex items-center justify-center gap-10  ">
            <Link
              className={
                router.pathname == '/' ? 'activeLink' : 'normalLink'
              }
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
    </>
  );
}
