import classes from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../UI/Button";
export default function Home() {
  const router = useRouter();
  const username = router.query.name;
  return (
    <div className={`${classes["Home"]}`}>
      <div className={`${classes["home-welcome-wrapper"]}`}>
        <h2 className={`${classes["home-welcome"]}`}>
          Welcome to Tic Tac Toe!
        </h2>
      </div>
      <div className={`${classes["begin-game-btn-wrapper"]}`}>
        <Button
          click={() => {
            router.push({
              pathname: `/choose-name`,
              query: username ? { name: username } : null,
            });
          }}
          className = "begin-game-btn"
        >
          Click to Play
        </Button>
      </div>
    </div>
  );
}
