import classes from "./UserMessage.module.css";
import ClientOnlyPortal from "../client-only-portal/client-only-portal";
export default function UserMessage(props) {
  return (
    <>
      {props.open && (
        <ClientOnlyPortal selector="#userMessage">
          <div className={`${classes["message-wrapper"]}`}>
            <div
              style={props.style ? props.style : null}
              className={`${classes["message"]} ${classes[props.className]}`}
            >
              <h2>{props.messageHeader}</h2>
              <div className={`${classes["message-content"]}`}>
                {props.children}
              </div>
            </div>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  );
}
