import { BaseModel } from "@/shared/types/base-model";

export interface BinActivity extends BaseModel {
  bin_id: string;
  type: BinActivity;
  quantity: number;
  notes?: string;
}