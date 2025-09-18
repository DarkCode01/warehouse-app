'use client';

import { AuditPlan } from '@/core/models/audit';
import { Fallback } from '../Fallback';
import { Empty } from './Empty';
import { PlanItem } from './Plan';
import { SkeletonPlans } from './Skeleton';

interface Props {
  plans?: Array<AuditPlan>;
  isLoading: boolean;
  isError: boolean;
}

export const ListPlans = ({ plans, isLoading, isError }: Props) => {
  if (isLoading) return <SkeletonPlans />;
  if (isError)
    return (
      <div className="col-span-3 w-full h-full">
        <Fallback
          title="Failed to load audit plans"
          message="Unable to connect to the server. Check your internet connection."
        />
      </div>
    );
  if (!plans || plans.length === 0) return <Empty />;

  return (
    <div className="col-span-3 flex flex-col gap-4">
      {plans.map((plan) => <PlanItem key={plan.id} plan={plan} />)}
    </div>
  );
};
