import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  reservations: InboxIcon,
};

export default async function CardWrapper() {
  const {
    revThisYr,
    paymentOutst,
    resThisYr,
    custThisYr,
  } = await fetchCardData();

  return (
    <>
        <Card title="Revenue" value={`$${revThisYr/100}`} type="collected" />
        <Card title="Pending" value={`$${paymentOutst/100}`} type="pending" />
        <Card title="Total reservations" value={resThisYr} type="reservations" />
        <Card
          title="Total Customers"
          value={custThisYr}
          type="customers"
        />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'reservations' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
