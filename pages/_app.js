import Layout from "../components/Layout";
import "../styles/styles.css";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
import MainHeader from "@/components/shared/MainHeader";
import { store, persistor } from "../components/store/store";
import { Provider, useDispatch } from "react-redux";
import cookie from "cookie";
import App from "next/app";
function MyApp({ Component, pageProps, cookies }) {
  if (Component.getPageLayout) {
    return Component.getPageLayout(
      <Provider store={store} className="scrollbar-none">
        <PersistGate loading={null} persistor={persistor}>
          <div className=" flex flex-col">
            <GiveState Component={Component} {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    );
  }

  return (
    <>
      <Head>
        <title>NARQA Quality Assurance</title>
      </Head>
      <Provider store={store} className="scrollbar-none">
        <PersistGate loading={null} persistor={persistor}>
          <Layout cookies={cookies}>
            <GiveState Component={Component} {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}
function GiveState({ Component, pageProps }) {
  const userState = useSelector((state) => state.user);

  return <Component {...pageProps} cookies={userState} />;
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

export default MyApp;
