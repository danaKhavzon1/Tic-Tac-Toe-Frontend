import classes from "./Button.module.css";
export default function Button(props) {
  return (
    <div className={classes[props.className]}>
      <button
        onClick={
          props.click
            ? (event) => {
                event.preventDefault()
                props.click();
              }
            : null
        }
      >
        {props.children}
      </button>
    </div>
  );
}
