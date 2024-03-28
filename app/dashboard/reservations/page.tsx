import Pagination from '@/app/ui/reservations/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/reservations/table';
import { CreateReservation } from '@/app/ui/reservations/buttons';
import { lusitana } from '@/app/ui/fonts';
import { ReservationsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchReservationsPages } from '@/app/lib/data';

export default async function Page({
  searchParams
}:{
  searchParams?:{
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchReservationsPages(query);
  console.log("totalPages: ", totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Reservations</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search reservations..." />
        <CreateReservation />
      </div>
      <div className={`${lusitana.className}`}>
        <p>Notes are searched but not displayed in the table below. Click on a reservation to find out more.</p>
      </div>
       <Suspense key={query + currentPage} fallback={<ReservationsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
       </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}