import { Box } from '@mui/system';
import styled from 'styled-components';

const AppContainer = styled(Box)`
  width: 85vw;
  height: 90vh;
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const UpperBox = styled(Box)`
  text-align: center;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(180deg, #3d4145 0%, #202020 100%);
  color: #ffffff;
`;

const MainBox = styled(Box)`
  overflow: overlay;
  background: linear-gradient(180deg, #3e3d4514 51.56%, rgba(0, 0, 0, 0) 100%);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: inset 0 5px 10px -10px black;
  border: solid $b rgba(#000, 0.03);
`;

export { AppContainer, UpperBox, MainBox };
