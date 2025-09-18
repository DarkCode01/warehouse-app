import { AuditResultStatus } from "@/core/enums/audit";
import { binService } from "@/services/bin";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

interface Props {
  expected: number;
  binCode: string;
  binId: string;

  callback: (status: AuditResultStatus) => void;
}

export const Count = ({ expected, binCode, binId, callback }: Props) => {
  const [counted, setCounted] = useState<number>();
  const [notes, setNotes] = useState<string>();
  const status = counted === expected ? AuditResultStatus.PASS : AuditResultStatus.FAIL;

  const auditBin = async () => {

    toast.promise(
      () =>
        binService.audit({
          expected_count: expected,
          actual_count: counted!,
          status,
          bin_id: binId,
          discrepancy: counted! - expected,
          notes,
        }),
      {
        loading: 'Auditing bin...',
        success: async () => {
          callback(status);
          return {
            type: 'success',
            message: 'Bin Audited!',
          };
        },
        error: () => ({
          message: `Audit failed for bin ${binCode}`,
          description:
            'Unable to complete audit. Please try again or contact support.',
        }),
      }
    );
  };

  return (
    <div className="space-y-10">
      

      <div className="flex flex-col gap-4">
        <Input
          type="number"
          placeholder="0"
          className="p-6 text-xl border-2 text-center"
          onChange={(e) => setCounted(+e.target.value)}
          min="0"
        />

        <div>
          <label htmlFor="">Notes (optional)</label>
          <Textarea onChange={(e) => setNotes(e.target.value)}></Textarea>
        </div>

        {counted !== undefined && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-gray-700">Expected:</p>
              <span className="font-bold">{ expected}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700">Counted:</p>
              <span className="font-bold">{counted}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <p className="text-gray-700">Discrepancy:</p>
              <span
                className={clsx({
                  'text-red-600': counted - expected !== 0,
                  'text-yellow-600': counted - expected === 0,
                })}
              >
                {counted - expected}
              </span>
            </div>
          </div>
        )}
      </div>

      <Button size="full" onClick={auditBin}>
        Submit Count
      </Button>
    </div>
  );
}