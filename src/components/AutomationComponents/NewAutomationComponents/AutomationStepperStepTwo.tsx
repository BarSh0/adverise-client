import { Stack } from '@mui/material';
import { useContext } from 'react';
import NewAutomationContext from '../../../contexts/NewAutomationContext';
import AudiencesFormList from '../../FormLists/AudiencesFormList';
import NewAutomationForm from './NewAutomationForm';
import Form from '../../Common/Form';

const AutomationDialogStepTwo = (setErrorMessage: any) => {
  const { newAutomation, adAccounts } = useContext(NewAutomationContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getAudiences = () => {
    if (newAutomation.adAccount) {
      const account = adAccounts.find((account: { name: string }) => account.name === newAutomation.adAccount);
      if (account) {
        return account.saved_audiences.data;
      }
    }
    return [];
  };

  return (
    <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
      {newAutomation.platform === 'twitter' ? (
        <Form />
      ) : (
        <>
          <NewAutomationForm />
          <AudiencesFormList />
        </>
      )}
    </Stack>
  );
};

export default AutomationDialogStepTwo;
