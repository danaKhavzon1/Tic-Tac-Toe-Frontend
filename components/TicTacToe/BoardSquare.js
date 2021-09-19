import classes from "./BoardSquare.module.css";
export default function BoardSquare(props) {
  const PlayerSymbol =
    props.playerType === "X" ? "playerX-playing" : "playerO-playing";
  let SquareRole;
  if (props.squareValue === null) {
    SquareRole = (
      <div
        className={`${classes["player"]}  ${
          props.playerTurn ? classes[PlayerSymbol] : null
        }`}
      ></div>
    );
  }
  if (props.squareValue === "X") {
    SquareRole = (
      <div
        className={`${classes["player"]} ${classes["playerX-occupy"]}`}
      ></div>
    );
  }
  if (props.squareValue === "O") {
    SquareRole = (
      <div
        className={`${classes["player"]} ${classes["playerO-occupy"]}`}
      ></div>
    );
  }
  return (
    <div
      className={`${classes["board-square-wrapper"]} ${
        props.boardSquarePosition.c === "c2" ? classes["middle-square"] : null
      }`}
      onClick={() => {
        if (props.playerTurn && props.squareValue === null) {
          props.endTurn(props.boardSquarePosition, props.playerType);
        }
      }}
    >
      <div className={`${classes["board-square"]}`}>{SquareRole}</div>
    </div>
  );
}
