import cookies from 'next-cookies';

/**
 * @typedef {import('next').GetServerSidePropsContext} GetServerSidePropsContext
 * @typedef {import('next').GetServerSideProps} GetServerSideProps
 */

/**
 * @type {GetServerSideProps}
 */
export const getServerSideProps = async (context) => {
  const { name } = cookies(context);
  console.log('My cookie value:', name);

  return {
    props: {
      myCookieValue: name || '',
    }
  };
};

function MyPage(props) {
  // You can access the cookie value as a prop here
  return (
    <div>
      My cookie value is: {props.myCookieValue}
    </div>
  );
}

export default MyPage;
