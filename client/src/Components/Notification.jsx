import { Alert, Snackbar } from "@mui/material";

const Notification = ({ state, handleremove, handleclickopen }) => {
  return (
    <>
      <Snackbar
        open={state.open}
        onClose={handleremove}
        autoHideDuration={6000}
        severity={state.status}
        TransitionComponent={state.Transition}
        message={state.message}
        key={state.Transition.name}
        onClick={handleclickopen}
      >
        <Alert
          onClose={handleremove}
          severity={state.status}
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notification;
