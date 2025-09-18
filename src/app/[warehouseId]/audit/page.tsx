'use client';

import { Count } from "@/components/Audit/Count";
import { BinDetails } from "@/components/Bin/BinDetails";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AuditResultStatus, AuditTaskStatus } from "@/core/enums/audit";
import { AuditPlan } from "@/core/models/audit";
import { Bin } from "@/core/models/bin";
import { countTasksCompleted } from "@/lib/tasks";
import { auditPlanService } from "@/services/audit-plan";
import { binService } from "@/services/bin";
import { ArrowLeft, Calculator, CheckCircle, ClipboardCheck, Package, Search, SkipForward, XCircle } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Audit() {
  const params = useSearchParams();
  const paramsUrl = useParams();
  const router = useRouter();
  const [binCode, setBinCode] = useState<string>();
  const [planId, setPlanId] = useState<string>();
  const [bin, setBin] = useState<Bin>();
  const [plan, setPlan] = useState<AuditPlan>();
  const [open, setOpen] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResultStatus>();

  const warehouseId = paramsUrl.warehouseId as string;

  const tasksCompleted = useMemo(() => countTasksCompleted(plan?.tasks || []), [plan]);

  const getNextTask = (currentPlan: AuditPlan, currentCode: string) => {
    return currentPlan.tasks.find(task => task.status === AuditTaskStatus.PENDING && task.bin.code !== currentCode);
  }

  const getBinDetails = useCallback(async (defaultBinCode: string) => {
    toast.promise(() => binService.getBin(defaultBinCode), {
      loading: 'Getting bin\'s details...',
      success: async (response) => {
        if (response.status === 200) {
          setBin(response.data);
          
          // scroll into details
          const detailsElement = document.querySelector(`#bin-details`);

          if (detailsElement) detailsElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'end'
          });
        } else {
          throw new Error('Not found');
        }

        return {
          type: 'success',
          message: 'Bin found!',
        };
      },
      error: () => ({
        message: 'Bin not found',
        description: 'Please check the code and try again.',
      }),
    });
  }, []);

  const getPlanDetails = useCallback(async (defaultPlanId: string) => {
    toast.promise(() => auditPlanService.getDetails(defaultPlanId), {
      loading: 'Getting plan\'s tasks...',
      success: async (response) => {
        if (response.status === 200) {
          setPlan(response.data);

          // load the first task pending
          const task = response.data.tasks.find(task => task.status === AuditTaskStatus.PENDING);
          
          if (task && !binCode) {
            setBinCode(task.bin.code);

            getBinDetails(task.bin.code);
          };
        } else {
          throw new Error('Not found');
        }

        return {
          type: 'success',
          message: 'Plan loaded!',
        };
      },
      error: () => ({
        message: 'Plan not found',
        description: 'Please check the code and try again.',
      }),
    });
  }, [binCode, getBinDetails]);


  useEffect(() => {
    const paramBinCode = params.get('binCode');
    const paramPlanId = params.get('planId');

    if (paramBinCode && paramBinCode !== binCode) {
      setBinCode(paramBinCode);
      (async () => await getBinDetails(paramBinCode))();
    }

    if (paramPlanId && paramPlanId !== planId) {
      setPlanId(paramPlanId);
      (async () => await getPlanDetails(paramPlanId))();
    }
  }, [binCode, getBinDetails, params, getPlanDetails, planId]);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6 overflow-y-auto">
      <div className="max-w-md mx-auto w-full flex flex-col gap-4">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push(`/${warehouseId}`)}
          >
            <ArrowLeft /> Back to Dashboard
          </Button>
        </div>
        <Card className="border border-gray-200 ">
          <CardHeader className="pb-3 items-center flex-col flex justify-center">
            <div className="p-3 w-fit rounded-full bg-primary/10 mb-4">
              <Search className="text-primary" />
            </div>

            <CardTitle className="text-lg text-gray-900 text-center">
              Find Bin
            </CardTitle>
            <CardDescription className="text-center">
              Enter a bin code to view detailed information and start counting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-4 flex-col">
              <Input
                placeholder="Enter bin code"
                value={binCode}
                onChange={(e) => {
                  if (auditResult) {
                    setAuditResult(undefined);
                  }
                  setBinCode(e.target.value.toUpperCase());
                }}
                className="!text-lg p-6 font-medium text-gray-600"
                onKeyDown={(e) =>
                  e.key === 'Enter' && binCode && getBinDetails(binCode!)
                }
              />
              <Button
                size="full"
                disabled={!binCode}
                onClick={() => getBinDetails(binCode!)}
              >
                <Search className="h-4 w-4" />
                Search Bin
              </Button>
            </div>
          </CardContent>
        </Card>

        {plan && (
          <Card>
            <CardContent className="flex items-center gap-2">
              <div className="bg-chart-2/40 w-fit p-2 rounded-xl">
                <ClipboardCheck size={33} className="text-chart-2" />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <CardTitle>{plan.name}</CardTitle>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
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
          </Card>
        )}

        {!bin && (
          <Card className="border border-gray-200">
            <CardHeader className="items-center flex-col flex! justify-center p-0">
              <div className="p-3 w-fit rounded-full bg-gray-500/10">
                <Package className="text-gray-400" />
              </div>
              <CardTitle className="mt-2 text-gray-600 font-medium">
                Search for a bin code to start counting
              </CardTitle>
            </CardHeader>
          </Card>
        )}

        {auditResult === AuditResultStatus.PASS && (
          <Alert className="text-chart-2 bg-chart-2/30 font-bold">
            <CheckCircle />
            <AlertTitle>Bin Audit Passed!</AlertTitle>
          </Alert>
        )}

        {auditResult === AuditResultStatus.FAIL && (
          <Alert className="text-chart-2 bg-chart-2/30 font-bold">
            <XCircle />
            <AlertTitle>Bin Audit Failed!</AlertTitle>
          </Alert>
        )}

        {bin !== undefined && (
          <Dialog open={open} onOpenChange={setOpen}>
            <Card id="bin-details">
              <CardHeader className="flex gap-4 justify-between items-center">
                <CardTitle className="text-2xl">{bin.code}</CardTitle>
                <div className="flex gap-2 items-center text-base rounded-lg py-2 px-4 justify-between bg-chart-2/12 text-chart-2 font-medium">
                  <p>Expected: </p>
                  <p className="font-bold">{bin.pallet_count}</p>
                </div>
              </CardHeader>
              <CardContent className="h-full -mt-1">
                <div className="space-y-1">
                  <BinDetails
                    aisleCode={bin.rack.aisle.code}
                    rackNumber={bin.rack.number}
                    riskScore={bin.risk_score}
                    lastAuditDate={bin.last_audit_date}
                    pallets={bin.pallet_count}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex gap-4 w-full">
                {plan && plan?.tasks?.length > 1 && (
                  <div>
                    <Button
                      variant="outline"
                      type="button"
                      size="full"
                      onClick={() => {
                        if (!binCode) return;

                        const nextTask = getNextTask(plan, binCode);

                        if (!nextTask) return;

                        router.push(
                          `audit?planId=${planId}&binCode=${nextTask.bin.code}`
                        );
                      }}
                    >
                      <SkipForward /> Skip
                    </Button>
                  </div>
                )}

                <DialogTrigger className="w-full">
                  <Button type="button" size="full">
                    <Calculator /> Add Count
                  </Button>
                </DialogTrigger>
              </CardFooter>
            </Card>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Record Count (Expected: {bin.pallet_count})
                </DialogTitle>
                <DialogDescription>
                  Enter the actual count for verification and audit purposes
                </DialogDescription>
              </DialogHeader>
              <Count
                binId={bin.id}
                binCode={binCode!}
                expected={bin.pallet_count}
                callback={async (status) => {
                  await setAuditResult(status);
                  await getBinDetails(binCode!);

                  if (planId) {
                    await getPlanDetails(planId);
                  }
                  setOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}