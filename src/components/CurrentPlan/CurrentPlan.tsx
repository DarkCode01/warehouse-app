'use client'

import { useActivePlan } from "@/core/hooks/audit-plan/useActivePlan";
import { countTasksCompleted } from '@/lib/tasks';
import { usePathname } from "next/navigation";
import { HTMLAttributes, useMemo } from "react";
import { AuditAlert } from '../Audit/Alert';
import { Fallback } from '../Fallback';
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { Empty } from "./Empyt";
import { CurrentPlanSkeleton } from "./Skeleton";

interface Props extends HTMLAttributes<HTMLDivElement> {
  warehouseId: string;
}

export const CurrentPlan = ({ warehouseId }: Props) => {
  const pathname = usePathname();
  const { isLoading, isError, plan } = useActivePlan(warehouseId);
  const tasksCompleted = useMemo(() => {
    return countTasksCompleted(plan?.tasks || []);
  }, [plan]);

  if (isLoading) return <CurrentPlanSkeleton />;
  if (isError) return (
    <Fallback
      title="No current audit plan"
      message="Unable to retrieve your active audit schedule. "
    />
  );
  if (!plan?.id) return <Empty />;

  return (
    <Card data-tour="current-plan" className="sticky top-0">
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Current Audit Plan
        </h4>
      </CardHeader>
      <CardContent>
        <div className="py-2 px-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg space-y-1.5">
          <div>
            <h5 className="text-lg font-bold text-gray-900">{plan.name}</h5>
            <p className="text-gray-600 text-sm">{plan.description}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h5 className="text-xs">Progress</h5>
              <span className="text-xs text-gray-500">
                {tasksCompleted} of {plan.tasks.length} completed
              </span>
            </div>
            <Progress
              className="&>div]:bg-blue-500 text-primary"
              value={tasksCompleted}
              max={plan.tasks.length}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <AuditAlert
          url={`${pathname}/audit?planId=${plan.id}`}
          label="Continue Audit Plan"
        />
      </CardFooter>
    </Card>
  );
}