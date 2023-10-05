import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  deleteDocuments,
  getAllDocuments,
  viewDocuments,
} from "../Querries/querries";
import {
  Alert,
  Box,
  Fade,
  IconButton,
  Paper,
  Slide,
  Snackbar,
} from "@mui/material";
import { Delete, Edit, FileCopy } from "@mui/icons-material";
import Update from "./UpdateDoc";
import { deleteformdata } from "../Utils/FormData";
import Notification from "./Notification";

// function UpdateDoc() {
//   return (
//     <>
//       <Update />
//     </>
//   );
// }
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const UsingFetch = () => {
  const [state, setState] = React.useState({
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItem = () => {};

  const [data, setData] = React.useState([]);
  const [clicked, setClicked] = React.useState(false);
  const [item, setItem] = React.useState({});

  const fetchData = () => {
    fetch("http://localhost:5000/docs", {
      method: "GET",
      // body: formData,
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNsZWluIiwicGFzc3dvcmQiOiIwNDI3IiwiaWF0IjoxNjk2MjEzMzk0fQ.yKSGJjca9NKcRSObKXIn7plWgGn7sbf2VzRnO2a-zgs",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  };

  React.useEffect(() => {
    fetchData();
  });

  return (
    <>
      {data.length > 0 && (
        <Paper
          elevation={16}
          sx={{ width: "100%", overflow: "hidden", justifyContent: "center" }}
        >
          <Typography
            variant="h4"
            component="div"
            textAlign="start"
            p={2}
            bgcolor="#CCC7BF"
          >
            Documents
          </Typography>
          <List
            sx={{
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            {data.map((d) => (
              <>
                <Box
                  sx={{
                    "&:hover": {
                      background: "#CCC7BF",
                    },
                  }}
                >
                  <ListItem
                    onDoubleClick={() => {}}
                    // onClick={handleClickOpen}
                    secondaryAction={
                      <>
                        <IconButton
                          key={d._id}
                          onClick={() => {
                            handleClickOpen();
                            setItem(d);
                          }}
                          edge="end"
                          aria-label="Edit"
                        >
                          <Edit
                            sx={{
                              "&:hover": {
                                color: "blue",
                              },
                            }}
                          />
                        </IconButton>
                        &#160; &#160; &#160;
                        <IconButton
                          onClick={() => {
                            console.log(d._id);
                            let result = deleteDocuments(d._id);
                            result
                              .then((res) => {
                                if (res) {
                                  if (res.Status == 400) {
                                    setTimeout(
                                      handleOpen(
                                        SlideTransition,
                                        res.Message,
                                        "error"
                                      )
                                    );
                                  } else {
                                    setTimeout(
                                      handleOpen(
                                        SlideTransition,
                                        res.Message,
                                        "success"
                                      )
                                    );
                                  }

                                  // console.log(res.Message);
                                }
                              })
                              .catch((e) => {
                                setTimeout(
                                  handleOpen(SlideTransition, e, "error")
                                );
                              });
                          }}
                          edge="end"
                          aria-label="Edit"
                        >
                          <Delete
                            sx={{
                              "&:hover": {
                                color: "red",
                              },
                            }}
                          />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FileCopy />
                      </Avatar>
                    </ListItemAvatar>

                    <Box
                      onClick={() => {
                        let result = viewDocuments(d._id);

                        result.then((res) => {
                          window.open(res.FileLink);
                        });
                        console.log(d._id);
                      }}
                      sx={{
                        width: "85%",
                      }}
                    >
                      {" "}
                      <ListItemText
                        primary={d.docName}
                        // secondary={d.docDescription}
                      />
                    </Box>
                  </ListItem>
                </Box>

                <br />
              </>
            ))}
          </List>
        </Paper>
      )}

      <Update
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        formTitle="Edit"
        item={item}
      />

      <Snackbar
        open={state.open}
        onClose={handleRemove}
        autoHideDuration={6000}
        severity={state.status}
        TransitionComponent={state.Transition}
        message={state.message}
        key={state.Transition.name}
        // onClick={handleclickopen}
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
};

export default UsingFetch;
{
  /* <ListItem
secondaryAction={
  <IconButton edge="end" aria-label="delete">
    <DeleteIcon />
  </IconButton>
}
> */
}

{
  /* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
<ListItem>
  <ListItemAvatar>
    <Avatar>
      <ImageIcon />
    </Avatar>
  </ListItemAvatar>
  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
</ListItem>
<ListItem>
  <ListItemAvatar>
    <Avatar>
      <WorkIcon />
    </Avatar>
  </ListItemAvatar>
  <ListItemText primary="Work" secondary="Jan 7, 2014" />
</ListItem>
<ListItem>
  <ListItemAvatar>
    <Avatar>
      <BeachAccessIcon />
    </Avatar>
  </ListItemAvatar>
  <ListItemText primary="Vacation" secondary="July 20, 2014" />
</ListItem>
</List> */
}
