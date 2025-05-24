// pages/_app.js or pages/_app.tsx
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for address bar */}
        <meta name="theme-color" content="#ffffff" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* Mobile web app capable (for iOS) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Your App Name" />

        {/* Android Chrome */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Your App Name" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
