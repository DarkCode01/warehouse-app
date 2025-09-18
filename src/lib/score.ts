export const getRiskColor = (score: number): string => {
  if (score >= 71) return 'bg-risk-critical-bg';
  if (score >= 31) return 'bg-risk-medium-bg';
  return 'bg-risk-low-bg';
};

export const getRiskTextColor = (score: number): string => {
  if (score >= 71) return 'text-risk-critical';
  if (score >= 31) return 'text-risk-medium';
  return 'text-risk-low';
};

export const getRiskLevel = (score: number): string => {
  if (score >= 71) return 'High Risk';
  if (score >= 31) return 'Medium Risk';
  return 'Low Risk';
};
