import { useState } from "react";
import UpdateForm from "./UpdateForm";
import Notification from "./Notification";
import { Fade } from "@mui/material";

const Update = ({ open, handleClose, formTitle, handleClickOpen, item }) => {
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
  // console.log(item);
  return (
    <>
      <UpdateForm
        open={open}
        handleclose={handleClose}
        formTitle={formTitle}
        handleOpen={handleOpen}
        item={item}
      />

      <Notification
        state={state}
        handleremove={handleRemove}
        handleclickopen={handleClickOpen}
      />
    </>
  );
};

export default Update;
