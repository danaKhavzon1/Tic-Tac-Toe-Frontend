import "../styles/globals.css";
import PageLayout from "../components/PageLayout/PageLayout";
function MyApp({ Component, pageProps }) {
  return (
    <>
        <PageLayout />
        <Component {...pageProps} />
    </>
  );
}

export default MyApp;
