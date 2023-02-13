import Layout from "../components/Layout";
import LayoutLoggedIn from "../components/LayoutLoggedIn";
import "../styles/styles.css";
import Head from "next/head";
import store from "../components/store/store";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  let loggedInStatus= Cookies.get("loggedInStatus");
  
  if (loggedInStatus == "false") {
    return (
      <>
        <Head>
          <title>React Meetup</title>
        </Head>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </>
    );
  }
  if (loggedInStatus == "true") {
    return (
      <>
        <Head>
          <title>React Meetup</title>
        </Head>
        <Provider store={store}>
          <LayoutLoggedIn>
            <Component {...pageProps} />
          </LayoutLoggedIn>
        </Provider>
      </>
    );
  }
}

export default MyApp;
