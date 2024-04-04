'use client';

import { Reservation, Schedules } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateReservation } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ 
  reservation, 
  schedules 
}: {
  reservation: Reservation; 
  schedules: Schedules[];
}) {
  const initialState = { message: null, errors: {}};
  const updateReservationWithId = updateReservation.bind(null, reservation.id);
  const [ state, dispatch ] = useFormState(updateReservationWithId, initialState);

  
  return  <>
    <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Reservation Id
          </label>
          <div className="relative">
            <input
              id="id"
              name="id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={reservation.id}
              readOnly
            />
             
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
                        
        </div>
        
    <form action = {dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Customer name
          </label>
          <div className="relative">
            <input
              id="customer"
              name="customerName"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={reservation.customerName}
            />
             
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
                        
          <div id="customer-error" aria-live="polite" aria-atomic="true">
                {console.log(state)}
                {state.errors?.customerName && state.errors.customerName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
          </div>
        </div>
        {/* email */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={reservation.email}
            />
             
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
                        
          <div id="customer-error" aria-live="polite" aria-atomic="true">
                {console.log(state)}
                {state.errors?.email && state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
        </div>
        {/* Child Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Camper name
          </label>
          <div className="relative">
            <input
              id="child"
              name="childNames"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={reservation.childNames}
            />
             
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
                        
          <div id="customer-error" aria-live="polite" aria-atomic="true">
                {console.log(state)}
                {state.errors?.childNames && state.errors.childNames.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
        </div>
        {/* schedule */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Schedule
          </label>
          <div className="relative">
          <select
              id="schedule"
              name="scheduleId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 pr-8 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={schedules[reservation.scheduleId-1].desc}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a schedule
              </option>
              {schedules.map((schedule) => {
                  return(
                  <option key={schedule.id} value={schedule.id}>
                    {schedule.desc}
                  </option>
                  );
                }
              )}
            </select>
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" /> 
          </div>
                        
          <div id="customer-error" aria-live="polite" aria-atomic="true">
                {console.log(state)}
                {state.errors?.schedule && state.errors.schedule.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
          </div>
        </div>

        {/*  Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
        
                defaultValue={reservation.amount}
                placeholder="Enter CAD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
                          
            <div id="customer-error" aria-live="polite" aria-atomic="true">
                {console.log(state)}
                {state.errors?.amount && state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
          {/* notes */}
          <div className="mb-4">
                    <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                      Notes
                    </label>
                    <div className="relative mt-2 rounded-md">
                      <div className="relative">
                        <textarea
                          id="notes"
                          name="notes"
                          placeholder=""
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                          defaultValue={reservation.notes}
                        >
                        </textarea>
                      </div>
                    </div>
                  </div>
        {/* Reservation Paid Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the reservation status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="false"
                  name="paid"
                  type="radio"
                  value="false"
                  defaultChecked={!reservation.paid}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="customer-error"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="true"
                  name="paid"
                  type="radio"
                  value="true"
                  defaultChecked={reservation.paid}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid 
                  <CheckIcon className="h-4 w-4" />
                </label>
              </div>

            </div>

          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.paid &&
              state.errors.paid.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">    
            <p className="mt-2 text-sm text-red-500">
              {state.message}
            </p>    
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/reservations"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Reservation</Button>
      </div>
    </form>
    </>
  
}
