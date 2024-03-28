import Breadcrumbs from '@/app/ui/reservations/breadcrumbs';
import Form from '@/app/ui/reservations/edit-form';
import { fetchReservationById, fetchSchedules } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = +params.id;
  console.log("trying to edit reservation with ID:", id);
  const [reservation, schedules] = await Promise.all([fetchReservationById(id), fetchSchedules()]);
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