import { Grid, Box, GlobalStyles } from "@mui/material";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/NavBar";
import AlignItemsList from "./Components/Sandbox";
import UsingFetch from "./Components/Sandbox";
import GetData from "./Components/Dashboard";
import Preview from "./Components/PreviewSandbox";
import Details from "./Components/Details";

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
        <Grid sm={3}>
          <Box
            height={500}
            mt={6}
            display={{ xs: "none", sm: "block" }}
            width="auto"
          >
            {" "}
            {/* <UsingFetch /> */}
          </Box>
        </Grid>

        <Grid xs={10} sm={7}>
          <Box height={500} width="auto" mt={6}>
            {/* This is the Dashboard of the application */}
            {/* <Preview /> */}
            <UsingFetch />
          </Box>
        </Grid>
        <Grid sm={2}>
          <Box
            display={{ xs: "none", sm: "block" }}
            height={500}
            width="auto"
            mt={6}
          >
            {/* <Details /> */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
