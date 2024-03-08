//Try using Prisma to seed the database with these types.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  childNames: Array<[string]>;
};

export type Reservation = {
  id: string;
  email: string;
  customerName: string;
  childNames: string;
  amount: number;
  status: 'pending' | 'paid'; 
  campTime: Array<Array<[string, string, string]>>;
};

export type ExpectedAttendance = {
  year: number;
  quarter: number;
  children: number;
};

export type LatestReservation = {
  id: string;
  email: string;
  childNames: string;
  amount: number;
  status: 'pending' | 'paid'; 
  startDate: string;
  endDate: string;
  campTime: Array<Array<[string, string, string]>>, 
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestReservationRaw = Omit<LatestReservation, 'amount'> & {
  amount: number;
};

export type ReservationsTable = {
  id: string;
  email: string;
  customerName: string;
  childName: string;
  status: 'pending' | 'paid';
  campTime: Array<[string, string, string]>
  amount: number;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  childNames: Array<[string]>;
  total_reservations: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  phone: string;
  childNames: Array<[string]>
  total_reservations: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type ReservationForm = {
  id: string;
  email: string;
  customerName: string;
  childName: string;
  status: 'pending' | 'paid';
  campTime: Array<[string, string, string]>
  amount: number;
};

export type Revenue = {
  month: string;
  revenue: number;
};