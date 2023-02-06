import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          src="https://kit.fontawesome.com/dab83f40ad.js"
          crossorigin="anonymous"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Alata&family=Bai+Jamjuree:wght@400;600&family=Great+Vibes&family=Josefin+Sans:wght@300&family=Oleo+Script+Swash+Caps&family=Oxygen&family=Oxygen+Mono&family=Poppins:wght@400;500;700&family=Rubik:ital,wght@0,400;0,700;0,900;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
