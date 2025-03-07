import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  selected: boolean;
}

export default function NavBarLink({ text, selected }: Props) {
  return (
    <Button
      variant={selected ? "secondary" : "ghost"}
      className={cn(
        "transition-all hover:bg-accentSecondary hover:text-accentPrimary",
        selected ? "bg-white text-accentPrimary" : "text-white",
      )}
    >
      {text}
    </Button>
  );
}
