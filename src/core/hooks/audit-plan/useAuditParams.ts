import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuditParams = () => {
  const params = useSearchParams();
  const paramsUrl = useParams();
  const [binCode, setBinCode] = useState<string>();
  const [planId, setPlanId] = useState<string>();

  const warehouseId = paramsUrl.warehouseId as string;

  useEffect(() => {
    const paramBinCode = params.get('binCode');
    const paramPlanId = params.get('planId');

    if (paramBinCode && paramBinCode !== binCode) {
      setBinCode(paramBinCode);
    }

    if (paramPlanId && paramPlanId !== planId) {
      setPlanId(paramPlanId);
    }
  }, [params, binCode, planId]);

  return {
    binCode,
    setBinCode,
    planId,
    setPlanId,
    warehouseId,
  };
};
