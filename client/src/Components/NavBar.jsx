import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import AddDoc from "./AddDoc";
import AccountMenu from "./Menu";

export default function Navbar({ handleClick }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    </>
  );
}
