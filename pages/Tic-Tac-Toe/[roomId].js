import Head from "next/head";
import Image from "next/image";

import classes from "../../styles/TicTacToe.module.css";
import { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/router";
// import { useNickname } from "../../context/nickname";
import { useMessage } from "../../hooks/messages-hook";
import Board from "../../components/TicTacToe/Board";
import GameLoad from "../../UI/GameLoad";
import GameMessage from "../../UI/UserMessage";
import Button from "../../UI/Button";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000", {
  withCredentials: true,
  transports: ["websocket"],
});

const PlayerX = "X";
const PlayerO = "O";

export default function TicTacToe(props) {
  const router = useRouter();
  const username = router.query.username;
  const [messageState, messageDispatch] = useMessage({
    msg: null,
    className: null,
  });

  //game in session state
  const [gameLaunched, setGameLaunched] = useState(false);
  //is player turn
  const [playerTurnState, setPlayerTurn] = useState(false);
  //is game over
  const [gameConclusionState, setGameConclusion] = useState(false);
  //game piece
  const [playersState, setPlayers] = useState({
    thisPlayer: { name: null, type: null },
    opponent: { name: null, type: null },
  });

  //updates board
  const updatePlayerBoard = (boardSquarePosition, value) => {
    const updatedBoard = { ...boardState };
    updatedBoard[boardSquarePosition.r][boardSquarePosition.c] = value;
    try {
      setboard(updatedBoard);
      return true;
    } catch {
      return false;
    }
  };

  const leaveRoom = () => {
    socket.emit("leaving room", props.roomNum);
  };

  //Begin game
  const gameLaunchedHandler = (gamestate) => {
    setGameLaunched(gamestate);
  };

  const [boardState, setboard] = useState({
    r1: { c1: null, c2: null, c3: null },
    r2: { c1: null, c2: null, c3: null },
    r3: { c1: null, c2: null, c3: null },
  });
  const endTurn = (boardSquarePosition, value) => {
    setPlayerTurn(false);
    const updatedBoardState = updatePlayerBoard(boardSquarePosition, value);
    if (updatedBoardState) {
      socket.emit("move made", {
        room: `${props.roomNum}`,
        updatedBoard: boardState,
        playerType: playersState.thisPlayer.type,
      });
    }
  };

  //when all players are present and game is ready to be played
  socket.on("players ready", (playersList) => {
    let gamePlayers = { ...playersState };
    //assign players roles
    playersList.map((player) => {
      if (player.id === socket.id) {
        gamePlayers.thisPlayer.name = player.name;
        gamePlayers.thisPlayer.type = player.type;
      } else {
        gamePlayers.opponent.name = player.name;
        gamePlayers.opponent.type = player.type;
      }
    });
    setPlayers(gamePlayers);
    if (gamePlayers.thisPlayer.type === PlayerX) {
      setPlayerTurn(true);
    }
    gameLaunchedHandler(true);
  });
  //player's turn to play
  socket.on("turn of player", (updatedBoard) => {
    setboard(updatedBoard);
    setPlayerTurn(true);
  });
  // player wins the game
  socket.on("win", (args) => {
    leaveRoom();
    setGameConclusion(true);
    messageDispatch({ type: "win", msg: args.message, className: "game-won" });
  });
  // player loses the game
  socket.on("lose", (args) => {
    setboard(args.updatedBoard);
    leaveRoom();
    setGameConclusion(true);
    messageDispatch({
      type: "lose",
      msg: args.message,
      className: "game-lost",
    });
  });

  //game ends in a tie
  socket.on("tie", (args) => {
    leaveRoom();
    messageDispatch({
      type: "tie",
      msg: args.message,
      className: "game-tied",
    });
    setGameConclusion(true);
  });
  //when other player quits, game is terminated
  socket.on("quit", (args) => {
    messageDispatch({
      type: "general",
      msg: args.message,
      className: "general",
    });
    setGameConclusion(true);
  });

  //player leaves room
  const playerQuit = () => {
    socket.emit("player quit", props.roomNum);
    messageDispatch({
      type: "general",
      msg: "Where to?",
      className: "general",
    });
    setGameConclusion(true);
  };
  //error message when game is full
  socket.on("room is full", () => {
    router.push({
      pathname: `/choose-room`,
      query: { name: username, userMessage: "Room is Full" },
    });
  });
  //error message
  socket.on("error", () => {
    leaveRoom();
    router.push({
      pathname: `/choose-room`,
      query: { name: username, userMessage: "Error Occured" },
    });
  });

  useEffect(() => {
    //sends request to join the room
    socket.emit("enter room", { room: `${props.roomNum}`, username });
    //when an error occures to a player, all others also must leave as well
    socket.on("disconnectAll", () => {
      leaveRoom();
      router.push({
        pathname: `/choose-room`,
        query: { name: username, userMessage: "Error Occured" },
        className: "generel",
      });
    });

    socket.on("message", (message) => {
      console.log(message);
    });
  }, []);

  let gameDisplay;

  if (gameLaunched) {
    gameDisplay = (
      <div className={`${classes["room"]}`}>
        <div className={`${classes["room-info-container"]}`}>
          <div className={`${classes["room-info-wrapper"]}`}>
            <div className={`${classes["room-info-header"]}`}>
              <h1>{props.roomNum}</h1>
            </div>
            <div className={`${classes["room-info-content"]}`}>
              <div>
                {`${playersState.thisPlayer.name}(${playersState.thisPlayer.type}): `}
                {playerTurnState ? <span>Your turn!</span> : ""}
              </div>
              <div>
                {`${playersState.opponent.name}(${playersState.opponent.type}): `}
                {!playerTurnState ? <span>Opponent&apos;s turn!</span> : ""}
              </div>
            </div>
          </div>
        </div>
        <Board
          playerType={playersState.thisPlayer.type}
          boardLayout={boardState}
          updateBoard={updatePlayerBoard}
          endTurn={endTurn}
          playerTurn={playerTurnState}
        />
      </div>
    );
  } else {
    gameDisplay = <GameLoad>Waiting for players....</GameLoad>;
  }

  return (
    <>
      <div className={`${classes["quit-btn-wrapper"]}`}>
        <Button
          click={() => {
            playerQuit();
          }}
          className="quit-btn"
        >
          Leave Game
        </Button>
      </div>
      {gameDisplay}
      {gameConclusionState ? (
        <GameMessage
          open
          className={messageState.className}
          messageHeader={messageState.msg}
        >
          <div className={`${classes["home-btn-modal-wrapper"]}`}>
            <Button
              click={() => {
                router.push({
                  pathname: `/choose-room`,
                  query: { name: username },
                });
              }}
              className="modal-btn"
            >
              Back to rooms
            </Button>
            <Button
              click={() => {
                router.push({
                  pathname: `/`,
                  query: { name: username },
                });
                // socket.emit("leavingRoom", props.roomNum);
              }}
              className="modal-btn"
            >
              Back to home
            </Button>
          </div>
        </GameMessage>
      ) : null}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { roomId: "Room1" } },
      { params: { roomId: "Room2" } },
      { params: { roomId: "Room3" } },
      { params: { roomId: "Room4" } },
    ],

    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const roomNum = params.roomId;
  return { props: { roomNum } };
}
