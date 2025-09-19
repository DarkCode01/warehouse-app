import { binService } from '@/services/bin';
import useSWR from 'swr';

export const useBinActivities = (binId?: string) => {
  const { data, error, isLoading } = useSWR(
    binId ? ['warehouse-bin-activities', binId] : null,
    async () => await binService.getActivities(binId!),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    activities: data?.data || [],
    isLoading,
    isError: error,
  };
};
