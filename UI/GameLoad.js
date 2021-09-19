
import classes from "./GameLoad.module.css";
export default function GameLoad() {
  return (
      <div className={`${classes["loading-wrapper"]}`}>
        <h2 className={`${classes["loading-game"]}`}>Waiting for player......</h2>
      </div>
  );
}
