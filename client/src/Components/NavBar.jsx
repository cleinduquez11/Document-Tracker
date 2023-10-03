import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Add, CloudUpload } from "@mui/icons-material";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Input,
  Paper,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { forwardRef, useRef, useState } from "react";
import styled from "@emotion/styled";
import { addDocuments, getAllDocuments } from "../Querries/querries";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  const [fileValue, setFileValue] = useState("");

  // const name = useRef(null);
  // const description = useRef(null);
  // const file = useRef(null);
  // const filename = useRef(null);
  // const fileValue = useRef(null);

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    // console.log(name);
    formData.append("uploaded", file);
    formData.append("fileName", filename);

    if (!name || !description || !file) {
      setTimeout(
        handleOpen(
          SlideTransition,
          `${!name ? "Name," : ""}${!description ? "Description," : ""}${
            !file ? "File" : ""
          } field(s) need to have a value `,
          "error"
        )
      );
    } else {
      let result = addDocuments(formData);
      // console.log(result);
      result
        .then((res) => {
          handleClose();
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
    }
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar
          position="sticky"
          color="transparent"
          mar
          sx={{
            borderRadius: 20,
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              // onClick={getAllDocuments}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "black",
              }}
            >
              Document Tracker
            </Typography>

            <IconButton onClick={handleClickOpen} color="inherit">
              <Box
                display={{
                  xs: "block",
                  sm: "none",
                }}
              >
                <Add />
              </Box>

              <Typography
                variant="h6"
                component="div"
                display={{
                  xs: "none",
                  sm: "block",
                }}
                sx={{
                  flexGrow: 1,
                  color: "black",
                }}
              >
                Add Document
              </Typography>
            </IconButton>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
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
                  Add Document
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
          </Toolbar>
        </AppBar>
      </Box>

      {/* Notifications  */}
      <Snackbar
        open={state.open}
        onClose={handleRemove}
        autoHideDuration={6000}
        severity={state.status}
        TransitionComponent={state.Transition}
        message={state.message}
        key={state.Transition.name}
      >
        <Alert
          onClose={handleRemove}
          severity={state.status}
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </>
  );
}
