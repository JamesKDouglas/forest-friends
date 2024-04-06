import Breadcrumbs from '@/app/ui/reservations/breadcrumbs';
import Form from '@/app/ui/reservations/edit-form';
import { fetchReservationById, fetchSchedules } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { MetaData } from 'next';

export const metadata: Metadata = {
  title: "Edit Reservation",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = +params.id;
  // console.log("trying to edit reservation with ID:", id);
  const [reservation, schedules] = await Promise.all([fetchReservationById(id), fetchSchedules()]);
  
if (!reservation){
  notFound();
}
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'reservations', href: '/dashboard/reservations' },
          {
            label: 'Edit Reservation',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form schedules = {schedules} reservation={reservation} />
    </main>
  );
}