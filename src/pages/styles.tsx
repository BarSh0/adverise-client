import { Avatar, Box } from '@mui/material';
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

const FilterBar = styled(Box)`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  width: 80%;
  position: fixed;
  gap: 1rem;
  align-items: center;
  z-index: 4;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export { FilterBar, StyledContainer, StyledSocialAvatar };
