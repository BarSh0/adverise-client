import { useMutation, useQueryClient } from 'react-query';
import facebookSettings from '../../data/Platforms/facebook';
import { StyledSocialAvatar } from '../../pages/styles';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { handlePostRequest } from '../../utils/api/axios';

const LoginWithFacebook = () => {
  const queryClient = useQueryClient();

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider().addScope(
      'email, pages_show_list,instagram_basic,pages_read_engagement,pages_manage_metadata,pages_manage_ads'
    );
    const result = await signInWithPopup(auth, provider);

    const cred = FacebookAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log(cred, user);
    return await handlePostRequest('facebook/signin', { ...user, ...cred });
  };

  const handleLogin = useMutation(signInWithFacebook, {
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
      src={facebookSettings.icon}
      alt={facebookSettings.name}
      sx={{ width: 60, height: 60 }}
      onClick={() => handleLogin.mutate()}
    />
  );
};

export default LoginWithFacebook;
