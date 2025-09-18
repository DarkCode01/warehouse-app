import { warehouseService } from '@/services/warehouse';
import useSWR from 'swr';

export const useHeatmap = (warehouseId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    warehouseId ? ['warehouse', warehouseId] : null,
    async () => await warehouseService.getHeatmap(warehouseId),
    {
      revalidateOnFocus: true
    }
  );

  return {
    heatmap: data?.data || {},
    isLoading,
    isError: error,
    refresh: mutate
  }
}