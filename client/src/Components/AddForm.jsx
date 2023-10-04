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

const AddForm = ({ open, handleclose, formTitle, handleOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  const [fileValue, setFileValue] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const validatedData = validate(name, description, file);
    if (validatedData.Status) {
      let result = addDocuments(formdata(name, description, file, filename));
      result
        .then((res) => {
          handleclose();
          if (res) {
            if (res.Status == 400) {
              setTimeout(handleOpen(SlideTransition, res.Message, "error"));
            } else {
              setTimeout(handleOpen(SlideTransition, res.Message, "success"));
            }

            // console.log(res.Message);
          }

          setName("");
          setDescription("");
          setFileValue(null);
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
              sx={{
                width: "270px",
                overflow: "hidden",
                // paddingLeft: "20px",
                // paddingRight: "20px",
                marginTop: "20px ",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  padding: "3px",
                  // gap: "20px",
                  textAlign: "center",
                }}
              >
                {/* <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button> */}
                <form onSubmit={onSubmit}>
                  <TextField
                    // ref={name}
                    variant="outlined"
                    label="Document Name"
                    type="text"
                    name=""
                    id=""
                    value={name}
                    // placeholder={selectedDocument.docName}
                    onChange={(e) => {
                      e.preventDefault();
                      setName(e.target.value);
                    }}
                  />
                  <br />
                  <br />

                  <TextField
                    // ref={description}
                    variant="outlined"
                    label="Document Description"
                    type="text"
                    name=""
                    id=""
                    value={description}
                    // placeholder={selectedDocument.docDescription}
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
                      // ref={file}
                      id="file"
                      onChange={(e) => {
                        e.preventDefault();
                        setFile(e.target.files[0]);
                        setFilename(e.target.files[0].name);
                        setFileValue(e.target.value);
                      }}
                      type="file"
                    />
                  </Button>

                  <br />
                  <br />

                  <Input
                    component="label"
                    variant="contained"
                    type="submit"
                    // onClick={onSubmit}
                  >
                    Add document
                  </Input>
                </form>
              </Paper>
            </Box>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
              <Button style={{ color: "red" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button style={{ color: "green" }} onClick={handleClose}>
                Add
              </Button>
            </DialogActions> */}
      </Dialog>
    </>
  );
};

export default AddForm;
