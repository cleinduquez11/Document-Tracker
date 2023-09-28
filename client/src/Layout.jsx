import { Grid, Box, GlobalStyles } from "@mui/material";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/NavBar";

///This is the Component that is resposible for Layouting other Components in the DOM

//Use sx as inline Styling in the Widget Tree
const Layout = () => {
  return (
    <>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#EDEEEB" },
        }}
      />

      {/* This is the Navigation Bar of the App */}
      <Navbar />

      {/* You can use Grid to properly layout the Components in the app */}
      <Grid container justifyContent="center" textAlign="center" gap={2}>
        <Grid sm={1}>
          <Box
            mt={2}
            display={{ xs: "none", sm: "block" }}
            width="auto"
            height={300}
          ></Box>
        </Grid>

        <Grid xs={10} sm={7}>
          <Box height={500} width="auto" mt={6}>
            {/* This is the Dashboard of the application */}
            <Dashboard />
          </Box>
        </Grid>
        <Grid sm={2}>
          <Box
            display={{ xs: "none", sm: "block" }}
            height={500}
            width="auto"
            mt={6}
          ></Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
