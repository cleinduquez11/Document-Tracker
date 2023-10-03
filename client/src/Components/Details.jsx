import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getAllDocuments } from "../Querries/querries";
import { Paper } from "@mui/material";
import { FileCopy } from "@mui/icons-material";

const Details = () => {
  const [data, setData] = React.useState([]);

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
  }, []);

  return (
    <div>
      {data.length > 0 && (
        <Paper
          elevation={16}
          sx={{ width: "65%", overflow: "hidden", justifyContent: "center" }}
        >
          <Typography
            variant="h4"
            component="div"
            textAlign="start"
            p={2}
            bgcolor="#CCC7BF"
          >
            Details
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
                <ListItem
                  sx={{
                    "&:hover": {
                      background: "#CCC7BF",
                    },
                    "&:selected": {
                      background: "#CCC7BF",
                    },
                  }}
                  onClick={() => {
                    console.log(d._id);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FileCopy />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={d.docName}
                    // secondary={d.docDescription}
                  />
                </ListItem>
                <br />
              </>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default Details;
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
