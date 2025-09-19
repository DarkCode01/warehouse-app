import {
  Bin,
  BinActivity,
  BinAuditRequest,
  BinAuditResponse,
} from '@/core/models/bin';
import { http } from '@/shared/infra/axios';
import { ApiResponse } from '@/shared/types/api';

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

  async getActivities(binId: string): Promise<ApiResponse<Array<BinActivity>>> {
    try {
      const response = await http.get(`/bins/${binId}/activities`);

      return response.data;
    } catch (err) {
      return { data: [], status: 500 };
    }
  }
}

export const binService = new BinService();
