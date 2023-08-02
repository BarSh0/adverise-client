import { Avatar, Typography } from '@mui/material';
import React from 'react';
import colors from '../../style/colors';
import { DisableStackListItem, StackListItem } from './styles';
import { Stack } from '@mui/material';

export type ListItemProps = {
  name: string;
  key: string;
  icon?: string;
  value?: any;
  isSelected?: boolean;
  isDisabled?: boolean;
  select?: Function;
  unSelect?: Function;
  rightComponent?: any;
};

const ListItem = ({
  name,
  icon,
  value,
  isSelected,
  select,
  unSelect,
  isDisabled,
  rightComponent,
  key,
}: ListItemProps) => {
  const handleOnClick = () => {
    if (isSelected) {
      unSelect && unSelect(value);
    } else {
      select && select(value);
    }
  };
  if (isDisabled)
    return (
      <DisableStackListItem flexDirection={'row'} justifyContent={'space-between'} key={key}>
        <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
          <Avatar variant="rounded" src={icon} alt={name} sx={{ width: 30, height: 30 }} />
          <Typography>{name}</Typography>
        </Stack>
        {rightComponent}
      </DisableStackListItem>
    );

  return (
    <StackListItem
      key={key}
      flexDirection={'row'}
      justifyContent={'space-between'}
      sx={{ outlineColor: isSelected ? '#1ecf2d' : '#ffffff', outlineWidth: 2, outlineStyle: 'solid' }}
      onClick={handleOnClick}
    >
      <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
        <Avatar variant="rounded" src={icon} alt={name} sx={{ width: 30, height: 30 }} />
        <Typography>{name || 'No Name'}</Typography>
      </Stack>
      {rightComponent}
    </StackListItem>
  );
};

export default ListItem;
