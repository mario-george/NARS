import Layout from "../components/Layout";
import LayoutLoggedIn from "../components/LayoutLoggedIn";
import "../styles/styles.css";
import Head from "next/head";
import store from "../components/store/store";
import { Provider, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import cookie from "cookie";
import App from "next/app";
import { userActions } from "@/components/store/userSlice";
function MyApp({ Component, pageProps, cookies }) {
  // if (cookies.loggedInStatus == "false") {
  return (
    <>
      <Head>
        <title>NARQA Quality Assurance</title>
      </Head>
      <Provider store={store} className="scrollbar-none">
        <Layout cookies={cookies}>
          <Component {...pageProps} cookies={cookies} />
        </Layout>
      </Provider>
    </>
  );
  // }
  // if (cookies.loggedInStatus == "true") {
  //   return (
  //     <>
  //       <Head>
  //         <title>React Meetup</title>
  //       </Head>
  //       <Provider store={store}>
  //         <LayoutLoggedIn cookies={cookies}>
  //           <Component {...pageProps} cookies={cookies} />
  //         </LayoutLoggedIn>
  //       </Provider>
  //     </>
  //   );
  // }
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const { req } = ctx;
  let cookies = {};

  // Parse the cookies using the cookie package
  if (req && req.headers && req.headers.cookie) {
    cookies = cookie.parse(req.headers.cookie);
  }

  // Call the page's `getInitialProps` function, if it exists
  const pageProps = await App.getInitialProps(appContext);

  // Return the cookies and page props as an object
  return { cookies, pageProps };
};
// export async function getServerSideProps(context) {
//   const { req } = context;
//   const cookies = cookie.parse(req.headers.cookie || "");

//   return {
//     props: {
//       cookies,
//     },
//   };
// }
export default MyApp;
