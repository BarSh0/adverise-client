/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import { amountOfHoursCalc } from '../utils/Utils';
import { handlePostRequest } from '../utils/api/axios';
import { useMutation, useQueryClient } from 'react-query';

export type NewAutomationContextType = {
  [key: string]: any;
  platform: string;
  adAccount: any;
  page: any;
  currency: string;
  budget: string;
  amount: string;
  of: string;
  audience: [{ id: string; name: string }];
};

type NewAutomationRequestType = {
  accountId: string;
  page: {
    pageId: string;
    name: string;
    picture: string;
    platform: string;
  };
  properties: {
    adPauseTime: number;
    dailyBudget: number;
    objective: string;
  };
  audiences: [
    {
      id: string;
      name: string;
    }
  ];
};

const NewAutomationContext = createContext({} as any);

export function NewAutomationProvider({ children }: any) {
  const queryClient = useQueryClient();
  const [newAutomation, setNewAutomation] = useState({} as NewAutomationContextType);

  const insertValue = (key: string, value: string) => {
    setNewAutomation({ ...newAutomation, [key]: value });
  };
  const removeValue = (key: string) => {
    const { [key]: value, ...rest } = newAutomation;
    setNewAutomation(rest as NewAutomationContextType);
    return;
  };
  const insertMultipleValues = (key: string, value: any) => {
    const { [key]: oldValue } = newAutomation;
    const newValue = oldValue ? [...oldValue, value] : [value];
    setNewAutomation({ ...newAutomation, [key]: newValue });
  };
  const removeMultipleValues = (key: string, value: any) => {
    const { [key]: oldValue } = newAutomation;
    const newValue = oldValue.filter((item: any) => item !== value);
    setNewAutomation({ ...newAutomation, [key]: newValue });
  };

  const postNewAutomation = useMutation(
    () => handlePostRequest(`/${newAutomation.platform}/${newAutomation.adAccount.id}/campaigns`, newAutomation),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('automations');
      },
    }
  );

  return (
    <NewAutomationContext.Provider
      value={{
        newAutomation,
        postNewAutomation,
        setNewAutomation,
        insertValue,
        removeValue,
        removeMultipleValues,
        insertMultipleValues,
      }}
    >
      {children}
    </NewAutomationContext.Provider>
  );
}

export default NewAutomationContext;

// const request: NewAutomationRequestType = {
//   accountId: newAutomation.adAccount.id,
//   page: { ...newAutomation.page, platform: newAutomation.platform },
//   properties: {
//     adPauseTime: amountOfHoursCalc(parseInt(newAutomation.amount), newAutomation.of),
//     dailyBudget: parseInt(newAutomation.budget) * 100,
//     objective: 'POST_ENGAGEMENT',
//   },
//   audiences: newAutomation.audience,
// };
