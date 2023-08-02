import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Bg from '../assets/images/login.jpg';
import OutLayout from '../layouts/OutLayout';
import PhotoPageLayout from '../layouts/PhotoPageLayout';
import { handlePostRequest } from '../utils/api/axios';
import { toast } from 'react-hot-toast';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSigned, setIsSigned] = useState(false);

  const validateUsername = (value: string) => {
    const regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    if (!regex.test(value)) {
      setUsernameError('Invalid username');
    } else {
      setUsernameError('');
    }
  };

  const validateEmail = (value: string) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!regex.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/;
    if (!regex.test(value)) {
      setPasswordError('Password must be 8-12 digits, including upper and lower case letters');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { status, data, message } = await handlePostRequest('auth/register', { email, password, username });
    if (status === 200) {
      toast.success(data.message);
      setIsSigned(true);
    }
    if (status !== 200) {
      toast.error(message);
    }
    console.log(data);
  };

  if (isSigned) return <Navigate to="/login" />;

  return (
    <OutLayout>
      <PhotoPageLayout background={Bg}>
        <Stack alignItems={'center'} width="100%" gap={2} component="form" onSubmit={handleSubmit}>
          <Typography> Sign Up Page</Typography>
          <TextField
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateUsername(e.target.value);
            }}
            error={Boolean(usernameError)}
            helperText={usernameError}
            required
            sx={{ width: '60%' }}
          />
          <TextField
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            error={Boolean(emailError)}
            helperText={emailError}
            required
            sx={{ width: '60%' }}
          />
          <TextField
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            error={Boolean(passwordError)}
            helperText={passwordError}
            required
            sx={{ width: '60%' }}
          />
          <TextField
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateConfirmPassword(e.target.value);
            }}
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
            required
            sx={{ width: '60%' }}
          />
          <Stack flexDirection={'row'} gap="1rem">
            <Button type="submit" variant="contained" sx={{ width: '8rem' }}>
              Sign Up
            </Button>
            <Link to="/login" style={{ all: 'unset' }}>
              <Button variant="contained" sx={{ width: '8rem' }}>
                Login
              </Button>
            </Link>
          </Stack>
        </Stack>
      </PhotoPageLayout>
    </OutLayout>
  );
};

export default SignUpPage;
