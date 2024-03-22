import { UpdateReservation, DeleteReservation } from '@/app/ui/reservations/buttons';
import ReservationStatus from '@/app/ui/reservations/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredReservations } from '@/app/lib/data';

export default async function ReservationsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const reservations = await fetchFilteredReservations(query, currentPage);
  // console.log(reservations);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {reservations?.map((reservation) => (
              <div
                key={reservation.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{reservation.customerName}</p>
                    </div>
                    <p className="text-sm text-gray-500">{reservation.email}</p>
                  </div>
                  <ReservationStatus status={reservation.paid} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(reservation.amount)}
                    </p>
                    <p>{reservation.campTime}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateReservation id={reservation.id} />
                    <DeleteReservation id={reservation.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Camp Slot
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Paid?
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reservations?.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
        
                      <p>{reservation.customerName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {reservation.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {`$${reservation.amount}`}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {`${reservation.scheduleId}`}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ReservationStatus status={reservation.paid} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateReservation id={reservation.id} />
                      <DeleteReservation id={reservation.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
