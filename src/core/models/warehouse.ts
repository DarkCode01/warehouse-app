import { BaseModel } from "@/shared/types/base-model";

export interface Warehouse extends BaseModel {
  name: string;
}

export interface WarehouseHeatmap {
  [keyname: string]: Array<WarehouseHeatmapBin>;
}

export interface WarehouseHeatmapBin {
  id: string;
  code: string;
  position: number;
  riskScore: number;
  palletCount: number;
  capacity: number;
  aisleDescription: string;
  rackNumber: number;
}

export interface WarehouseStats {
  group: string;
  totalBins: number;
  totalPallets: number;
  totalCapacity: number;
  averageRiskScore: number;
}