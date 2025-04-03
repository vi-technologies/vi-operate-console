'use client';

import { CardIcon } from '@/components/universal/card-icon';

export function mapCardIcon(Icon: React.ReactNode) {
  return ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <CardIcon key={title} title={title} icon={Icon} children={children} />
  );
}
