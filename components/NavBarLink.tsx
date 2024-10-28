"use client";
interface Props {
  text: string;
  selected: boolean;
}

export default function NavBarLink({ text, selected }: Props) {
  return (
    <div
      className={`grid cursor-pointer place-items-center rounded-lg px-3 py-1 ${selected ? "bg-white text-accentPrimary" : "text-white"} transition-all hover:bg-accentSecondary hover:text-accentPrimary`}
    >
      {text}
    </div>
  );
}
