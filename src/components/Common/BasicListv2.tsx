import { Stack } from '@mui/material';
import { useContext, useState } from 'react';
import NewAutomationContext from '../../contexts/NewAutomationContext';
import { StackList } from '../AutomationComponents/styles';
import SearchBar from '../SearchBar';
import ListItem, { ListItemProps } from './BasicListItemv2';
import { BasicListLabel } from './styles';

type BasicListProps = {
  title: string;
  label?: string;
  items?: Array<ListItemProps>;
  children?: any;
  isMultySelect?: boolean;
  searcher?: boolean;
};

const BasicList = ({ title, label, items, isMultySelect, children, searcher }: BasicListProps) => {
  const [filteredItems, setFilteredItems] = useState([]);

  const { newAutomation, insertValue, removeValue, insertMultipleValues, removeMultipleValues } =
    useContext(NewAutomationContext);

  const handleOnSelect = (name: string) => {
    insertValue(label!, name);
  };

  const handleOnUnSelect = (name: string) => {
    removeValue(label!, name);
  };

  const handleOnMultySelect = (data: any) => {
    insertMultipleValues(label!, data);
  };
  const handleOnMultyUnSelect = (data: any) => {
    removeMultipleValues(label!, data);
  };

  return (
    <Stack gap={2}>
      <BasicListLabel>{title}</BasicListLabel>
      <StackList>
        {items
          ?.filter((item) => filteredItems.includes(item.name as never))
          .map((item, index) => {
            return (
              <ListItem
                key={item.name + index}
                name={item.name}
                icon={item.icon}
                isSelected={label && newAutomation[label] === item.name ? true : false}
                select={isMultySelect ? handleOnMultySelect : handleOnSelect}
                unSelect={isMultySelect ? handleOnMultyUnSelect : handleOnUnSelect}
              />
            );
          })}
        {children}
      </StackList>
      {searcher && (
        <SearchBar searchData={items ? items.map((item: ListItemProps) => item.name) : []} setter={setFilteredItems} />
      )}
    </Stack>
  );
};

export default BasicList;
