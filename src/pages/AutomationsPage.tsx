/* eslint-disable @typescript-eslint/no-unused-vars */
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useContext, useState } from 'react';
import { AutomationCard, AutomationListItem, NewAutomationButton } from '../components/AutomationComponents';
import SearchBar from '../components/SearchBar';
import { IAutomation } from '../constants/types/automation.types';
import AutomationsContext from '../contexts/AutomationsContext';
import { NewAutomationProvider } from '../contexts/NewAutomationContext';
import platforms from '../data/Platforms';
import { FilterBar, StyledContainer, StyledSocialAvatar } from './styles';
import React from 'react';
import { styled } from '@mui/material/styles';

const AutomationsPage = () => {
  console.log('AutomationsPage rendered');
  const { automationsArray } = useContext(AutomationsContext);
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [displayOption, setDisplayOption] = useState<'list' | 'cards'>('cards');
  const [searchData, setSearchData] = useState<string[]>([]);

  const handleClick = (platformName: string) => {
    const updatedSelectedPlatform = selectedPlatform.includes(platformName)
      ? selectedPlatform.filter((platform) => platform !== platformName)
      : [...selectedPlatform, platformName];

    setSelectedPlatform(updatedSelectedPlatform);

    const filteredPlatformNames =
      updatedSelectedPlatform.length === 0
        ? automationsArray.map((automation: IAutomation) => automation.page.name)
        : automationsArray
            .filter((automation: IAutomation) => updatedSelectedPlatform.includes(automation.page.platform))
            .map((automation: IAutomation) => automation.page.name);

    setSearchData(filteredPlatformNames);
  };

  const filteredAutomations = automationsArray.filter((automation: IAutomation) => {
    const isNameIncluded = filterList.includes(automation.page.name);
    const isPlatformSelected = selectedPlatform.length === 0 || selectedPlatform.includes(automation.page.platform);
    return isNameIncluded || (!filterList.length && isPlatformSelected);
  });

  const renderAutomations = () => {
    if (displayOption === 'list') {
      return filteredAutomations.map((automation: IAutomation) => (
        <AutomationListItem key={automation._id} {...automation} />
      ));
    } else if (displayOption === 'cards') {
      return filteredAutomations.map((automation: IAutomation) => (
        <React.Fragment>
          <AutomationCard key={automation._id} {...automation} />
          <AutomationCard key={automation._id} {...automation} />
          <AutomationCard key={automation._id} {...automation} />
          <AutomationCard key={automation._id} {...automation} />
          <AutomationCard key={automation._id} {...automation} />
          <AutomationCard key={automation._id} {...automation} />
          <AutomationCard key={automation._id} {...automation} />
          <AutomationCard key={automation._id} {...automation} />
        </React.Fragment>
      ));
    }
    return null;
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment === null) return;
    setDisplayOption(newAlignment as 'list' | 'cards');
  };

  return (
    <NewAutomationProvider>
      <FilterBar>
        <SearchBar
          searchData={automationsArray.map((automation: IAutomation) => automation.page?.name || 'No Name')}
          setter={setFilterList}
        />
        <Stack direction={'row'} gap={{ xs: 1, sm: 2, md: 3 }} justifyContent={'center'}>
          {platforms.map((platform, index) => (
            <StyledSocialAvatar
              key={platform.name + index}
              variant="rounded"
              src={platform.icon}
              alt={platform.name}
              sx={{
                width: { xs: 30, sm: 45, md: 60 },
                height: { xs: 30, sm: 45, md: 60 },
                opacity: selectedPlatform.includes(platform.name) || selectedPlatform.length === 0 ? 1 : 0.5,
              }}
              onClick={() => handleClick(platform.name)}
            />
          ))}
        </Stack>
        <ToggleButtonGroup
          value={displayOption}
          exclusive
          onChange={handleChange}
          aria-label="display options"
          sx={{ alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <ToggleButton value="list">
            <ReorderIcon />
          </ToggleButton>
          <ToggleButton value="cards">
            <DashboardCustomizeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </FilterBar>
      <AutomationsStack flexDirection={displayOption === 'list' ? 'column' : 'row'}>
        <NewAutomationButton diplayOpt={displayOption} />
        {renderAutomations()}
      </AutomationsStack>
    </NewAutomationProvider>
  );
};

const AutomationsStack = styled(Stack)`
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: inset 0 5px 10px -10px black;
  background: linear-gradient(180deg, #3e3d4514 51.56%, rgba(0, 0, 0, 0) 100%);
  padding: 1rem;
  margin-top: 10px;
  height: 70vh;
  overflow: auto;
  border-radius: 0.5rem;
`;

export default AutomationsPage;
