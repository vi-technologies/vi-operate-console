import CardIcon from '../cards/card-icon';

export default function CardList({
  icon,
  data,
  cols = 3
}: {
  icon: React.ReactNode;
  data: { title: string }[];
  cols?: number;
}) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-${cols}`}>
      {data.map(mapCardIcon(icon))}
    </div>
  );
}

export function mapCardIcon(Icon: React.ReactNode) {
  return ({
    title,
    children = null
  }: {
    title: string;
    children?: React.ReactNode;
  }) => (
    <CardIcon
      key={title}
      title={title}
      icon={Icon}
      children={children}
      // onClick={() => router.push(`/console/automations/${workflow.title}`)}
    />
  );
}
