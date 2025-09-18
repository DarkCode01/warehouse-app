'use client'

import { ClipboardList, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

interface Props {
  onSubmit: (name: string, count: number) => void;
}

export const CreatePlan = ({ onSubmit }: Props) => {
  const [name, setName] = useState<string>();
  const [count, setCount] = useState<number>(10);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus />
          Create New Plan
        </CardTitle>
        <CardDescription className="mt-2">
          Generate an audit plan for the highest risk bins.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label>Plan Name</label>
            <Input
              placeholder="e.g, Daily Report 1 - Week 2"
              required
              className="rounded-md h-10"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Number of bins</label>
            <Input
              placeholder="e.g, 10"
              required
              defaultValue="10"
              className="rounded-md h-10"
              type="number"
              onChange={e => setCount(e.target.value)}
            />
          </div>

          <Button size="full" type="button" onClick={() => onSubmit(name!, count)}>
            <ClipboardList />
            Generate Plan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}