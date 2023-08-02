import { Checkbox, FormControl, FormLabel, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import NewAutomationContext from '../../contexts/NewAutomationContext';
import { handleGetRequest } from '../../utils/api/axios';
import BasicList from './BasicListv2';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const campaignFields = [
  {
    name: 'campaignName',
    label: 'Campaign Name',
    type: 'text',
    component: 'TextField',
    required: true,
  },

  {
    name: 'dailyBudget',
    label: 'Daily Budget',
    type: 'number',
    component: 'TextField',
    required: true,
  },
];

const adGroupFields = [
  {
    name: 'placement',
    label: 'Placement',
    type: 'text',
    component: 'Select',
    required: true,
    options: [
      'ALL_ON_TWITTER',
      'PUBLISHER_NETWORK',
      'TAP_BANNER',
      'TAP_FULL',
      'TAP_FULL_LANDSCAPE',
      'TAP_NATIVE',
      'TAP_MRECT',
      'TWITTER_PROFILE',
      'TWITTER_REPLIES',
      'TWITTER_SEARCH',
      'TWITTER_TIMELINE',
    ],
  },
  {
    name: 'productType',
    label: 'Product Type',
    type: 'text',
    component: 'Select',
    required: true,
    options: ['PROMOTED_TWEETS', 'PROMOTED_ACCOUNTS', 'PROMOTED_TRENDS'],
  },
  {
    name: 'objective',
    label: 'Objective',
    type: 'text',
    component: 'Select',
    required: true,
    options: [
      'APP_ENGAGEMENTS',
      'APP_INSTALLS',
      'REACH',
      'FOLLOWERS',
      'ENGAGEMENTS',
      'VIDEO_VIEWS',
      'PREROLL_VIEWS',
      'WEBSITE_CLICKS',
    ],
  },
];

const Form = () => {
  const { newAutomation, insertValue } = useContext(NewAutomationContext);
  const { data: fundingInstruments } = useQuery('twitter-funding-instruments', () =>
    handleGetRequest(`/${newAutomation.platform}/${newAutomation.adAccount.id}/funding-instruments`)
  );
  const { data: audiences } = useQuery('twitter-audiences', () =>
    handleGetRequest(`/${newAutomation.platform}/${newAutomation.adAccount.id}/audiences`)
  );
  const { data: targetingCriteria } = useQuery('twitter-targeting-criteria', () =>
    handleGetRequest(`/${newAutomation.platform}/${newAutomation.adAccount.id}/targeting-criteria`)
  );

  const handleChange = (event: any) => {
    insertValue(event.target.name, event.target.value);
  };

  const handleMultiSelectChange = (event: any) => {
    const {
      target: { value, name },
    } = event;
    insertValue(name, typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Stack flexDirection={'row'} gap={'1rem'}>
      <BasicList title="Campaing" label="Campaing">
        {campaignFields.map((field) => {
          return (
            <FormControl fullWidth key={field.label}>
              <FormLabel sx={{ marginBottom: '0.5rem' }}>{field.label}</FormLabel>
              <TextField
                name={field.name}
                size="small"
                variant="outlined"
                value={newAutomation[field.name]}
                onChange={handleChange}
                required={field.required}
                type={field.type}
              />
            </FormControl>
          );
        })}
        <FormControl fullWidth>
          <FormLabel sx={{ marginBottom: '0.5rem' }}>Funding Instrument</FormLabel>
          <Select
            name="fundingInstrument"
            fullWidth
            defaultValue={newAutomation['fundingInstrument'] || ''}
            size="small"
            onChange={handleChange}
          >
            {fundingInstruments?.data.map((fundingInstrument: any) => {
              return (
                <MenuItem key={fundingInstrument.id} value={fundingInstrument.id}>
                  {fundingInstrument.description}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </BasicList>
      <BasicList title="Ad Group" label="adGroup">
        {adGroupFields.map((field) => {
          return (
            <FormControl fullWidth key={field.label}>
              <FormLabel sx={{ marginBottom: '0.5rem' }}>{field.label}</FormLabel>
              {field.component === 'TextField' ? (
                <TextField
                  name={field.name}
                  size="small"
                  variant="outlined"
                  value={newAutomation[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  type={field.type}
                />
              ) : (
                <Select
                  name={field.name}
                  fullWidth
                  defaultValue={newAutomation[field.name] || ''}
                  size="small"
                  onChange={handleChange}
                >
                  {field.options?.map((option: string) => {
                    return (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </FormControl>
          );
        })}
      </BasicList>
      <BasicList title="Audience" label="Audience">
        <FormControl>
          <FormLabel sx={{ marginBottom: '0.5rem' }}>Targeting Criteria</FormLabel>
          <Select
            name={'targetingValue'}
            fullWidth
            defaultValue={newAutomation['targetingValue'] || ''}
            size="small"
            onChange={handleChange}
          >
            {targetingCriteria?.data.map((option: any) => {
              return (
                <MenuItem key={option.id} value={option.targeting_value}>
                  {option.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel sx={{ marginBottom: '0.5rem' }}>Audiences</FormLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            size="small"
            name="audiences"
            value={newAutomation['audiences'] || []}
            onChange={handleMultiSelectChange}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {audiences?.data.map((audience: any) => (
              <MenuItem key={audience.name} value={audience.name}>
                <Checkbox
                  checked={newAutomation['audiences'] ? newAutomation['audiences'].indexOf(audience.name) > -1 : false}
                />
                <ListItemText primary={audience.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </BasicList>
    </Stack>
  );
};

export default Form;
