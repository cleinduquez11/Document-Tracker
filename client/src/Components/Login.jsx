import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import login_sidebg from '../Assets/login_sidebg.svg';
import { loginformdata } from '../Utils/FormData';
import { login } from '../Querries/querries';
import {useNavigate} from "react-router-dom"
const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate(); 
const [user, setUser ] = React.useState("");

const [pass, setPass ] = React.useState("");




  const handleSubmit = (event) => {
    event.preventDefault();
    let result = login(user,pass);
    
    // const data = new FormData(user,pass);
    // console.log({
    //   email: user,
    //   password: pass,
    // });
    result.then((res)=> {
      console.log(res);
      if (res.uSer) {
        navigate('/home');
      }
     
      
    })


  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={100}
          sm={100}
          md={100}
          sx={{
            backgroundImage: `url(${login_sidebg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'relative',
            height: '100%'
          }}
        >
          {/* Empty div for content spacing */}
          <div style={{ width: '5%', height: '100%' }} />
        </Grid>
        <Grid item  component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute', // Position absolute to float on the right
              top: '10%',
              right: '5%', 
              height: 'auto',
              backgroundColor: 'rgba(255,182,193, 1)', // Semi-transparent ? background
              padding: '50px',
              borderRadius: '10px',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'red' }}>
              <LockOutlinedIcon />
            </Avatar>
            <form noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                // name="email"
                autoComplete="email"
                autoFocus
                onChange ={(e)=> {
                  setUser(e.target.value)
                    console.log(e.target.value)
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                // name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange ={(e)=> {
                  setPass(e.target.value)
                  console.log(e.target.value)
              }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'blue' }}
              >
                Log In
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
