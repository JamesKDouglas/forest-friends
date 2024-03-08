// This file contains placeholder data. This data is used to seed the database, so its structure/fields are important.
// It also has to match the typing definitions, or at least be compatible. For example a reservation ID is generated by the program so it isn't here in the sample data but it will be part of the database record.
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'employee',
    email: 'generic@employee.com',
    password: 'employee',
  },
];

const customers = [
  {
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    phone: '555-555-5555',
    childNames: ["Small Evil Rabbit", "Good Hedgehog"],
  },
];

const reservations = [
  {
    childNames: ["Good Hedgehog"],
    amount: 100,
    status: 'pending',
    startDate: '2024-04-06',
    endDate: '2024-05-06',
    campTime: [["Friday", "Evening", "Weekly"], ["Saturday", "All Day", "Every Second Week"]],
  },
];

// This is just placeholder right now. I would like to generate this: query the database for each period and calculate the total number of unique names in the childNames field. And it should be for the upcoming year.
const expectedAttendance = [
  {year: 2024, quarter: 1, children: 10 },
  {year: 2024, quarter: 2, children: 15 },
  {year: 2024, quarter: 3, children: 22 },
  {year: 2024, quarter: 4, children: 19 },
];

module.exports = {
  users,
  customers,
  reservations,
  revenue,
};
