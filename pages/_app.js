import Layout from '@/components/Layout';
import '../styles/styles.css';
import Head from 'next/head';
import store from '@/components/store/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>React Meetup</title>
      </Head>
      <Layout>
       <Provider store={store}>
        <Component {...pageProps} />
        </Provider>
      </Layout>
    </>
  );
}

export default MyApp;
