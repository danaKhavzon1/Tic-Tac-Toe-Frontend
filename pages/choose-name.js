import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "../styles/ChooseName.module.css";
import { useEffect, useState } from "react";

import Button from "../UI/Button";

export default function ChooseName() {
  const router = useRouter();
  const username = router.query.name;
  const [nameState, setName] = useState(username);

  const startGame = () => {
    router.push({
      pathname: "/choose-room",
      query: { name: nameState },
    });
  };
  const setNameHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <div className={`${classes["choose-name"]}`}>
      <div className={`${classes["nav-btn-wrapper"]}`}>
        <Button
          click={() => {
            router.push({
              pathname: "/",
            });
          }}
          className="nav-btn"
        >
          Back
        </Button>
      </div>
      <div className={`${classes["choose-nickname-wrapper"]}`}>
        <h2 className={`${classes["choose-nickname"]}`}>Enter Nickname</h2>
      </div>
      <div className={`${classes["enter-nickname-input"]}`}>
        <input
          placeholder="Player..."
          type="text"
          value={nameState ? nameState : ""}
          onChange={(event) => {
            setNameHandler(event);
          }}
        />
      </div>
      <div className={`${classes["begin-game-btn-wrapper"]}`}>
        <Button
          click={() => {
           
            startGame(nameState);
          }}
          className="begin-game-btn"
        >
          Begin Match!
        </Button>
      </div>
    </div>
  );
}
