import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteSchedule } from '@/app/lib/actions';

export function DeleteSession(id, session){
  //delete the session with id id from the sessions array and send the modified array back
  return ('d');
}
export function DuplicateSessionTomorrow(id, session){
  //duplicate the session with id id except change start and end dates to the next day on the duplicate.
  return ('dupt');
}

export function DuplicateSessionNextWeek(id, session){
  return ('dupnw');
}

export function DuplicateSessionNextMonth(id, session){
  return ('dupnm');
}


export function CreateSchedule() {
  return (
    <Link
      href="/dashboard/schedules/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Schedule</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSchedule({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/schedules/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteSchedule({ id }: { id: string }) {
  const deleteScheduleWithId = deleteSchedule.bind(null, id);

  return (
    <form action={deleteScheduleWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
