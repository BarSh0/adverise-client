import { Autocomplete, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const StyledAutocomplete = styled(Autocomplete)`
  .MuiAutocomplete-inputRoot {
    border-radius: 0.5rem;
    border: none;
    background-color: #ffffff;
  }
  .MuiAutocomplete-inputRoot:hover {
  }
  .MuiAutocomplete-listbox {
    background-color: #ffffff;
    border-radius: 0.5rem;
  }
  .MuiAutocomplete-option {
  }
  .MuiAutocomplete-option.Mui-selected {
    background-color: #9c1a1a;
  }
  .MuiAutocomplete-option.Mui-focused {
    background-color: #f5f5f5;
  }
  .MuiAutocomplete-option.Mui-focusVisible {
    background-color: #f5f5f5;
    outline: none;
  }
  .MuiAutocomplete-option[data-focus='true'] {
    background-color: #f5f5f5;
  }
`;

const SearchBar = ({ searchData, setter }: { searchData: Array<string>; setter: Function }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(searchData);

  console.log('searchData', searchData);

  const filterData = (value: string) => {
    const filteredData = searchData.filter((item) => {
      return item.toLowerCase().includes(value.toLowerCase());
    });
    setter(filteredData);
    if (value === '') {
      setter(searchData);
    }
  };

  return (
    <Stack>
      <StyledAutocomplete
        disablePortal
        id="combo-box-demo"
        options={data}
        renderInput={(params) => <TextField {...params} label="Search" />}
        onInputChange={(event, value) => filterData(value)}
        fullWidth
      />
    </Stack>
  );
};

export default SearchBar;
