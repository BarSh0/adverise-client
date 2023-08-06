import { createContext, useEffect } from 'react';
import { MutationFunction, useMutation, useQuery, useQueryClient } from 'react-query';
import { automationService } from '../services/automation.service';

const AutomationsContext = createContext({} as any);

export function AutomationsProvider({ children }: any) {
  const queryClient = useQueryClient();
  const { data: automationsArray, error, isLoading } = useQuery('automations', automationService.getAllAutomations);

  const handleStatusChange: MutationFunction<void, [string, string, boolean]> = async (variables) => {
    const [automationId, platform, checked] = variables;
    await automationService.handleToggleStatusNew(automationId, platform, !checked);
  };

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
    automationsArray,
  };

  if (error) console.log(error);

  // Return the context provider with the value
  return <AutomationsContext.Provider value={value}>{!isLoading && children}</AutomationsContext.Provider>;
}

export default AutomationsContext;
