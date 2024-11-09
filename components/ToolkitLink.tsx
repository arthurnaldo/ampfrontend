"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";

interface ToolkitLinkProps {
  title: string;
  description: string;
}

export default function ToolkitLink({ title, description }: ToolkitLinkProps) {
  return (
    <div className="flex h-40 py-3">
      <div className="px-2 pt-1">
        <InfoCircledIcon className="h-6 w-6"></InfoCircledIcon>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-xl font-bold">{title}</p>
        <p className="underline">{description}</p>
      </div>
    </div>
  );
}
