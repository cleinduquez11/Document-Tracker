import React from "react";
import { Fade } from "@mui/material";
import { useState } from "react";

import Notification from "./Notification";

import AddForm from "./AddForm";

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function AddDoc({
  open,
  handleclose,
  handleclickopen,
  handleClick,
}) {
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  const handleOpen = (Transition, message, status) => () => {
    setState({
      open: true,
      Transition,
      message,
      status,
    });
  };

  const handleRemove = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <>
      {/* Form */}
      <AddForm
        formTitle="Add document"
        open={open}
        handleclose={handleclose}
        handleOpen={handleOpen}
        handleClick={handleClick}
      />
      {/* Notifications */}
      <Notification
        state={state}
        handleremove={handleRemove}
        handleclickopen={handleclickopen}
      />
    </>
  );
}
