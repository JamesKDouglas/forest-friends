
// Primary types come from the Prisma object/client now, and are imported using that. 
// Of course they are defined originally in the Prisma schema.

//However, there are other types that we use in the app - derived types. For example there is no customer data type. So if we want to show a list of customers it's derived from the reservations data.

export type Customer = {
  //an id is handy because it will become part of a react table and we want a unique id for that.
  id: string;
  name: string;
  email: string;
};

// period can be days or weeks. 
export type Attendance = {
  period: number;
  children: number;
};

// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// };

// export type Customer = {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   childNames: Array<[string]>;
// };

export type Reservation = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  customerName: string;
  childNames: string;
  amount: number;
  paid: true | false; 
  notes: string;
  scheduleId: number;
};

export type LatestReservations = Array<Reservation>;

export type Schedule = {
  id:number,
  name: string;
  desc: string;
  startList:[Date, Date],//This is how you declare a type of array of dates - just more than one.
  endList:[Date, Date],
}

export type Schedules = Array<Schedule>;
// The database returns a number for amount, but we later format it to a string with the formatCurrency function
// export type LatestReservationRaw = Omit<LatestReservation, 'amount'> & {
//   amount: number;
// };

// export type ReservationsTable = {
//   id: string;
//   email: string;
//   customerName: string;
//   childName: string;
//   status: 'pending' | 'paid';
//   campTime: Array<[string, string, string]>
//   amount: number;
// };

// export type CustomersTableType = {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   childNames: Array<[string]>;
//   total_reservations: number;
//   total_pending: number;
//   total_paid: number;
// };

// export type FormattedCustomersTable = {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   childNames: Array<[string]>
//   total_reservations: number;
//   total_pending: string;
//   total_paid: string;
// };

// export type FormattedReservationsTable = {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   childNames: Array<[string]>
//   total_reservations: number;
//   total_pending: string;
//   total_paid: string;
// };

// export type Customer = {
//   name: string;
// };



// export type ReservationForm = {
//   id: string;
//   email: string;
//   customerName: string;
//   childName: string;
//   status: 'pending' | 'paid';
//   campTime: Array<[string, string, string]>
//   amount: number;
// };

