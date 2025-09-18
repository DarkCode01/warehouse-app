import { BaseModel } from "@/shared/types/base-model";
import { AuditPlanStatus, AuditResultStatus, AuditTaskStatus } from "../enums/audit";
import { Bin } from "./bin";

export interface AuditPlan extends BaseModel {
  name: string;
  description: string;
  status: AuditPlanStatus;
  warehouse_id: string;
  tasks: Array<AuditTask>;
}

export interface AuditTask extends BaseModel {
  planId: string;
  bin_id: string;
  status: AuditTaskStatus;
  bin: Bin;
  results: Array<AuditResult>;
}

export interface AuditResult extends BaseModel {
  taskId: string;
  bin_id: string;
  expected_count: number;
  actual_count: number;
  discrepancy: number;
  status: AuditResultStatus;
  notes?: string;
}

export interface AuditPlanPayload {
  name: string;
}