'use client'

import { CreatePlan } from "@/components/Plan/Create";
import { ListPlans } from "@/components/Plan/ListPlans";
import { Button } from "@/components/ui/button";
import { usePlans } from "@/core/hooks/audit-plan/usePlans";
import { auditPlanService } from "@/services/audit-plan";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Plans() {
  const params = useParams();
  const router = useRouter();
  const warehouseId = params.warehouseId as string;

  const { isLoading, isError, plans, refresh } = usePlans(warehouseId);
  
  const generatePlan = async (name: string, count: number) => {
    toast.promise(
      () =>
        auditPlanService.generate({
          warehouseId,
          count,
          payload: {
            name,
          },
        }),
      {
        loading: 'Generating Audit Plan...',
        success: async () => {
          refresh();
          return {
            type: 'success',
            message: 'Audit plan created successfully!',
          };
        },
        error: () => ({
          message: 'Failed to generate audit plan',
          description: 'Unable to save your audit plan. Please try again.',
        }),
      }
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto h-full flex flex-col gap-4 p-6 overflow-y-auto">
      <div>
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft /> Back to Dashboard
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col gap-4">
          <CreatePlan onSubmit={(name, count) => generatePlan(name, count)} />
        </div>

        <ListPlans plans={plans} isLoading={isLoading} isError={isError} />
      </div>
    </div>
  );
}
