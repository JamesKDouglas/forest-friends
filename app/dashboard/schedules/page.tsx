import Pagination from '@/app/ui/schedules/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/schedules/table';
import { CreateSchedule } from '@/app/ui/schedules/buttons';
import { lusitana } from '@/app/ui/fonts';
import { SchedulesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchSchedulesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Schedules",
};

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

  const totalPages = await fetchSchedulesPages(query);
  
  console.log("totalPages: ", totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Schedules</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search schedules..." />
        <CreateSchedule />
      </div>
      <div className={`${lusitana.className}`}>
        <p>Click the pencil on a schedule to find out more or change it.</p>
      </div>
       <Suspense key={query + currentPage} fallback={<SchedulesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
       </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}