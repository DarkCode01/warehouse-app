'use client';

import { useBin } from '@/core/hooks/useBin';
import { Activity } from 'lucide-react';
import { Fallback } from '../Fallback';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { BinSkeleton } from './Skeleton';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Activities } from '../Activities/Activities';
import { AuditAlert } from '../Audit/Alert';
import { Button } from '../ui/button';
import { BinDetails } from './BinDetails';
import { BinFactor } from './BinFactor';

interface Props {
  binCode?: string;
}

export const Bin = ({ binCode }: Props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, isError, bin } = useBin(binCode);

  // toggle modal
  const toggleActivities = () => setIsOpen((p) => !p);

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
      <CardFooter className="grid-cols-3 gap-2 grid w-full">
        <div className="">
          <Button size="full" variant="outline" onClick={toggleActivities}>
            <Activity />
            Logs
          </Button>
        </div>

        <AuditAlert
          url={`${pathname}/audit?binCode=${binCode}`}
          label="Audit"
        />
      </CardFooter>

      <Activities
        binId={bin.id}
        isOpen={isOpen}
        binCode={binCode}
        onCloseOpen={toggleActivities}
      />
    </Card>
  );
};
