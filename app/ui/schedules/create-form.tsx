'use client';

import { Schedule } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createSchedule } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

// {/* This page is only accessible if the user is authorized as an employee to make schedules! Because of that it's not part of the first version, which is only the public facing site (schedules are made manually by running a js script to 'seed data') but I started building it already. */}
export default function Form({schedule}: {schedule:Schedule}) {
  const initialState = { message: null, errors: {}};
  const [state, dispatch] = useFormState(createSchedule, initialState);

  // const schedules = await fetchSchedules();
  console.log("Schedule: ", schedule);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Schedule Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="scheduleName"
                type="string"
                placeholder="Enter of schedule, animal names suggested. Ex 'Camp BearCubs'"
                // check to see if the name is already taken? with aria?
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Schedule Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="desc"
                name="scheduleDesc"
                type="string"
                placeholder="Enter description of schedule. Ex 'Friday evenings 5 to 9pm starting in March, 2024."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Schedule. This needs to generate a list of start dates/times and end dates/times. */}
        <div className="mb-4">
          <label htmlFor="schedule" className="mb-2 block text-sm font-medium">
            Use the Schedule Builder to decribe the exact schedule.
          </label>
            {/* I'm going to need sort of date picker thing. Try to find something like an IoT Wifi plug - generate a list of start/stop times. Imagine starting manually with just a date/time input then making it easier to enter with some widgets like, "duplicate for tomorrow" "duplicate for next week" "duplicate for next month". 

            This is a special kind of date picker. 

            This is a sub-form for each 'session': 
            Choose a start date/time - Use a drop down date picker to choose the day. Use another to choose the time. modify these by typing if you want. 
            Choose the an date the same way.
            Then have an "add" button. This could literally add to the database record with append except there is no record right now, so just hold it in state.

            Then a table showing what has been build - column headings are:
             "start date/time" "end date/time" "delete" "+ next day" "+ next week" "+ next month".
            
             Each entry/row will get an icon for the delete and duplication. 

            */}
          
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/schedules"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Schedule</Button>
      </div>
      </div>
    </form>

  );
}
