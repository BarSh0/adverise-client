import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/system';
import Bg from '../assets/images/connect-image.jpg';
import PlatformConnect from '../components/PlatformConnect/PlatformConnect';
import platforms from '../data/Platforms';
import AppLayout from '../layouts/AppLayout';
import PhotoPageLayout from '../layouts/PhotoPageLayout';
import React from 'react';

const ConnectionsPage = () => {
  return (
    <AppLayout>
      <PhotoPageLayout background={Bg}>
        <Stack spacing={{ xs: 2, sm: 3, md: 4 }} paddingX={{ sm: 5, md: 10 }}>
          <Typography fontWeight={900} fontSize={30} textAlign="center">
            Social Networks
          </Typography>
          <Typography textAlign="center" fontSize={15} marginBottom={5}>
            Please Choose the social networks that you want to integrate
          </Typography>
          {platforms.map((platform, index) => (
            <React.Fragment key={platform.name}>
              <PlatformConnect {...platform} />
              {index !== platforms.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Stack>
      </PhotoPageLayout>
    </AppLayout>
  );
};

export default ConnectionsPage;
