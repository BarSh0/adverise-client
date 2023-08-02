import { Stack } from '@mui/system';
import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  width: 45%;
  height: 100%;
  border-radius: 0.5rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const PhotoPageLayout = ({ children, background }: any) => {
  const [show, setShow] = React.useState(window.innerWidth < 400);
  window.addEventListener('resize', () => {
    console.log(window.innerWidth);
    setShow(window.innerWidth < 700);
  });
  return (
    <Stack flexDirection={'row'} alignItems="center" justifyContent={'space-between'} height={'100%'}>
      {!show && <StyledImg src={background} alt="img" />}
      {children}
    </Stack>
  );
};

export default PhotoPageLayout;
