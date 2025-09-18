import { range } from "ramda";
import { Skeleton } from "../ui/skeleton";

export const SkeletonPlans = () => {
  const items = range(1, 5);
  return (
    <div className="flex flex-col gap-4 col-span-3 overflow-hidden">
      {items.map((n: number) => (
        <Skeleton className="h-30 bg-gray-200" key={n} />
      ))}
    </div>
  ); 
}