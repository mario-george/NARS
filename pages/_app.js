import Layout from "../components/Layout";
import "../styles/styles.css";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
import { store, persistor } from "../components/store/store";
import { Provider } from "react-redux";
import cookie from "cookie";
import App from "next/app";
import TopBarProgress from "react-topbar-progress-indicator"
import { useState } from "react";
import {Router,useRouter} from "next/router"

function MyApp({ Component, pageProps, cookies }) {
  const [progress, setProgress] = useState(false);
Router.events.on("routeChangeStart", () => {
  setProgress(true) 
})

Router.events.on("routeChangeComplete", () => {
  setProgress(false) 
})
  if (Component.getPageLayout) {
    return Component.getPageLayout(
      <Provider store={store} className="scrollbar-none">
        <PersistGate loading={null} persistor={persistor}>
          <div className=" flex flex-col">
          {progress && <TopBarProgress />}
            <GiveState Component={Component} {...pageProps} progress={progress}/>
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
          {progress && <TopBarProgress />}
            <GiveState Component={Component} {...pageProps} progress={progress}/>
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}
function GiveState({ Component, pageProps,progress }) {
  const userState = useSelector((state) => state.user);
  const r=useRouter()
  return <Component {...pageProps} cookies={userState} progress={progress} key={r.asPath}/>;
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
