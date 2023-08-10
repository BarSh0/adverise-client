import { Autocomplete, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const SearchBar = ({ searchData, setter }: { searchData: Array<string>; setter: Function }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(searchData);

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
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data}
        renderInput={(params) => <TextField {...params} label="Search" />}
        onInputChange={(event, value) => filterData(value)}
        fullWidth
        multiple
      />
    </Stack>
  );
};

export default SearchBar;
