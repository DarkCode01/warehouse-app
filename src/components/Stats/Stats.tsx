import { useStats } from "@/core/hooks/warehouse/useStats";
import { getRiskLevel } from "@/lib/score";
import { ChartArea } from "lucide-react";
import { HTMLAttributes } from "react";
import { Fallback } from "../Fallback";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { StatsSkeleton } from "./StatsSkeleton";

interface Props extends HTMLAttributes<HTMLDivElement> {
  warehouseId: string;
}

export const Stats = ({ warehouseId }: Props) => {
  const { isLoading, isError, stats } = useStats(warehouseId);

  if (isLoading) return <StatsSkeleton />;
  if (isError) return (
    <Fallback
      title="Risk scores unavailable"
      message="Cannot calculate current warehouse risk statistics."
    />
  );

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2">
      {stats.map((stat) => {
        const label = getRiskLevel(stat.averageRiskScore)

        return (
          <Card key={stat.group} className="border shadow-xs bg-white p-0 rounded-lg card-elevated">
            <CardContent className="flex flex-col gap-4 p-3">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-gray-900">{stat.group}</p>

                <Badge className="rounded-full" variant="outline">
                  <ChartArea />
                  {stat.averageRiskScore}
                </Badge>
              </div>

              <div>
                <div className="text-sm font-semibold flex items-center justify-between">
                  <p className="text-gray-500">Pallets ({stat.totalPallets})</p>
                  <p className="text-black">Bins ({stat.totalBins})</p>
                </div>
                <span className="text-gray-600 text-xs">{label} (Avg)</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};