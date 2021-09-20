import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMessage } from "../hooks/messages-hook";
import classes from "../styles/ChooseRoom.module.css";
import Button from "../UI/Button";
import RoomOptions from "../components/ChooseRoom/RoomOptions";
import UserMessage from "../UI/UserMessage";

import { useEffect, useState } from "react";

export default function ChooseRoom() {
  const router = useRouter();

  const [messageState, setMessage] = useState(false);
  const username = router.query.name;
  const userMessage = router.query.userMessage;

  useEffect(() => {
    if (userMessage) {
      setMessage(true);
    }
  }, []);
  return (
    <>
      <div className={`${classes["choose-room"]}`}>
        <div className={`${classes["nav-btn-wrapper"]}`}>
          <Button
            click={() => {
              router.push({
                pathname: "/choose-name",
                query: { name: username },
              });
            }}
            className="nav-btn"
          >
            Back
          </Button>
        </div>
        <div className={`${classes["choose-room-header-wrapper"]}`}>
          <h2 className={`${classes["choose-room-header"]}`}>Choose Room</h2>
        </div>
        <div className={`${classes["choose-rooms-container"]}`}>
          <div className={`${classes["choose-room-wrapper"]}`}>
            <div className={`${classes["choose-rooms"]}`}>
              <RoomOptions roomCount="4" username={username} />
            </div>
          </div>
        </div>
      </div>
      {messageState ? (
        <UserMessage
          open
          style={{ boxShadow: "0 0 5px black" }}
          messageHeader={userMessage}
        >
          <Button
            className="modal-btn"
            click={() => {
              setMessage(false);
            }}
          >
            Okay!
          </Button>
        </UserMessage>
      ) : null}
    </>
  );
}
