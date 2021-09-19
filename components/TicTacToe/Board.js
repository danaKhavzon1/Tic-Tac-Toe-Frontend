import classes from "./Board.module.css";
import BoardRow from "./BoardRow";

import styled from "styled-components";
import { getStaticProps } from "../../pages/Tic-Tac-Toe/[roomId]";

const Row = `max-height: 240px;
width: 100%;`;
const MiddleRow = ``;

export default function Board(props) {
  const BoardRows = [];
  for (let i = 0; i < 3; i++) {
    BoardRows.push(
      <BoardRow
        rowNum={`r${i + 1}`}
        key={`BoardRow${i + 1}`}
        playerType={props.playerType}
        boardRowLayout={props.boardLayout[`r${i + 1}`]}
        updateBoard={props.updateBoard}
        endTurn = {props.endTurn}
        playerTurn = {props.playerTurn}
      ></BoardRow>
    );
  }

  return (
    <div className={`${classes["Board-Container"]}`}>
      <div className={`${classes["Board-Wrapper"]}`}>
        <div className={`${classes["Board"]}`}>{BoardRows}</div>
      </div>
    </div>
  );
}
