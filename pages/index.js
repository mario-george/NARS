import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Home = ({ cookies }) => {
  const r = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (cookies.role!=="null") {
    useEffect(() => {
      setIsLoggedIn(true);
    }, [])
  }
  setTimeout(() => {
    {
      if(isLoggedIn===false){
        r.push("/login");
      }
      else if (isLoggedIn && cookies.role === "student") {
        r.push("/studentProfile");
      }
      else if (isLoggedIn && cookies.role !== "student") {
        r.push("/profile");
      }
    }
  }, 0);
  return (<>

  </>);
};
export default Home;

