'use client'

import { useHeatmap } from "@/core/hooks/warehouse/useHeatmap";
import { warehouseService } from "@/services/warehouse";
import { RefreshCcw } from "lucide-react";
import { HTMLAttributes, useMemo } from "react";
import Chart from 'react-apexcharts';
import { toast } from "sonner";
import { Fallback } from "../Fallback";
import { Button } from "../ui/button";
import { HeatmapSkeleton } from "./Skeleton";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>{
  warehouseId: string;
  onClick: (binCode: string) => void;
}

export const Heatmap = ({ warehouseId, onClick }: Props) => {
  const { isLoading, isError, heatmap, refresh } = useHeatmap(warehouseId);

  const series = useMemo(() =>
    Object.keys(heatmap).map((key) => ({
      name: key,
      data: heatmap[key].map((x) => ({
        x: '',
        y: x.riskScore,
        label: `${x.code} - (${x.riskScore})`,
        extra: x
      })),
    }))
    , [heatmap]);
  
  // Recompute bins score
  const recompute = async () => {
    toast.promise(() => warehouseService.recompute(warehouseId), {
      loading: 'Recomputing risk scores...',
      success: async () => {
        await refresh();

        return {
          type: 'success',
          message: 'Risk scores updated',
          description:
            'All warehouse risk assessments have been recalculated successfully.',
        }; 
      },
      error: () => ({
        message: 'Recompute calculation failed',
        description:
          'Unable to recalculate warehouse risk scores. Please try again.',
      }),
    });
  }

  if (isLoading && heatmap) return <HeatmapSkeleton />;
  if (isError) return (
    <Fallback
      title="Warehouse heatmap unavailable"
      message="Unable to load bin location data. The warehouse layout cannot be displayed."
    />
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl text-black font-bold">Warehouse Heatmap</h3>
          <p className="text-">Click any bin to view detailed information</p>
        </div>

        <Button
          data-tour="recompute"
          variant="outline"
          size="lg"
          onClick={recompute}
        >
          <RefreshCcw className="w-3 h-3 mr-1" />
          Recompute
        </Button>
      </div>
      <Chart
        options={{
          chart: {
            height: 350,
            type: 'heatmap',
            events: {
              dataPointSelection: (_event, _chatContext, config) => {
                const serieIndex = config.seriesIndex;
                const dataPointIndex = config.dataPointIndex;

                onClick?.(series[serieIndex].data[dataPointIndex].extra.code);
              },
            },
          },
          plotOptions: {
            heatmap: {
              shadeIntensity: 0.5,
              radius: 10,
              enableShades: false,
              useFillColorAsStroke: false,
              colorScale: {
                ranges: [
                  {
                    from: 0,
                    to: 30,
                    name: 'Low Risk',
                    color: '#10B981',
                  },
                  {
                    from: 31,
                    to: 70,
                    name: 'Medium Risk',
                    color: '#F59E0B',
                  },
                  {
                    from: 71,
                    to: 100,
                    name: 'High Risk',
                    color: '#EF4444',
                  },
                ],
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
              const dataPoint =
                opts.w.config.series[opts.seriesIndex].data[
                  opts.dataPointIndex
                ];
              return dataPoint.label;
            },
          },
          tooltip: {
            enabled: true,
            x: {
              show: false,
            },
            y: {
              title: {
                formatter: function (val, opts) {
                  const dataPoint =
                    opts.w.config.series[opts.seriesIndex].data[
                      opts.dataPointIndex
                    ];
                  return `Pallets: (${dataPoint.extra?.palletCount})`;
                },
              },
            },
          },
          stroke: {
            width: 6,
          },
          xaxis: {
            categories: ['Rack 1', 'Rack 2', 'Rack 3', 'Rack 4', 'Rack 5'],
          },
          grid: {
            padding: {
              top: 20,
              right: 10,
              bottom: 10,
              left: 10,
            },
          },
        }}
        series={series}
        type="heatmap"
        data-tour="heatmap"
      />
    </div>
  );
}