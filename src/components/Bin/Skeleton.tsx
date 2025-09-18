import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export const BinSkeleton = () => {
  return (
    <Card className="h-full">
      <CardContent className="h-full space-y-4 flex flex-col justify-between">
        <Skeleton className="h-[40px] w-40" />

        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <Skeleton className="h-[100px]" />
          <Skeleton className="h-[100px]" />
          <Skeleton className="h-[100px]" />
          <Skeleton className="h-[100px]" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-[100px]" />
          <Skeleton className="h-[40px]" />
        </div>
      </CardContent>
    </Card>
  );
};
