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
import AddDoc from "./AddDoc";
import AccountMenu from "./Menu";

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
export default function Navbar({ handleClick }) {
  //state for opening the Add Document Modal
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //end

  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [file, setFile] = useState("");
  // const [filename, setFilename] = useState("");
  // const [fileValue, setFileValue] = useState("");

  // // const name = useRef(null);
  // // const description = useRef(null);
  // // const file = useRef(null);
  // // const filename = useRef(null);
  // // const fileValue = useRef(null);

  // function onSubmit(e) {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("Name", name);
  //   formData.append("Description", description);
  //   // console.log(name);
  //   formData.append("uploaded", file);
  //   formData.append("fileName", filename);

  //   if (!name || !description || !file) {
  //     setTimeout(
  //       handleOpen(
  //         SlideTransition,
  //         `${!name ? "Name," : ""}${!description ? "Description," : ""}${
  //           !file ? "File" : ""
  //         } field(s) need to have a value `,
  //         "error"
  //       )
  //     );
  //   } else {
  //     let result = addDocuments(formData);
  //     // console.log(result);
  //     result
  //       .then((res) => {
  //         handleClose();
  //         if (res) {
  //           if (res.Status == 400) {
  //             setTimeout(handleOpen(SlideTransition, res.Message, "error"));
  //           } else {
  //             setTimeout(handleOpen(SlideTransition, res.Message, "success"));
  //           }
  //           // console.log(res.Message);
  //         }

  //         setName("");
  //         setDescription("");
  //         setFileValue(null);
  //         setFile(null);
  //         setFilename("");
  //       })
  //       .catch((e) => {
  //         setTimeout(handleOpen(SlideTransition, e, "error"));
  //       });
  //   }
  // }

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
              <AccountMenu />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "white",
              }}
            >
              Document Manager
            </Typography>

            <IconButton onClick={handleClickOpen} color="inherit">
              <Box
                display={{
                  xs: "block",
                  sm: "none",
                }}
              >
                <Add sx={{ color: "white" }} />
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
                  color: "white",
                }}
              >
                Add Document
              </Typography>
            </IconButton>
            <AddDoc
              open={open}
              handleclose={handleClose}
              handleclickopen={handleClickOpen}
              handleClick={handleClick}
            />
          </Toolbar>
        </AppBar>
      </Box>

      {/* Notifications  */}
    </>
  );
}
