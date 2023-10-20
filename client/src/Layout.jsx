import { Grid, Box, GlobalStyles } from "@mui/material";
import Navbar from "./Components/NavBar";
import login_sidebg from "./Assets/login_sidebg.svg";
import Sandbox from "./Components/Sandbox";

export default function Layout() {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            backgroundImage: `url(${login_sidebg})`,
            overflow: "hidden",
          },
        }}
      />

      <Navbar />

      <Grid container justifyContent="center" textAlign="center" gap={2}>
        <Grid sm={5}>
          <Box
            height={500}
            mt={6}
            display={{ xs: "none", sm: "block" }}
            width="auto"
          >
            {" "}
          </Box>
        </Grid>

        <Grid xs={10} sm={4}>
          <Box height={500} width="auto" mt={6}>
            <Sandbox />
          </Box>
        </Grid>
        <Grid sm={1}>
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
}
