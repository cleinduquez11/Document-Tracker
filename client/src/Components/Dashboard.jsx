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

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "position",
    label: "Position",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "company",
    label: "Company",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "sender",
    label: "Sender",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "receiver",
    label: "Receiver",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, position, company, sender, receiver) {
  return { name, position, company, sender, receiver };
}

const rows = [
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
  createData(
    "Mario",
    "Software Engineer",
    "Accenture",
    "mario@yahoo.com",
    "hr.accenture.com"
  ),
];

//This component is responsible for the rendering of the Tables.
export default function Dashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(({ id, format }) => {
                      const val = row[id];
                      return (
                        <TableCell key={id} align="center">
                          {format && typeof val === "number"
                            ? format(val)
                            : val}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
