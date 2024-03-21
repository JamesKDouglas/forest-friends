import { Card } from '@/app/ui/dashboard/cards';
import AttendanceChart from '@/app/ui/dashboard/attendance-chart';
import LatestReservations from '@/app/ui/dashboard/latest-reservations';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { AttendanceChartSkeleton, LatestReservationsSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';

 
export default async function Page() {
  //1. How much revenue has been collected this calendar year. - get all of them since jan 1 and add all the amounts.
    //2. How much in outstanding payments stand now. - get all reservations that are marked paid: false since jan 1 and sum them.
    //3. Total reservations made this calendar year. - count all the reservation records made since jan 1. 
    //4. Total customers - get all reservation records. Collect all the customerNames. Make a set. Report the number of unique names

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback = {<CardsSkeleton/>}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback = {<AttendanceChartSkeleton/>}>
          <AttendanceChart/>
        </Suspense>
        <Suspense fallback = {<LatestReservationsSkeleton/>}>
          <LatestReservations/>
        </Suspense>
      </div>
    </main>
  );
}