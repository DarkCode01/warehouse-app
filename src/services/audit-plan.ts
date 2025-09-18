import { AuditPlan, AuditPlanPayload } from "@/core/models/audit";
import { http } from "@/shared/infra/axios";
import { ApiResponse } from "@/shared/types/api";


export class AuditPlanService {
  async getPlans(warehouseId: string): Promise<ApiResponse<Array<AuditPlan>>> {
    try {
      const response = await http.get(`/plans/${warehouseId}/all`);

      return response.data;
    } catch (err) {
      return { data: [], status: 500 };
    }
  }

  async getActive(warehouseId: string): Promise<ApiResponse<AuditPlan>> {
    try {
      const response = await http.get(`/plans/${warehouseId}/recent`);

      return response.data;
    } catch (err) {
      return { data: {}, status: 500 };
    }
  }

  async getDetails(planId: string): Promise<ApiResponse<AuditPlan>> {
    try {
      const response = await http.get(`/plans/${planId}`);

      return response.data;
    } catch (err) {
      return { data: {}, status: 500 };
    }
  }

  async generate({
    warehouseId,
    count,
    payload,
  }: {
    warehouseId: string;
    count: number;
    payload: AuditPlanPayload;
  }): Promise<ApiResponse<AuditPlan>> {
    return http.post(`/plans/${warehouseId}/generate/${count}`, payload);
  }
}

export const auditPlanService = new AuditPlanService();