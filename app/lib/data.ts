import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  ReservationForm,
  ReservationsTable,
  LatestReservationRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestReservations() {
  try {
    const data = await sql<LatestReservationRaw>`
      SELECT reservations.amount, customers.name, customers.email, reservations.id
      FROM reservations
      JOIN customers ON reservations.customer_id = customers.id
      ORDER BY reservations.date DESC
      LIMIT 5`;

    const latestReservations = data.rows.map((reservation) => ({
      ...reservation,
      amount: formatCurrency(reservation.amount),
    }));
    return latestReservations;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest reservations.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const reservationCountPromise = sql`SELECT COUNT(*) FROM reservations`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const reservationStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM reservations`;

    const data = await Promise.all([
      reservationCountPromise,
      customerCountPromise,
      reservationStatusPromise,
    ]);

    const numberOfReservations = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidReservations = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingReservations = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfReservations,
      totalPaidReservations,
      totalPendingReservations,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredReservations(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const reservations = await sql<ReservationsTable>`
      SELECT
        reservations.id,
        reservations.amount,
        reservations.date,
        reservations.status,
        customers.name,
        customers.email,
      FROM reservations
      JOIN customers ON reservations.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        reservations.amount::text ILIKE ${`%${query}%`} OR
        reservations.date::text ILIKE ${`%${query}%`} OR
        reservations.status ILIKE ${`%${query}%`}
      ORDER BY reservations.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return reservations.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reservations.');
  }
}

export async function fetchReservationsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM reservations
    JOIN customers ON reservations.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      reservations.amount::text ILIKE ${`%${query}%`} OR
      reservations.date::text ILIKE ${`%${query}%`} OR
      reservations.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of reservations.');
  }
}

export async function fetchReservationById(id: string) {
  try {
    const data = await sql<ReservationForm>`
      SELECT
        reservations.id,
        reservations.email,
        reservations.amount,
        reservations.status
      FROM reservations
      WHERE reservations.id = ${id};
    `;

    const reservation = data.rows.map((reservation) => ({
      ...reservation,
      // Convert amount from cents to dollars
      amount: reservation.amount / 100,
    }));

    return reservation[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reservation.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  COUNT(reservations.id) AS total_reservations,
		  SUM(CASE WHEN reservations.status = 'pending' THEN reservations.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN reservations.status = 'paid' THEN reservations.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN reservations ON customers.id = reservations.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email,
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
