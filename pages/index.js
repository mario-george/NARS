import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    window.location.href='/login'
  }, []);
  return <></>;
};
export default Home;
