// const { db } = require('@vercel/postgres');

const { PrismaClient } = require('@prisma/client');
const {
    reservations,
    schedules,
    users,
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

async function deleteSchedules(prisma){
  try{
    await prisma.schedule.deleteMany();
    console.log("all schedules in schedule table deleted.")
  } catch (e){
    console.log(e);
  }
}
let name = "";
let desc = "";
async function updateSchedules(prisma){
  console.log("yes hello updating schedules now")
  try{
    for (let id=1;id<=3;id++){
      name = schedules[id-1].name;
      desc = schedules[id-1].desc;

      const log = await prisma.schedule.update({
        where:{
          id: id,
        }, 
        data:{
          name: name,
          desc: desc,
        }
      });

      console.log("prisma came back with:", log);

    }
    
  } catch (e){
    console.log(e);
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

async function seedUsers(prisma){
  console.log("seeding users")
  try {const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
        },
      });
    }),
  );

  console.log(`database response after putting in users:`, insertedUsers);
    
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

const prisma = new PrismaClient();

async function main() {  
    console.log("seeding schedules and reservations")
    // await deleteSchedules(prisma);
    await seedSchedules(prisma);
    await seedReservations(prisma);
    // console.log('about to run the user insertion thingy');
    // await updateSchedules(prisma);
    // await seedUsers(prisma);
}

async function nada(){

    return ("");
};

  main().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
