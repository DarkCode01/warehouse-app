import { ListCheck } from 'lucide-react';

export const Empty = () => {
  return (
    <div className="p-4 bg-white flex items-center justify-center py-12 h-full border rounded-lg flex-col gap-6 col-span-3">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ListCheck className="w-8 h-8 text-gray-400" />
        </div>

        <h1 className="text-black text-lg">No Audit Plans</h1>
        <p className="text-gray-500 text-sm">
          Create your first audit plan to systematically review warehouse bins,
          track compliance, and maintain safety standards.
        </p>
      </div>
    </div>
  );
};
