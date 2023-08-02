import { createContext, useContext, useEffect, useState } from 'react';
import { handlePostRequest } from '../utils/api/axios';
import { amountOfHoursCalc } from '../utils/Utils';
import AutomationsContext from './AutomationsContext';

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
  const [newAutomation, setNewAutomation] = useState({} as NewAutomationContextType);
  // const { addAutomation } = useContext(AutomationsContext);

  useEffect(() => {
    console.log(newAutomation);
  }, [newAutomation]);

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
  const sendRequest = async () => {
    const request: NewAutomationRequestType = {
      accountId: newAutomation.adAccount.id,
      page: { ...newAutomation.page, platform: newAutomation.platform },
      properties: {
        adPauseTime: amountOfHoursCalc(parseInt(newAutomation.amount), newAutomation.of),
        dailyBudget: parseInt(newAutomation.budget) * 100,
        objective: 'POST_ENGAGEMENT',
      },
      audiences: newAutomation.audience,
    };

    const { message, status } = await handlePostRequest(
      `/${newAutomation.platform}/${newAutomation.adAccount.id}/campaigns`,
      newAutomation
    );
    // addAutomation(message);
  };

  return (
    <NewAutomationContext.Provider
      value={{
        newAutomation,
        setNewAutomation,
        insertValue,
        removeValue,
        removeMultipleValues,
        insertMultipleValues,
        sendRequest,
      }}
    >
      {children}
    </NewAutomationContext.Provider>
  );
}

export default NewAutomationContext;
