import { binService } from '@/services/bin';
import useSWR from 'swr';

export const useBin = (binCode?: string) => {
  const { data, error, isLoading } = useSWR(
    binCode ? ['warehouse-bin', binCode] : null,
    async () => await binService.getBin(binCode!),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    bin: data?.data,
    isLoading,
    isError: error,
  };
};
