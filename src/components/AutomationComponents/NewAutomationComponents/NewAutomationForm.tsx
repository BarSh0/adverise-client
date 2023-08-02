import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import NewAutomationContext from '../../../contexts/NewAutomationContext';
import currencies from '../../../data/currencies';
import BasicList from '../../Common/BasicList';

const NewAutomationForm = () => {
  const { newAutomation, insertValue } = React.useContext(NewAutomationContext);
  return (
    <BasicList title="properties" items={null}>
      <TextField
        id="outlined-select-currency"
        select
        label="Currency"
        defaultValue="USD"
        helperText="Please select your currency"
        value={newAutomation.currency}
        onChange={(e) => {
          insertValue('currency', e.target.value);
        }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Budget"
        value={newAutomation.budget}
        onChange={(e) => {
          insertValue('budget', e.target.value);
        }}
      />
      <TextField
        label="Amount"
        value={newAutomation.amount}
        onChange={(e) => {
          insertValue('amount', e.target.value);
        }}
      />
      <TextField
        id="outlined-select-currency"
        select
        label="of"
        defaultValue="hours"
        helperText="Please select your currency"
        value={newAutomation.of}
        onChange={(e) => {
          insertValue('of', e.target.value);
        }}
      >
        <MenuItem key={'hours'} value={'hours'}>
          Hours
        </MenuItem>
        <MenuItem key={'days'} value={'days'}>
          Days
        </MenuItem>
        <MenuItem key={'weeks'} value={'weeks'}>
          Weeks
        </MenuItem>
        <MenuItem key={'months'} value={'months'}>
          Months
        </MenuItem>
      </TextField>
    </BasicList>
  );
};

export default NewAutomationForm;
