import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Paper,
  Typography,
  Container,
  Box,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { adminUrl } from '../../../../apiLinks/apiLinks';
import { Token } from '@mui/icons-material';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const AdminLogin = () => {
    const Navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err,setErr] = useState(false)


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${adminUrl}logIn`,{email,password}).then((response)=>{
        if(response.data.token){
          localStorage.setItem('adminToken',response.data.token)
          response.data.status ? Navigate('/admin/home') : setErr(true)
        }else{
            setErr(true)
        }
    })
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url('./images/Banner.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'background.paper' : '#424242',
            p: 4,
          }}
        >
          <Avatar
            sx={{
              margin: (theme) => theme.spacing(1),
              bgcolor: (theme) => theme.palette.secondary.main,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {err && <p className='text-danger'>Invalid username or password</p>}
            {/* <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  onClick={() => navigate('/ForgotPassword')}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => navigate('/Register')}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid> */}
          </StyledForm>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
