import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Paper,
  Slide,
  TextField,
  Typography,
} from "@mui/material";

import styled from "@emotion/styled";
import { CloudUpload } from "@mui/icons-material";
import { addDocuments } from "../Querries/querries";
import { validate } from "../Utils/Validate";
import { formdata } from "../Utils/FormData";
import { useDispatch } from "react-redux";
import { refetch } from "../Provider/Refetch/refetchSlice";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddForm({ open, handleclose, formTitle, handleOpen }) {
  const dispatch = useDispatch();
  const token = localStorage?.getItem("token");
  const refresh = localStorage?.getItem("refreshtoken");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    console.log(name, description, file);
    const validatedData = validate(name, description, file);
    if (validatedData.Status) {
      let result = addDocuments(
        formdata(name, description, file, filename),
        token,
        refresh
      );

      result
        .then((res) => {
          handleclose();

          if (res) {
            if (res.Status == 400) {
              setTimeout(handleOpen(SlideTransition, res.Message, "error"));
            } else {
              dispatch(refetch());
              setTimeout(handleOpen(SlideTransition, res.Message, "success"));
            }
          }

          setName("");
          setDescription("");
          setFile(null);
          setFilename("");
        })
        .catch((e) => {
          setTimeout(handleOpen(SlideTransition, e, "error"));
        });
    } else {
      handleclose();
      setTimeout(handleOpen(SlideTransition, validatedData.Message, "error"));
    }
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
            // component="div"
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
              sx={{
                width: "270px",
                overflow: "hidden",

                marginTop: "20px ",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  padding: "3px",

                  textAlign: "center",
                }}
              >
                <form onSubmit={onSubmit}>
                  <TextField
                    variant="outlined"
                    label="Document Name"
                    type="text"
                    name=""
                    id=""
                    value={name}
                    onChange={(e) => {
                      e.preventDefault();
                      setName(e.target.value);
                    }}
                  />
                  <br />
                  <br />

                  <TextField
                    variant="outlined"
                    label="Document Description"
                    type="text"
                    name=""
                    id=""
                    value={description}
                    onChange={(e) => {
                      e.preventDefault();
                      setDescription(e.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <Box>{filename}</Box>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUpload />}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      id="file"
                      onChange={(e) => {
                        e.preventDefault();
                        setFile(e.target.files[0]);
                        setFilename(e.target.files[0].name);
                      }}
                      type="file"
                    />
                  </Button>

                  <br />
                  <br />

                  <Input component="label" variant="contained" type="submit">
                    Add document
                  </Input>
                </form>
              </Paper>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
