
// Primary types come from the Prisma object/client now, and are imported using that. 
// Of course they are defined originally in the Prisma schema.

import { prisma } from '@prisma/client';

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

export type User = {
  id: string;
  name: string;
  email: string;
};

// export type Customer = {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   childNames: Array<[string]>;
// };

export type Reservation = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  customerName: string;
  childNames: string;
  amount: prisma.Decimal;
  paid: true | false; 
  notes: string;
  scheduleId: number;
};

export type LatestReservations = Array<Reservation>;

export type Schedule = {
  id:number,
  name: string;
  desc: string;
  startList: Date[];//I thought you declared this as [Date, Date], but apparently not. I want an array of dates.
  endList: Date[];
}

export type Schedules = Array<Schedule>;

//This table lists already made schedules and summarizes them. The user can click on them to find out more.
export type SchedulesTableType = {
  id: number;
  desc: string;
  startDay: Date;
  endDay: Date;
}

//if I'm going to have some sort of view that lists stats about the camp schedules,
// total_days: number;
// total_reservations: number;
// total_paid: number;

// export type ReservationsTable = {
//   id: string;
//   email: string;
//   customerName: string;
//   childName: string;
//   status: 'pending' | 'paid';
//   campTime: Array<[string, string, string]>
//   amount: number;
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

// export type ReservationForm = {
//   id: string;
//   email: string;
//   customerName: string;
//   childName: string;
//   status: 'pending' | 'paid';
//   campTime: Array<[string, string, string]>
//   amount: number;
// };

