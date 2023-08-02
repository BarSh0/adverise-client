import React from 'react';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import BasicList from '../../Common/BasicList';
import NewAutomationContext from '../../../contexts/NewAutomationContext';

const AutomationDialogStepThree = (setErrorMessage: any) => {
  const { newAutomation } = React.useContext(NewAutomationContext);
  return (
    <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
      {/* <BasicList title="result" items={null}>
        {Object.keys(newAutomation).map((key) => (
          <Typography key={key}>
            {key}: {newAutomation[key]}
          </Typography>
        ))}
      </BasicList> */}
    </Stack>
  );
};

export default AutomationDialogStepThree;
