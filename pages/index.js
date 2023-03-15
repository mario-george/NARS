import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Home = ({ cookies }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (cookies.role) {
    useEffect(() => {
      setIsLoggedIn(true);
    }, [])
  }
  setTimeout(() => {
    {
      isLoggedIn ?
        window.location.href = "/profile"
        :
        window.location.href = "/login"
    }
  }, 0);
  return (<>

  </>);
};
export default Home;

