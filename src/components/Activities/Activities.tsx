'use client';

import { BinActivityTypes } from "@/core/enums/bin-activity";
import { useBinActivities } from "@/core/hooks/useActivities";
import { DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  binId: string;
  binCode: string;
  isOpen: boolean;
  onCloseOpen: () => void;
  type?: BinActivityTypes;
}

export const Activities = ({ isOpen, onCloseOpen, binId, binCode, type }: Props) => {
  const { isLoading, isError, activities } = useBinActivities(binId);
  const filteredActivities = useMemo(() => {
    if (!type) return activities;
    
    return activities.filter(act => act.type === type);
  }, [activities, type]);

  if (isLoading) return '....';
  if (isError) return 'eoror';
  if (activities.length === 0) return '0';

  return (
    <Dialog open={isOpen} onOpenChange={onCloseOpen}>
      {/* <DialogContent> */}

      <DialogContent className="h-1/2 w-full! max-w-1/2!">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Bin ({binCode}) Activities
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 overflow-y-auto h-full">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 py-3 px-4 bg-muted/30 rounded-lg text-sm font-medium text-muted-foreground border">
            {/* <div>Bin Code</div> */}
            <div>Type Action</div>
            <div>Qty</div>
            <div className="col-span-2">Notes</div>
            <div>Date</div>
          </div>

          {/* Table Content */}
          <div className="space-y-2 overflow-y-auto h-">
            {filteredActivities.map((activity) => {
              return (
                <div
                  key={activity.id}
                  className="grid grid-cols-5 gap-4 py-3 px-4 rounded-lg border border-border/40 hover:border-border/60 hover:bg-gray-100/50 transition-colors cursor-pointer items-center"
                >
                  {/* <div className="font-medium">{binCode}</div> */}
                  <Badge variant="outline" className="font-medium">
                    {activity.type}
                  </Badge>
                  <div className="text-muted-foreground">
                    {activity.quantity}
                  </div>
                  <div className="text-muted-foreground col-span-2">
                    {activity.notes}
                  </div>
                  <div className="text-muted-foreground">
                    {dayjs(activity.created_at).format('dd DD YYYY')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="secondary">Close</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};