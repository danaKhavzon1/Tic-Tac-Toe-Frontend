import classes from "./BoardRow.module.css";
import BoardSquare from "./BoardSquare";
export default function BoardRow(props) {
  const BoardSquares = [];
  for (let i = 0; i < 3; i++) {
    BoardSquares.push(
      <BoardSquare
        squareValue={props.boardRowLayout[`c${i + 1}`]}
        key={`BoardSquare${i + 1}`}
        playerType={props.playerType}
        boardSquarePosition={{
          r: props.rowNum,
          c: `c${i + 1}`,
        }}
        updateBoard={props.updateBoard}
        endTurn = {props.endTurn}
        playerTurn = {props.playerTurn}
      ></BoardSquare>
    );
  }
  return (
    <div
      className={`${classes["board-row-wrapper"]} ${
        props.rowNum === 'r2' ? classes["middle-row"] : null
      }`}
    >
      <div className={`${classes["board-row"]}`} rownum={props.rowNum}>
        {BoardSquares}
      </div>
    </div>
  );
}
