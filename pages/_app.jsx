import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/isotipo.png" />
      </Head>

      <Header />

      <Component {...pageProps} />
      {process.env.VERCEL_ENV === 'production' ? <script data-ad-client="ca-pub-6071071126763143" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> : null}
    </>
  );
}

export default MyApp;
