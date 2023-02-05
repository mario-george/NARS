import Layout from '@/components/Layout';
import '../styles/styles.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>React Meetup</title>
      </Head>
      <Layout>
        {' '}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
