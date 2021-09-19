import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { io } from "socket.io-client";

import classes from "../styles/LoadingPage.module.css";
export default function ChooseName() {
  return (
    <div className={`${classes["loading-game"]}`}>
      <div className={`${classes["loading-wrapper"]}`}>
        <h4 className={`${classes["loading"]}`}>Waiting for player......</h4>
      </div>
    </div>
  );
}
