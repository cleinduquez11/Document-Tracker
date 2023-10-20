import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slide,
  TextField,
  Typography,
} from "@mui/material";

import { updateDocuments } from "../Querries/querries";
import { useDispatch } from "react-redux";
import { refetch } from "../Provider/Refetch/refetchSlice";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function UpdateForm({
  open,
  handleclose,
  formTitle,
  handleOpen,
  item,
}) {
  const token = localStorage?.getItem("token");
  const refresh = localStorage?.getItem("refreshtoken");
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    updateDocuments(item._id, name, description, token, refresh)
      .then((res) => {
        handleclose();
        if (res) {
          if (res.Status == 400) {
            setTimeout(handleOpen(SlideTransition, res.Message, "error"));
          } else {
            setTimeout(handleOpen(SlideTransition, res.Message, "success"));
            dispatch(refetch());
          }
        }

        setName("");
        setDescription("");
      })
      .catch((e) => {
        setTimeout(handleOpen(SlideTransition, e, "error"));
      });
  }

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={SlideTransition}
        keepMounted
        onClose={handleclose}
        aria-describedby="alert-dialog-slide-description"
        color="inherit"
      >
        <DialogTitle>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
            }}
          >
            {formTitle}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box
              component="form"
              noValidate
              sx={{
                width: "270px",
                overflow: "hidden",
                marginTop: "40px ",
              }}
            >
              <Paper
                elevation={0}
                component="form"
                sx={{
                  padding: "20px",

                  textAlign: "center",
                }}
              >
                <TextField
                  variant="outlined"
                  label={"Document Name"}
                  type="text"
                  name=""
                  id=""
                  value={name}
                  placeholder={item.docName}
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                />
                <br />
                <br />

                <TextField
                  variant="outlined"
                  label={"Document Description"}
                  type="text"
                  name=""
                  id=""
                  value={description}
                  placeholder={item.docDescription}
                  onChange={(e) => {
                    e.preventDefault();
                    setDescription(e.target.value);
                  }}
                />
                <br />
                <br />

                <Button
                  component="label"
                  variant="contained"
                  onClick={onSubmit}
                >
                  Update
                </Button>
              </Paper>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
