'use client';

import { Schedule } from '@/app/lib/definitions';
import {
  CheckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import ScheduleMaker from '@/app/ui/schedules/scheduleMaker';
import { useFormState } from 'react-dom';
import { updateSchedule } from '@/app/lib/actions';

export default function Form({
  schedule,
}: {
  schedule: Schedule;
}) {

  const initialState  = {message: null, errors:{}};
  const updateScheduleById = updateSchedule.bind(null, schedule.id);

  let newStartListStr = "";
  let newEndListStr = "";
  const prepFormInput = ({newStartList, newEndList}:{newStartList:string, newEndList:string}) => {
    newStartListStr = newStartList;
    newEndListStr = newStartList;
  }

  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Schedule Id (not changeable)
          </label>
          <div className="relative">
            <input
              id="id"
              name="id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={schedule.id}
              readOnly
            />
             
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

        {/* Schedule Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Schedule Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={schedule.name}
            />
            <CheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="notes" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="desc"
                name="desc"
                placeholder=""
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={schedule.desc}
              >
              </textarea>
            </div>
          </div>
        </div>

        {/* Current Schedule */}
        <ScheduleMaker schedule = {schedule}/>
      </div>
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/schedules"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Schedule</Button>
      </div>
    </form>
  );
}
