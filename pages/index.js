import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/login');
  }, []);
  return <></>;
};
export default Home;
