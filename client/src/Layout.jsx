import { Grid, Box, GlobalStyles } from "@mui/material";

import Navbar from "./Components/NavBar";

import UsingFetch from "./Components/Sandbox";
import login_sidebg from "./Assets/login_sidebg.svg";
import CircularColor from "./Components/Loader";
import { useEffect, useState } from "react";
///This is the Component that is resposible for Layouting other Components in the DOM

//Use sx as inline Styling in the Widget Tree
const Layout = () => {
  const [clicked, setClicked] = useState(0);

  //   the useEffect will run on the first rendering of the App component
  //   after two seconds (about how long it takes for the data to load)
  //   the loaded state will become true
  // useEffect(() => {
  //   let timer = setTimeout(() => setLoaded(true), 500);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  // !loaded ? (
  //   <CircularColor />
  // ) :

  const handleClick = () => {
    setClicked((prev) => {
      prev + 1;
    });
    // window.location.reload();
  };
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            // backgroundColor: "#EDEEEB",
            backgroundImage: `url(${login_sidebg})`,
            overflow: "hidden",
          },
        }}
      />

      {/* This is the Navigation Bar of the App */}
      <Navbar handleClick={handleClick} />

      {/* You can use Grid to properly layout the Components in the app */}
      <Grid container justifyContent="center" textAlign="center" gap={2}>
        <Grid sm={5}>
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

        <Grid xs={10} sm={4}>
          <Box height={500} width="auto" mt={6}>
            {/* This is the Dashboard of the application */}
            {/* <Preview /> */}
            <UsingFetch clicked={clicked} />
          </Box>
        </Grid>
        <Grid sm={1}>
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
