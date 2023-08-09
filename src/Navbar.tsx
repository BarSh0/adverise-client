import React from 'react';
import UserAvatar from './components/UserAvatar/UserAvatar';
import { Badge, IconButton, Stack, styled } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const IconsStack = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
`;

const Navbar = () => {
  return (
    <div className="navbar">
      <UserAvatar />
      <div></div>
      <IconsStack>
        <IconButton aria-label="settings">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </IconsStack>
    </div>
  );
};

export default Navbar;
