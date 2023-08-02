import { StyledSocialAvatar } from '../../pages/styles';
import twitterSettings from '../../data/Platforms/twitter';

import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useQueryClient, useMutation } from 'react-query';
import { handlePostRequest } from '../../utils/api/axios';

const LoginWithTwitter = () => {
  const queryClient = useQueryClient();

  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const cred = TwitterAuthProvider.credentialFromResult(result);
    const user = result.user;
    return await handlePostRequest('twitter/signin', { ...user, ...cred });
  };

  const handleLogin = useMutation(signInWithTwitter, {
    onSuccess: (res) => {
      console.log(res);
      localStorage.setItem('token', res.data);
      window.location.href = '/';
      queryClient.invalidateQueries('user');
    },
  });

  return (
    <StyledSocialAvatar
      variant="rounded"
      src={twitterSettings.icon}
      alt={twitterSettings.name}
      sx={{ width: 60, height: 60 }}
      onClick={() => handleLogin.mutate()}
    />
  );
};

export default LoginWithTwitter;
