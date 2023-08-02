import { useMutation, useQueryClient } from 'react-query';
import { handleDeleteRequest } from '../../utils/api/axios';
import { IAutomation } from '../../constants/types/automation.types';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteAutomationBtn = (automation: IAutomation) => {
  const queryClient = useQueryClient();
  const handleDelete = useMutation(() => handleDeleteRequest(`/automations/twitter/${automation._id}`), {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries('automations');
    },
  });
  return (
    <Button variant="contained" color='error' onClick={() => handleDelete.mutate()}>
      Delete
    </Button>
  );
};

export default DeleteAutomationBtn;
