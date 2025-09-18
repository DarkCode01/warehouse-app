import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CurrentPlanSkeleton = () => {
  return (
    <Card>
      <CardContent className="space-y-4">
        <Skeleton className="h-[20px] w-20" />
        <Skeleton className="h-[80px]" />
        <Skeleton className="h-[40px]" />
      </CardContent>
    </Card>
  );
}