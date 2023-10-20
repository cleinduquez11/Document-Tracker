import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {
  deleteDocuments,
  findDocument,
  getAllDocuments,
  viewDocuments,
} from "../Querries/querries";
import {
  Alert,
  Box,
  Fade,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Slide,
  Snackbar,
  Stack,
  alpha,
  styled,
} from "@mui/material";
import { Delete, Edit, FileCopy, SearchOff } from "@mui/icons-material";
import Update from "./UpdateDoc";
import { useDispatch, useSelector } from "react-redux";
import { refetch } from "../Provider/Refetch/refetchSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function Sandbox() {
  const token = localStorage?.getItem("token");
  const refresh = localStorage?.getItem("refreshtoken");
  const [data, setData] = React.useState([]);
  const [docs, setDocs] = React.useState("");
  const [item, setItem] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [recordsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const toggled = useSelector((state) => state.refetch.refetch);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    getAllDocuments(token, refresh).then((data) => {
      setData(data);
    });
  };

  React.useEffect(() => {
    fetchData();
  }, [toggled]);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(data.length / recordsPerPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const searchData = (search) => {
    findDocument(search, token, refresh).then((docs) => {
      setDocs(docs);
    });
  };

  const viewDoc = async (id) => {
    let { FileLink } = await viewDocuments(id, token, refresh);
    if (FileLink) {
      window.open(FileLink);
    }
  };

  const deleteDoc = async (id) => {
    let { Status, Message } = await deleteDocuments(id, token, refresh);

    if (Status && Message) {
      if (Status == 400) {
        setTimeout(handleOpen(SlideTransition, Message, "error"));
      } else {
        setTimeout(handleOpen(SlideTransition, Message, "success"));
        dispatch(refetch());
      }
    } else {
      setTimeout(handleOpen(SlideTransition, Message, "error"));
    }
  };

  return (
    <>
      <Paper
        elevation={24}
        sx={{
          bgcolor: "inherit",
          width: "100%",
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        <Stack>
          <Typography
            variant="h4"
            component="div"
            textAlign="start"
            p={2}
            color="white"
          >
            Documents
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => {
                searchData(e.target.value);
              }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <List
            sx={{
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              color: "white",
            }}
          >
            {docs == ""
              ? data?.slice(indexOfFirstRecord, indexOfLastRecord).map((d) => (
                  <>
                    <Box
                      sx={{
                        "&:hover": {
                          background: "#CCC7BF",
                        },
                      }}
                    >
                      <ListItem
                        sx={{
                          bgcolor: "inherit",
                          color: "white",
                        }}
                        key={d._id.toString()}
                        secondaryAction={
                          <>
                            <IconButton
                              onClick={() => {
                                setItem(d);
                                console.log(d);
                                handleClickOpen();
                              }}
                              edge="end"
                              aria-label="Edit"
                            >
                              <Edit
                                sx={{
                                  "&:hover": {
                                    color: "blue",
                                  },
                                  color: "white",
                                }}
                              />
                            </IconButton>
                            &#160; &#160; &#160;
                            <IconButton
                              onClick={() => {
                                deleteDoc(d._id);
                              }}
                              edge="end"
                              aria-label="Edit"
                            >
                              <Delete
                                sx={{
                                  "&:hover": {
                                    color: "red",
                                  },
                                  color: "white",
                                }}
                              />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemAvatar key={d._id}>
                          <Avatar>
                            <FileCopy />
                          </Avatar>
                        </ListItemAvatar>

                        <Box
                          onClick={() => viewDoc(d._id)}
                          sx={{
                            width: "85%",
                          }}
                        >
                          {" "}
                          <ListItemText primary={d.docName} />
                        </Box>
                      </ListItem>
                    </Box>

                    <br />
                  </>
                ))
              : docs?.slice(indexOfFirstRecord, indexOfLastRecord).map((d) => (
                  <>
                    <Box
                      sx={{
                        "&:hover": {
                          background: "#CCC7BF",
                        },
                      }}
                    >
                      <ListItem
                        sx={{
                          bgcolor: "inherit",
                          color: "white",
                        }}
                        key={d._id.toString()}
                        secondaryAction={
                          <>
                            <IconButton
                              onClick={() => {
                                setItem(d);
                                handleClickOpen();
                              }}
                              edge="end"
                              aria-label="Edit"
                            >
                              <Edit
                                sx={{
                                  "&:hover": {
                                    color: "blue",
                                  },
                                  color: "white",
                                }}
                              />
                            </IconButton>
                            &#160; &#160; &#160;
                            <IconButton
                              onClick={() => {
                                deleteDoc(d._id);
                              }}
                              edge="end"
                              aria-label="Edit"
                            >
                              <Delete
                                sx={{
                                  "&:hover": {
                                    color: "red",
                                  },
                                  color: "white",
                                }}
                              />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemAvatar key={d._id}>
                          <Avatar>
                            <FileCopy />
                          </Avatar>
                        </ListItemAvatar>

                        <Box
                          onClick={() => {
                            viewDoc(d._id);
                          }}
                          sx={{
                            width: "85%",
                          }}
                        >
                          {" "}
                          <ListItemText primary={d.docName} />
                        </Box>
                      </ListItem>
                    </Box>

                    <br />
                  </>
                ))}
          </List>

          <Pagination
            size="small"
            style={{
              paddingTop: "3px",

              background: "#f2f2f2",
              color: "white",
            }}
            count={nPages}
            onChange={handleChange}
            currentpage={currentPage}
          />
        </Stack>
      </Paper>

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
