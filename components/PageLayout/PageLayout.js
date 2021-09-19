import Head from "next/head";
import classes from "./PageLayout.module.css";
import PageHeader from "../PageHeader/PageHeader";
export default function PageLayout() {
  return (
    <div>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <PageHeader />
      <div className={`${classes["page-header-filler"]}`}></div>
    </div>
  );
}
