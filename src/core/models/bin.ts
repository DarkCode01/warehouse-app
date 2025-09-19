import { BinActivityTypes } from '@/core/enums/bin-activity';
import { BaseModel } from '@/shared/types/base-model';
import { Nullable } from '@/shared/types/common';
import { AuditResultStatus, AuditTaskStatus } from '../enums/audit';
import { Rack } from './rack';

export interface Bin extends BaseModel {
  code: string;
  position: number;
  rack_id: string;
  warehouse_id: string;
  pallet_count: number;
  capacity: number;
  last_audit_date: Nullable<Date>;
  risk_score: number;
  audit_factor: number;
  activity_factor: number;
  adjustment_factor: number;
  is_active: number;

  rack: Rack;
}

export interface BinActivity extends BaseModel {
  bin_id: string;
  type: BinActivityTypes;
  quantity: number;
  notes?: string;
}

export interface BinAuditRequest {
  expected_count: number;
  actual_count: number;
  status: AuditResultStatus;
  notes?: string;
  taskId?: string;
  bin_id: string;
  discrepancy: number;
}

export interface BinAuditResponse {
  bin_id: string;
  resultStatus: AuditResultStatus;
  taskStatus: AuditTaskStatus;
}
