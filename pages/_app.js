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
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
