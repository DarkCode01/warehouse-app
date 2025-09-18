import { WarehouseHeatmap, WarehouseStats } from "@/core/models/warehouse";
import { http } from "@/shared/infra/axios";
import { ApiResponse } from "@/shared/types/api";


export class WarehouseService {
  async getHeatmap(
    warehouseId: string
  ): Promise<ApiResponse<WarehouseHeatmap>> {
    try {
      const response = await http.get(`/warehouses/${warehouseId}/heatmap`);

      return response.data;
    } catch (err) {
      return { data: {}, status: 500 };
    }
  }

  async getStats(
    warehouseId: string
  ): Promise<ApiResponse<Array<WarehouseStats>>> {
    try {
      const response = await http.get(`/warehouses/${warehouseId}/stats`);

      return response.data;
    } catch (err) {
      return { data: [], status: 500 };
    }
  }

  async recompute(
    warehouseId: string
  ): Promise<ApiResponse<Array<WarehouseStats>>> {
    try {
      const response = await http.patch(`/warehouses/${warehouseId}/recompute`);

      return response.data;
    } catch (err) {
      return { data: [], status: 500 };
    }
  }
}

export const warehouseService = new WarehouseService();