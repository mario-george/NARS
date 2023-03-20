import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Home = ({ cookies }) => {
  const r=useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (cookies.role) {
    useEffect(() => {
      setIsLoggedIn(true);
    }, [])
  }
  setTimeout(() => {
    {
      isLoggedIn ?
      r.push("/profile")
        // window.location.href = "/profile"
        :
      r.push("/login")

        // window.location.href = "/login"
    }
  }, 0);
  return (<>

  </>);
};
export default Home;

