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
  Paper,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";
import styled from "@emotion/styled";
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

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    console.log(file);
    formData.append("uploaded", file);
    formData.append("fileName", filename);
    async function upload(formData) {
      try {
        const response = await fetch("http://localhost:5000/docs", {
          method: "POST",
          body: formData,
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNsZWluIiwicGFzc3dvcmQiOiIwNDI3IiwiaWF0IjoxNjk2MjEzMzk0fQ.yKSGJjca9NKcRSObKXIn7plWgGn7sbf2VzRnO2a-zgs",
          },
        });
        const result = await response.json();
        handleClose();

        if (result) {
          if (result.Status == 400) {
            setTimeout(handleOpen(SlideTransition, result.Message, "error"));
          } else {
            setTimeout(handleOpen(SlideTransition, result.Message, "success"));
          }
          console.log(result);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }

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
      upload(formData);
      setName("");
      setDescription("");
      setFileValue(null);
      setFile(null);
      setFilename("");
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
                      width: "300px",
                      overflow: "hidden",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      marginTop: "20px ",
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        padding: "20px",
                        gap: "20px",
                        textAlign: "center",
                      }}
                    >
                      {/* <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button> */}
                      <TextField
                        required
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
                        required
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
                          value={fileValue}
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

                      <Button
                        component="label"
                        variant="contained"
                        onClick={onSubmit}
                      >
                        Add document
                        <VisuallyHiddenInput />
                      </Button>
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
