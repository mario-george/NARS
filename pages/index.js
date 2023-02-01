import Link from 'next/link';

const Home = () => {
  return (
    <>
      <>
        <div class="flex flex-col mt-5 justify-center items-center">
    
          <br />
          <div className="flex flex-col border-2 border-black rounded-xl shadow-xl text-center py-3 px-4 mx-auto w-[50rem] gap-10 p-[3rem] ">
            <p className="text-xl text ">Please Login or Register</p>
            <Link href="/login" className="home-btn1">
              Login
            </Link>

            <Link href="/register" className="home-btn1">
              Register
            </Link>
          </div>
        </div>
      </>
    </>
  );
};
export default Home;
