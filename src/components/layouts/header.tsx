'use client';

import { tour } from '@/lib/tour';
import { Play } from 'lucide-react';
import { Button } from '../ui/button';

export const Header = () => {
  return (
    <header className="border-b border-border/60 bg-white/80">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Warehouse Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage inventory and track warehouse operations
            </p>
          </div>

          <Button onClick={() => tour.drive()}>
            <Play />
            Take a tour
          </Button>
        </div>
      </div>
    </header>
  );
};
