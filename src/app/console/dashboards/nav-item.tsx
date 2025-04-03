'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/_common/ui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={clsx(
            'flex flex-col w-full items-center justify-center text-muted-foreground hover:text-white text-sm m-0 transition-all rounded-none font-poppins',
            {
              'nav-select': pathname === href
            }
          )}
        >
          {children}
          <span className="mt-1 text-xs">{label}</span>
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="font-poppins">{label}</TooltipContent>
    </Tooltip>
  );
}
