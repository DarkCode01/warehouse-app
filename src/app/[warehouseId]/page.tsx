'use client';

import { BinSkeleton } from '@/components/Bin/Skeleton';
import { CurrentPlanSkeleton } from '@/components/CurrentPlan/Skeleton';
import { HeatmapSkeleton } from '@/components/Heatmap/Skeleton';
import { StatsSkeleton } from '@/components/Stats/StatsSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCheck, ListCheck, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// lazy loading
const Heatmap = dynamic(
  () => import('@/components/Heatmap/Heatmap').then((mod) => mod.Heatmap),
  {
    loading: HeatmapSkeleton,
    ssr: false,
  }
);

const Stats = dynamic(
  () => import('@/components/Stats/Stats').then((mod) => mod.Stats),
  {
    loading: StatsSkeleton,
  }
);

const CurrentPlan = dynamic(
  () =>
    import('@/components/CurrentPlan/CurrentPlan').then(
      (mod) => mod.CurrentPlan
    ),
  {
    loading: CurrentPlanSkeleton,
  }
);

const Bin = dynamic(
  () => import('@/components/Bin/Bin').then((mod) => mod.Bin),
  {
    loading: BinSkeleton,
  }
);

export default function Home() {
  const params = useParams();
  const warehouseId = params.warehouseId as string;
  const [binCode, setBinCode] = useState<string>();

  return (
    <div className="w-full max-w-7xl mx-auto h-full flex flex-col gap-4 p-6 overflow-y-auto relative">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          <div
            className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"
            id="navbar-menu"
          >
            <Link href={`/${warehouseId}/plans`} data-tour="create-plan">
              <Button variant="outline">
                <Plus />
                Create A Plan
              </Button>
            </Link>
            <Link href={`/${warehouseId}/plans`} data-tour="audit-plans">
              <Button variant="outline">
                <ListCheck /> Audit Plans
              </Button>
            </Link>
            <Link href={`/${warehouseId}/audit`} data-tour="audit-bin">
              <Button variant="outline">
                <CheckCheck />
                Audit A Bin
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="flex flex-col justify-between h-full">
              <Heatmap
                onClick={(code: string) => {
                  if (code !== binCode) setBinCode(code);
                }}
                warehouseId={warehouseId}
              />
            </CardContent>
          </Card>

          <Stats warehouseId={warehouseId} />
        </div>

        <div className="flex-col flex gap-2">
          <Bin binCode={binCode} />
          <CurrentPlan warehouseId={warehouseId} />
        </div>
      </div>
    </div>
  );
}
