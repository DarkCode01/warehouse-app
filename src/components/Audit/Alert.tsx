import { Separator } from "@radix-ui/react-separator";
import { Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import QrCode from 'react-qr-code';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface Props {
  url: string;
  label: string;
}

export const AuditAlert = ({ url, label }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full col-span-2" asChild>
        <Button size="full" className="w-full">
          <Smartphone />
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Start Audit
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center flex items-center justify-center gap-2">
            <Smartphone /> <span className="font-medium">Scan with Mobile</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center flex-col justify-center gap-4">
          <div className="bg-white p-4  border rounded-md">
            <QrCode
              value={`${process.env.NEXT_PUBLIC_URL}${url}`}
              width={30}
              height={30}
              className="max-w-56 h-full"
            />
          </div>

          <p>Scan this QR code with your phone to start the audit on mobile</p>

          <Separator />

          <div className="w-full space-y-4">
            <AlertDialogCancel asChild>
              <Button
                variant="ghost"
                size="full"
                className="p-6 border-none text-gray-600 shadow-none"
              >
                Cancel
              </Button>
            </AlertDialogCancel>
            <Link href={url}>
              <Button size="full">
                <Monitor />
                Continue on Web
              </Button>
            </Link>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}