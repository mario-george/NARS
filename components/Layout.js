import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
export default function Layout(props) {
  const router = useRouter();
  const loggedInStatus = useSelector((s) => s.user.loggedInStatus);
  const userName = useSelector((s) => s.user.data.name);
  let content;
  if (!loggedInStatus) {
    content = (
      <div className="flex items-center justify-center gap-10  ">
   
        <Link
          href="/login"
          className={router.pathname == '/login' ? 'activeLink' : 'normalLink'}>
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
    );
  } else {
    content = <div>{userName}</div>;
  }
  return (
    <>
      <div className="layout">
        <div className="flex justify-between items-center mx-[3rem] h-[5rem] ">
          <div className="text">N.A.R.S Quality Assurance</div>
          {content}
        </div>
      </div>
      <div>{props.children}</div>
    </>
  );
}
