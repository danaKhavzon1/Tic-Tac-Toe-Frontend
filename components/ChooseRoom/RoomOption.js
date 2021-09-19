import classes from "./RoomOption.module.css";
import { useRouter } from "next/router";
export default function RoomOption(props) {
  const router = useRouter();

  return (
    <div
      className={`${classes["room-option-wrapper"]} ${
        props.full ? classes["full"] : null
      }`}
      onClick={() => {
        props.full
          ? null
          : router.push({
              pathname: `/Tic-Tac-Toe/${props.Room}`,
              query: { username: props.username },
            });
      }}
    >
      <div className={`${classes["room-option"]}`}>{props.Room}</div>
    </div>
  );
}
