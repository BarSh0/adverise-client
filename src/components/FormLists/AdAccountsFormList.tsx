import { isEqual } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NewAutomationContext from '../../contexts/NewAutomationContext';
import { handleGetRequest } from '../../utils/api/axios';
import BasicListItem from '../Common/BasicListItemv2';
import BasicList from '../Common/BasicListv2';

const AdAccountsFormList = () => {
  const { newAutomation, insertValue, removeValue, setNewAutomation } = useContext(NewAutomationContext);
  const [adAccounts, setAdAccounts] = useState([] as any);
  const [adAccountsCache, setAdAccountsCache] = useState([] as any);

  useEffect(() => {
    if (!newAutomation.platform) return;
    getAdAccounts(newAutomation.platform);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAutomation.platform]);

  const getAdAccounts = async (platform: string) => {
    const cachedData = adAccountsCache[platform];
    if (cachedData) {
      console.log(`Using cached adAccounts data for ${platform}:`, cachedData);
      return cachedData;
    }

    const { data, message, status } = await handleGetRequest(`/${platform}/adaccounts`);
    console.log(`Fetched adAccounts data for ${platform}:`, data);

    if (!data) {
      console.log(`Failed to fetch adAccounts data for ${platform}:`, { message, status });
      toast.error(`Failed to fetch adAccounts data for ${platform}: \n\n ${message}`);
      setNewAutomation({ ...newAutomation, platform: '' });
      return;
    }
    const dataWithPlatform = data.map((item: any) => {
      return { ...item, platform };
    });

    const updatedData = adAccounts.concat(dataWithPlatform);
    setAdAccounts(updatedData);
    console.log(`Updated adAccounts data for ${platform}:`, updatedData);

    setAdAccountsCache({ ...adAccountsCache, [platform]: updatedData });
  };
  console.log(adAccounts);

  const handleSelect = (account: any) => {
    insertValue('adAccount', account);
  };
  const handleUnSelect = (account: any) => {
    removeValue('adAccount', account);
  };

  return (
    <BasicList title="ad accounts" label="adAccount" items={adAccounts}>
      {newAutomation.platform
        ? adAccounts
            .filter((account: { platform: any }) => account.platform === newAutomation.platform)
            .map((account: any) => {
              return (
                <BasicListItem
                  key={account.id}
                  name={account.name}
                  isSelected={isEqual(newAutomation.adAccount, account)}
                  value={account}
                  select={handleSelect}
                  unSelect={handleUnSelect}
                />
              );
            })
        : []}
    </BasicList>
  );
};

export default AdAccountsFormList;
