import "../styles/globals.css";
import Head from "next/head";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </Head>
      <header className="navbar navbar-expand-lg text-white bg-dark">
        <div className="container-fluid" style={{ width: "85vw" }}>
          <Link href="/">
            <a className="navbar-brand">League Champions</a>
          </Link>
        </div>
      </header>
      <Component {...pageProps} />
      {process.env.VERCEL_ENV === 'production' ? <script data-ad-client="ca-pub-6071071126763143" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> : null }
    </>
  );
}

export default MyApp;
