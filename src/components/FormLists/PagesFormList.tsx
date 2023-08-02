import React from 'react';
import NewAutomationContext from '../../contexts/NewAutomationContext';
import BasicList from '../Common/BasicListv2';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { handleGetRequest } from '../../utils/api/axios';
import BasicListItem from '../Common/BasicListItemv2';
import { isEqual } from 'lodash';

type AdAccount = {
  id: string;
  name: string;
};
type Account = {
  pageId: string;
  name: string;
  picture: string;
};

const PagesFormList = () => {
  const { newAutomation, insertValue, removeValue } = useContext(NewAutomationContext);
  const [accountsCache, setAccountsCache] = useState([] as any);

  useEffect(() => {
    console.log(accountsCache);
    if (!newAutomation.adAccount) return;
    getAccounts(newAutomation.platform, newAutomation.adAccount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAutomation.adAccount]);

  const handleSelect = (account: any) => {
    insertValue('page', account);
  };
  const handleUnSelect = (account: any) => {
    removeValue('page', account);
  };

  const getAccounts = async (platform: string, adAccount: AdAccount) => {
    console.log(accountsCache);

    const cachedData = accountsCache[adAccount.name];
    if (cachedData) {
      console.log(`Using cached adAccounts data for ${adAccount}:`, cachedData);
      return cachedData;
    }

    // Otherwise, fetch adAccounts data from server
    const id = adAccount.id;
    const { data } = await handleGetRequest(`/${platform}/${id}/accounts`);

    console.log(`Fetched accounts data for ${adAccount}:`, data);

    if (!data) return;

    setAccountsCache({ ...accountsCache, [adAccount.name]: data });
  };

  return (
    <BasicList title="pages" label="page" >
      {newAutomation.platform
        ? newAutomation.adAccount
          ? accountsCache[newAutomation.adAccount.name] &&
            accountsCache[newAutomation.adAccount.name].map((account: Account) => {
              return (
                <BasicListItem
                  key={account.pageId}
                  name={account.name}
                  isSelected={isEqual(newAutomation.page, account)}
                  icon={account.picture}
                  value={account}
                  select={handleSelect}
                  unSelect={handleUnSelect}
                />
              );
            })
          : []
        : []}
    </BasicList>
  );
};

export default PagesFormList;
