import { Activity } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  title: string;
  message: string;
}

export const Fallback = ({ title, message }: Props) => {
  return (
    <div className="p-8 bg-white flex items-center justify-center py-12 h-full border rounded-lg flex-col gap-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="w-8 h-8 text-gray-400" />
        </div>

        <h1 className="text-black text-lg">{title}</h1>
        <p className="text-gray-500 text-sm">{message}</p>
      </div>

      <Button variant="secondary">Try Again!</Button>
    </div>
  );
};
