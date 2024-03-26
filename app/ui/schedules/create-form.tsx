import { Schedules, Schedule } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

// {/* This page is only accessible if the user is authorized as an employee to make schedules! Because of that it's not part of the first version, which is only the public facing site (schedules are made manually by running a js script to 'seed data') but I started building it already. */}
export default function Form({schedules}: {schedules:Schedules}) {
  // const schedules = await fetchSchedules();
  // console.log("typeof:", typeof(schedules));
  return (
    <form>
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
                // check to see if the name is already taken - use aria I guess.
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

        {/* Schedule */}
        <div className="mb-4">
          <label htmlFor="schedule" className="mb-2 block text-sm font-medium">
            Use the Scedule Builder to decribe the exact schedule.
            {/* I'm going to need sort of date picker thing. Try to find something like an IoT Wifi plug - generate a list of start/stop times. Imagine starting manually with just a date/time input then making it easier to enter with some widgets. 

            This is a special kind of date picker. 

            Copy iCal: Make an event on a certain day and time. Choose graphically, change by typing if you want. Then enter details. 

            Start date/time. Stop date/time. Repeat every day week month. (location/notes fields?)
            
            Use a button to "add to schedule" as in iCal where you press enter.

            Display the schedule made graphically, with pagination by month I guess. And a table of start/stop times.

            This will require changing the definitions, schema and make new migration and client. 
            */}
          </label>
          <div className="relative">
            {/* <select
              id="schedule"
              name="scheduleId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            > */}

            {/* Make event widget https://react-spectrum.adobe.com/react-aria/DatePicker.html */}
            {/* "add to schedule button" */}
            {/* Output start/stop event table. 2 columns? */}
            {/* Save Schedule button */}

            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {/* {state.errors?.customerId &&
          state.errors.customerId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p> */}

          {/* ))} */}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/reservations"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Reservation</Button>
      </div>
      </div>
    </form>

  );
}
