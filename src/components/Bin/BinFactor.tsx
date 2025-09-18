interface Props {
  label: string;
  value: number;
}

export const BinFactor = ({ label, value }: Props) => {
  return (
    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      <div className="flex items-center gap-2">
        <span className="text-md font-bold text-black">+{value}</span>
      </div>
    </div>
  );
}