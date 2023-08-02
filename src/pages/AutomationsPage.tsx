/* eslint-disable @typescript-eslint/no-unused-vars */
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useContext, useState } from 'react';
import { AutomationCard, AutomationListItem, NewAutomationButton } from '../components/AutomationComponents';
import LinearWithValueLabel from '../components/Common/ProggressBar';
import SearchBar from '../components/SearchBar';
import { IAutomation } from '../constants/types/automation.types';
import AutomationsContext from '../contexts/AutomationsContext';
import { NewAutomationProvider } from '../contexts/NewAutomationContext';
import platforms from '../data/Platforms';
import AppLayout from '../layouts/AppLayout';
import { FilterBar, StyledContainer, StyledSocialAvatar } from './styles';

const AutomationsPage = () => {
  console.log('AutomationsPage rendered');
  const { automationsArray, isLoading } = useContext(AutomationsContext);
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [displayOption, setDisplayOption] = useState<'list' | 'cards'>('cards');
  const [searchData, setSearchData] = useState<string[]>([]);

  const handleClick = (platformName: string) => {
    if (selectedPlatform.includes(platformName)) {
      setSelectedPlatform(selectedPlatform.filter((platform) => platform !== platformName));
    } else {
      setSelectedPlatform([...selectedPlatform, platformName]);
    }
    if (selectedPlatform.length === 0)
      setSearchData(automationsArray.map((automation: IAutomation) => automation.page.name));
    setSearchData(
      automationsArray
        .filter((automation: IAutomation) => selectedPlatform.includes(automation.page.platform))
        .map((automation: IAutomation) => automation.page.name)
    );
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setDisplayOption(newAlignment as 'list' | 'cards');
  };

  return (
    <NewAutomationProvider>
      <AppLayout>
        <StyledContainer>
          {!isLoading && (
            <FilterBar flexDirection={'row'} justifyContent={'space-between'} alignItems="center">
              <div style={{ width: 300 }}>
                <SearchBar
                  searchData={automationsArray.map((automation: IAutomation) => automation.page?.name || 'No Name')}
                  setter={setFilterList}
                />
              </div>
              <Stack direction={'row'} gap={3} justifyContent={'center'}>
                {platforms.map((platform, index) => (
                  <StyledSocialAvatar
                    key={platform.name + index}
                    variant="rounded"
                    src={platform.icon}
                    alt={platform.name}
                    sx={{
                      width: 60,
                      height: 60,
                      opacity: selectedPlatform.includes(platform.name) || selectedPlatform.length === 0 ? 1 : 0.5,
                    }}
                    onClick={() => handleClick(platform.name)}
                  />
                ))}
              </Stack>
              <ToggleButtonGroup value={displayOption} exclusive onChange={handleChange} aria-label="display options">
                <ToggleButton value="list">
                  <ReorderIcon />
                </ToggleButton>
                <ToggleButton value="cards">
                  <DashboardCustomizeIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </FilterBar>
          )}
          <Stack
            flexDirection={displayOption === 'list' ? 'column' : 'row'}
            gap={2}
            flexWrap="wrap"
            marginTop={12}
            justifyContent={'center'}
            alignItems="stretch"
            width={'inherit'}
          >
            <NewAutomationButton diplayOpt={displayOption} />
            {isLoading ? (
              <LinearWithValueLabel />
            ) : (
              automationsArray.map((automation: IAutomation, index: number) => {
                if (filterList.includes(automation.page.name) || !filterList.length)
                  if (!selectedPlatform.length || selectedPlatform.includes(automation.page.platform)) {
                    if (displayOption === 'list') return <AutomationListItem key={automation._id} {...automation} />;
                    if (displayOption === 'cards') return <AutomationCard key={automation._id} {...automation} />;
                  }
                return null;
              })
            )}
          </Stack>
        </StyledContainer>
      </AppLayout>
    </NewAutomationProvider>
  );
};

export default AutomationsPage;
