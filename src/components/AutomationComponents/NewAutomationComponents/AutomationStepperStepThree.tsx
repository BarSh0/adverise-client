import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

const AutomationDialogStepThree = (setErrorMessage: any) => {
  return (
    <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
      <Typography fontWeight={900} fontSize={20}>
        On Progress...
      </Typography>
    </Stack>
  );
};

export default AutomationDialogStepThree;
