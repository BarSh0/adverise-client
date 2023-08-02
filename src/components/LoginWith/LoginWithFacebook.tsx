import facebookSettings from '../../data/Platforms/facebook';
import { StyledSocialAvatar } from '../../pages/styles';

const LoginWithFacebook = () => {
  return (
    <StyledSocialAvatar
      variant="rounded"
      src={facebookSettings.icon}
      alt={facebookSettings.name}
      sx={{ width: 60, height: 60 }}
    />
  );
};

export default LoginWithFacebook;
