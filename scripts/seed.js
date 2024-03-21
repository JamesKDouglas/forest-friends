// const { db } = require('@vercel/postgres');

const { PrismaClient } = require('@prisma/client');
const {
    reservations,
    schedules,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedReservations(prisma) {
  try {
    await prisma.reservation.createMany({
        data: reservations,
    });

    console.log(`Put ${reservations.length} reservations into the database`);
  } catch (error) {
    console.error('Error seeding reservations:', error);
    throw error;
  }
}

async function seedSchedules(prisma) {
  try {
    await prisma.schedule.createMany({
        data: schedules,
    });

    console.log(`Put ${schedules.length} schedules into the database.`);
    
  } catch (error) {
    console.error('Error seeding schedules:', error);
    throw error;
  }
}

const prisma = new PrismaClient();

async function main() {  
    await seedSchedules(prisma);
    await seedReservations(prisma);
}

async function nada(){
    return ("");
};

  nada().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
