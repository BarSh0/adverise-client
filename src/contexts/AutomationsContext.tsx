import { createContext, useEffect } from 'react';
import { MutationFunction, useMutation, useQuery, useQueryClient } from 'react-query';
import { automationService } from '../services/automation.service';

const AutomationsContext = createContext({} as any);

export function AutomationsProvider({ children }: any) {
  const { data: automationsArray, error, isLoading } = useQuery('automations', automationService.getAllAutomations);

  const queryClient = useQueryClient();
  // Define the handleStatusChange function with proper parameters
  const handleStatusChange: MutationFunction<void, [string, string, boolean]> = async (variables) => {
    const [automationId, platform, checked] = variables;
    await automationService.handleToggleStatusNew(automationId, platform, !checked);
  };

  // Use useMutation with the mutation function directly
  const changeStatus = useMutation<void, unknown, [string, string, boolean]>(handleStatusChange, {
    onSuccess: () => {
      queryClient.invalidateQueries('automations');
    },
  });

  useEffect(() => {
    console.log(automationsArray);
  }, [automationsArray]);

  const value = {
    changeStatus,
    isLoading,
    automationsArray,
  };

  if (error) console.log(error);

  // Return the context provider with the value
  return <AutomationsContext.Provider value={value}>{children}</AutomationsContext.Provider>;
}

export default AutomationsContext;
