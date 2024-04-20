import Breadcrumbs from '@/app/ui/schedules/breadcrumbs';
import Form from '@/app/ui/schedules/edit-form';
import { fetchScheduleById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Schedule } from '@/app/lib/definitions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Edit Schedule",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log("trying to edit schedule with ID:", id);
  const schedule: Schedule = await fetchScheduleById(id);
  
if (!schedule){
  notFound();
}
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'schedules', href: '/dashboard/schedules' },
          {
            label: 'Edit Schedule',
            href: `/dashboard/schedules/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form schedule = {schedule}/>
    </main>
  );
}