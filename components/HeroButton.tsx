import Link from "next/link";

interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function HeroButton({ href, children }: HeroButtonProps) {
  return (
    <Link href={href}>
      <button className="inline-block rounded-lg border-2 border-transparent bg-gray-200 px-4 py-2 text-sm font-bold uppercase text-gray-800 transition duration-200 hover:bg-gray-100">
        {children}
      </button>
    </Link>
  );
}
