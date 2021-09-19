import classes from "./RoomOptions.module.css";
import RoomOption from "./RoomOption";

export default function RoomOptions(props) {
  const roomOptions = [];
  for (let i = 0; i < props.roomCount; i++) {
    const CostumeRoom = `Room${i + 1}`;
    roomOptions.push(
      <div key={`roomOp${i + 1}`}>
        <RoomOption
          Room={CostumeRoom}
          full={props.full ? props.full : false}
          username={props.username}
        />
      </div>
    );
  }
  return (
    <div className={`${classes["room-options-wrapper"]}`}>
      <div className={`${classes["room-options"]}`}>{roomOptions}</div>
    </div>
  );
}
 