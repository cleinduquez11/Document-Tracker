import { Button, Paper, TextField, styled } from "@mui/material";
import React from "react";
import { CloudUpload } from "@mui/icons-material";

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

export default function AddDocument() {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          padding: "20px",
          gap: "20px",
          textAlign: "center",
        }}
      >
        <TextField
          required
          variant="outlined"
          label="Document Name"
          type="text"
          name=""
          id=""
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
        />
        <br />
        <br />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
        >
          Upload file
          <VisuallyHiddenInput
            onChange={(e) => {
              console.log(e.target.value);
            }}
            type="file"
          />
        </Button>
      </Paper>
    </>
  );
}
