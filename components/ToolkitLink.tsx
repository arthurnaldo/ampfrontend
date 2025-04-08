"use client";

import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";

interface ToolkitLinkProps {
  title: string;
  description: string;
  href?: string;
}

export default function ToolkitLink({
  title,
  description,
  href,
}: ToolkitLinkProps) {
  return (
    <Card className="h-40">
      <CardHeader className="flex flex-row items-start gap-2">
        <InfoIcon className="h-6 w-6" />
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          {href ? (
            <CardDescription>
              <a href={href} className="underline hover:text-blue-800">
                {description}
              </a>
            </CardDescription>
          ) : (
            <CardDescription className="underline">
              {description}
            </CardDescription>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
