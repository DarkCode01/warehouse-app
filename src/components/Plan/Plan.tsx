'use client';

;import { AuditTaskStatus } from '@/core/enums/audit';
import { AuditPlan } from '@/core/models/audit';
import { getRiskColor, getRiskTextColor } from '@/lib/score';
import { countTasksCompleted } from '@/lib/tasks';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { ListCheck, Play } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';

export const PlanItem = ({ plan }: { plan: AuditPlan }) => {
  const params = useParams();
  const warehouseId = params.warehouseId as string;
  const tasksCompleted = useMemo(
    () => countTasksCompleted(plan?.tasks || []),
    [plan]
  );

  return (
    <Card key={plan.id}>
      <Collapsible className="flex flex-col gap-4">
        <CollapsibleTrigger asChild>
          <CardHeader className="flex flex-col gap-4 cursor-pointer">
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="space-y-3">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ListCheck />
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </div>

              <div className="space-y-2 flex-col flex items-end">
                <Badge variant="outline">{plan.status}</Badge>
                <Link href={`/${warehouseId}/audit?planId=${plan.id}`}>
                  <Button variant="outline" size="sm">
                    <Play /> Start Audit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-1 w-full">
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
          </CardHeader>
        </CollapsibleTrigger>
        <CardContent>
          <CollapsibleContent className="data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Audit Tasks</h3>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 py-3 px-4 bg-muted/30 rounded-lg text-sm font-medium text-muted-foreground">
                <div>Bin Code</div>
                <div>Risk Score</div>
                <div>Expected Qty</div>
                <div>Status</div>
                <div>Result</div>
                <div></div>
              </div>

              {/* Table Content */}
              <div className="space-y-2">
                {plan.tasks.map((task) => {
                  const color = getRiskTextColor(task.bin.risk_score);
                  const bgColor = getRiskColor(task.bin.risk_score);

                  return (
                    <div
                      key={task.id}
                      className="grid grid-cols-6 gap-4 py-3 px-4 rounded-lg border border-border/40 hover:border-border/60 hover:bg-gray-100/50 transition-colors cursor-pointer items-center"
                    >
                      <div className="font-medium">{task.bin.code}</div>
                      <Badge className={`font-medium ${bgColor} ${color}`}>
                        {task.bin.risk_score}
                      </Badge>
                      <div className="text-muted-foreground">
                        {task.bin.pallet_count}
                      </div>
                      <div>
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium ${
                            task.status === AuditTaskStatus.PENDING
                              ? 'border-chart-1/30 text-chart-1 bg-chart-1/10'
                              : 'border-chart-2/30 text-chart-2 bg-chart-2/10'
                          }`}
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        {task.results.length > 0 ? task.results[0].status : '-'}
                      </div>
                      <div>
                        <Link
                          href={`/${warehouseId}/audit?binCode=${task.bin.code}`}
                        >
                          <Button variant="outline" size="sm">
                            Audit Task
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
};
