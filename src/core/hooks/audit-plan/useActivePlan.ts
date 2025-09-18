import { auditPlanService } from '@/services/audit-plan';
import useSWR from 'swr';

export const useActivePlan = (warehouseId: string) => {
  const { data, error, isLoading } = useSWR(
    warehouseId ? ['warehouse-plans', warehouseId] : null,
    async () => await auditPlanService.getActive(warehouseId),
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
