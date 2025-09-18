import { auditPlanService } from '@/services/audit-plan';
import useSWR from 'swr';

export const useActivePlan = (planId: string) => {
  const { data, error, isLoading } = useSWR(
    planId ? ['warehouse-plan-details', planId] : null,
    async () => await auditPlanService.getDetails(planId),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    plan: data?.data,
    isLoading,
    isError: error,
  };
};
