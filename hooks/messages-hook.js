import { useReducer, useState } from "react";
const messageReducer = (state, action) => {
  if (action.type === "lose") {
    return { msg: action.msg, className: action.className };
  }
  if (action.type === "win") {
    return { msg: action.msg, className: action.className };
  }
  if (action.type === "tie") {
    return { msg: action.msg, className: action.className };
  }
  if (action.type === "general") {
    return { msg: action.msg, className: action.className };
  }
};
export function useMessage(props) {
  const [messageState, messageDispatch] = useReducer(messageReducer, {
    msg: props.msg,
    className: props.className,
  });
  return [messageState, messageDispatch];
}
