import { warehouseService } from '@/services/warehouse';
import useSWR from 'swr';

export const useStats = (warehouseId: string) => {
  const { data, error, isLoading } = useSWR(
    warehouseId ? ['warehouse-stats', warehouseId] : null,
    async () => await warehouseService.getStats(warehouseId),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    stats: data?.data || [],
    isLoading,
    isError: error,
  };
};
