'use client'

import { getRiskColor, getRiskTextColor } from "@/lib/score";
import clsx from "clsx";
import dayjs from 'dayjs';
import { useMemo } from "react";

import { Aisle } from "@/core/models/aisle";
import { Rack } from "@/core/models/rack";
import { Nullable } from "@/shared/types/common";
import relativeTime from 'dayjs/plugin/relativeTime';

interface Props {
  aisleCode: Aisle['code'];
  rackNumber: Rack['number'];
  lastAuditDate: Nullable<Date>;
  pallets: number;
  riskScore: number;
}

dayjs.extend(relativeTime);

export const BinDetails = ({ riskScore, pallets, lastAuditDate, aisleCode, rackNumber  }: Props) => {
  const lastAudit = useMemo(() => {
    if (lastAuditDate) {
      return dayjs(lastAuditDate).fromNow();
    };
    return 'Never';
  }, [lastAuditDate]);
  const scoreColor = getRiskTextColor(riskScore || 100);
  const bgColor = getRiskColor(riskScore || 100);

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <div className="rounded-lg text-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 text-sm flex items-center justify-center p-4">
        <div className="">
          <div className="text-gray-600 text-sm">Location</div>
          <div className="text font-bold text-gray-900">
            <p>Aisle {aisleCode}</p>
            <p>Rack {rackNumber.toString().padStart(2, '0')}</p>
          </div>
        </div>
      </div>
      <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center p-4">
        <div className="">
          <div className="text-gray-600 text-sm">Last Audit</div>
          <div className="text-lg font-bold text-gray-900">{lastAudit}</div>
        </div>
      </div>
      <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center p-4">
        <div className="">
          <div className="text-gray-600 text-sm">Total Pallets</div>
          <div className="text-lg font-bold text-gray-900">
            {pallets}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'text-center flex items-center justify-center p-4 rounded-lg',
          bgColor
        )}
      >
        <div className={scoreColor}>
          <div className="text-4xl font-bold">{riskScore}</div>
          <div className="text-sm">Risk Score</div>
        </div>
      </div>
    </div>
  );
};