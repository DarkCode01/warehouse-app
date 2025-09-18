import { BaseModel } from "@/shared/types/base-model";

export interface Aisle extends BaseModel {
  name: string;
  code: string;
  warehouse_id: string;
}