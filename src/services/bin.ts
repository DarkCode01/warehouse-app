import { Bin, BinAuditRequest, BinAuditResponse } from "@/core/models/bin";
import { http } from "@/shared/infra/axios";
import { ApiResponse } from "@/shared/types/api";


export class BinService {
  async getBin(binCode: string): Promise<ApiResponse<Bin>> {
    try {
      const response = await http.get(`/bins/code/${binCode}`);

      return response.data;
    } catch (err) {
      return { data: {}, status: 500 };
    }
  }

  async audit(
    payload: BinAuditRequest
  ): Promise<ApiResponse<BinAuditResponse>> {
    return http.post(`/bins/audit`, payload);
  }
}

export const binService = new BinService();