'use client';

import { useBin } from '@/core/hooks/useBin';
import { Activity, CheckCircle } from 'lucide-react';
import { Fallback } from '../Fallback';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { BinSkeleton } from './Skeleton';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { BinDetails } from './BinDetails';
import { BinFactor } from './BinFactor';

interface Props {
  binCode?: string;
}

export const Bin = ({ binCode }: Props) => {
  const pathname = usePathname();
  const { isLoading, isError, bin } = useBin(binCode);

  if (!binCode) {
    return (
      <div className="bg-white flex items-center justify-center py-12 h-full border rounded-lg flex-col gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-gray-400" />
          </div>

          <p className="text-gray-500 text-sm">Click any bin to view details</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <BinSkeleton />;

  if (isError)
    return (
      <Fallback
        title="Bin's details unavailable"
        message="Unable to retrieve this bin details "
      />
    );

  if (!bin) {
    return (
      <Fallback
        title="Bin information not found"
        message={`Details for the selected bin (${binCode}) are not available in the system.`}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bin&apos;s details ({binCode})</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <div className="space-y-6">
          <BinDetails
              aisleCode={bin.rack.aisle.code}
              rackNumber={bin.rack.number}
              riskScore={bin.risk_score}
              lastAuditDate={bin.last_audit_date}
              pallets={bin.pallet_count}
            />

          <div className="space-y-3">
            <h5 className="font-bold">Risk Factors Analysis</h5>
            <BinFactor label="Days since last audit" value={bin.audit_factor} />
            <BinFactor label="Activity count" value={bin.activity_factor} />
            <BinFactor label="Adjustments" value={bin.adjustment_factor} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`${pathname}/audit?binCode=${binCode}`} className="w-full">
          <Button className="w-full">
            <CheckCircle />
            Audit Bin
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
