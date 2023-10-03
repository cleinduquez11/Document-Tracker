import * as React from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { getAllDocuments } from "../Querries/querries";

const columns = [
  {
    id: "docName",
    label: "Name",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "docDescription",
    label: "Description",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "fileName",
    label: "File",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  // {
  //   id: "createdAt",
  //   label: "Created At",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  // {
  //   id: "updatedAt",
  //   label: "Updated At",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
];

function createData(Name, Description, File, created_at, updated_at) {
  return { Name, Description, File, created_at, updated_at };
}

// const rows = [
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
//   createData(
//     "Mario",
//     "Software Engineer",
//     "Accenture",
//     "mario@yahoo.com",
//     "hr.accenture.com"
//   ),
// ];

//This component is responsible for the rendering of the Tables.

const GetData = () => {
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
    <>
      {data.length > 0 &&
        data.map((row) => {
          <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
            <TableCell key={row.docName} align="center">
              {row.docName}
              {/* {row.docName} */}
              {/* {format && typeof val === "number"
                        ? format(val)
                        : row[id]} */}
            </TableCell>
            <TableCell key={row.docDesciption} align="center">
              {row.docDesciption}
              {/* {row.docName} */}
              {/* {format && typeof val === "number"
                        ? format(val)
                        : row[id]} */}
            </TableCell>
            <TableCell key={row.filename} align="center">
              {row.filename}
              {/* {row.docName} */}
              {/* {format && typeof val === "number"
                        ? format(val)
                        : row[id]} */}
            </TableCell>
          </TableRow>;
        })}
    </>
  );
};

// export default GetData;

export default function Dashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const rows = [];

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // console.log({ Rows: rows });
  return (
    <Paper elevation={16} sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        variant="h4"
        component="div"
        textAlign="start"
        p={2}
        bgcolor="#CCC7BF"
      >
        Document Tracker
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(({ id, label }) => (
                <TableCell
                  key={id}
                  align="center"
                  style={{
                    minWidth: { xs: 75, sm: 170 },
                    background: "#CCC7BF",
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    fontSize={18}
                    variant="h7"
                    component="p"
                  >
                    {label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <GetData />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{
          background: "#CCC7BF",
        }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
