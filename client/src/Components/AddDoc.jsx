import React from "react";
import { Fade } from "@mui/material";
import { useState } from "react";

import Notification from "./Notification";

import AddForm from "./AddForm";

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
      <AddForm
        formTitle="Add document"
        open={open}
        handleclose={handleclose}
        handleOpen={handleOpen}
        handleClick={handleClick}
      />

      <Notification
        state={state}
        handleremove={handleRemove}
        handleclickopen={handleclickopen}
      />
    </>
  );
}
