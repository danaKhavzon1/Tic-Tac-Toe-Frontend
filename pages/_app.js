import React, { useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/globals.css";
import PageLayout from "../components/PageLayout/PageLayout";

const cacheURL = [];

const handleLoadStyle = (url) => {
  if (cacheURL.includes(url)) {
    return;
  }

  const styleLinks = document.querySelectorAll(
    'link[href*="/_next/static/css/styles.chunk.css"]'
  );

  const timestamp = new Date().valueOf();

  [...styleLinks].map((link) => {
    if (link.rel === "stylesheet") {
      link.href = `/_next/static/css/styles.chunk.css?v=${timestamp}`;
      cacheURL.push(url);
    }
  });
};

function MyApp({ Component, pageProps }) {
  const { asPath, events } = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    events.on("routeChangeComplete", handleLoadStyle);

    return () => {
      events.off("routeChangeComplete", handleLoadStyle);
    };
  }, [asPath]);

  return (
    <>
      <PageLayout />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
