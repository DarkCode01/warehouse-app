import { ListCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export const Empty = () => {
  const pathname = usePathname();

  return (
    <div className="p-4 bg-white flex items-center justify-center py-12 h-full border rounded-lg flex-col gap-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ListCheck className="w-8 h-8 text-gray-400" />
        </div>

        <h1 className="text-black text-lg">No audit plan active</h1>
        <p className="text-gray-500 text-sm">
          Create an audit plan to start inspecting warehouse bins and tracking
          progress.
        </p>
      </div>

      <div className="space-y-1 flex-col flex gap-2">
        <Link href={`${pathname}/plans`} className="w-full">
          <Button variant="outline" className="w-full">
            See Previous
          </Button>
        </Link>
        <Link href={`${pathname}/plans`} className="w-full">
          <Button className="hover:opacity-80">
            Create New Audit Plan!
          </Button>
        </Link>
      </div>
    </div>
  );
}