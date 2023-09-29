import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";
import AddDocument from "./AddDocument";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
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
                  <AddDocument />
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button style={{ color: "red" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button style={{ color: "green" }} onClick={handleClose}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
