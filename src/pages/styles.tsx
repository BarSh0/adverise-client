import { Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';

const StyledSocialAvatar = styled(Avatar)`
  border-radius: 1rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;

const FilterBar = styled(Stack)`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  background: white;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  position: fixed;
  width: 75%;
  z-index: 4;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export { StyledSocialAvatar, FilterBar, StyledContainer };
