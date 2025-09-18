import { BaseModel } from "@/shared/types/base-model";
import { Aisle } from "./aisle";

export interface Rack extends BaseModel {
  number: number;
  aisleId: string;

  aisle: Aisle;
}