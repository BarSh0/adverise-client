import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Bg from '../assets/images/login.jpg';
import LoginWithFacebook from '../components/LoginWith/LoginWithFacebook';
import LoginWithGoogle from '../components/LoginWith/LoginWithGoogle';
import LoginWithTwitter from '../components/LoginWith/LoginWithTwitter';
import OutLayout from '../layouts/OutLayout';
import PhotoPageLayout from '../layouts/PhotoPageLayout';
import { handlePostRequest } from '../utils/api/axios';
import { useMutation, useQueryClient } from 'react-query';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();

  const handleLogin = useMutation('user', () => handlePostRequest('auth/login', { email, password }), {
    onSuccess: (res) => {
      localStorage.setItem('token', res.data);
      window.location.href = '/';
      queryClient.invalidateQueries('user');
    },
  });

  return (
    <OutLayout>
      <PhotoPageLayout background={Bg}>
        <Stack alignItems={'center'} width="100%" gap={2}>
          <Typography>Sign In With</Typography>
          <Stack flexDirection={'row'} gap={3}>
            <LoginWithTwitter />
            <LoginWithFacebook />
            <LoginWithGoogle />
          </Stack>
          <Typography> Or </Typography>
          <TextField
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            sx={{ width: '60%' }}
          />
          <TextField
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            sx={{ width: '60%' }}
          />
          <Stack flexDirection={'row'} gap="1rem">
            <Button onClick={() => handleLogin.mutate()} variant="contained" sx={{ width: '8rem' }}>
              Login
            </Button>
            <Link to="/signup" style={{ all: 'unset' }}>
              <Button variant="contained" sx={{ width: '8rem' }}>
                SignUp
              </Button>
            </Link>
          </Stack>
        </Stack>
      </PhotoPageLayout>
    </OutLayout>
  );
};

export default LoginPage;
