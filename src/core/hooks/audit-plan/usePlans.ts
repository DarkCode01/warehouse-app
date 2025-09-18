import { auditPlanService } from '@/services/audit-plan';
import useSWR from 'swr';

export const usePlans = (warehouseId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    warehouseId ? ['warehouse-list-plans', warehouseId] : null,
    async () => await auditPlanService.getPlans(warehouseId),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    plans: data?.data,
    refresh: mutate,
    isLoading,
    isError: error,
  };
};
