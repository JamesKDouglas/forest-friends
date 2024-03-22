// I'm rewriting this to use Prisma. It used to use Vercel's sql function.
//This page has all the functions responsible for interacting with the database. 

import type { Schedule, Reservation } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';

const { expectedAttendance } = require('@/app/lib/placeholder-data.js');
const prisma = new PrismaClient();

export async function getReservations(){
    noStore();
    const allRes = await prisma.reservations.findMany();
    // console.log(allRes);
    return allRes;
}

export async function fetchLatestReservations(){
    // await new Promise((resolve)=>setTimeout(resolve, 3000));

    noStore();
    const latestRes = await prisma.reservation.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 5,
    });

    // console.log("latestReservations:", latestRes);
    return latestRes;
}
// Get a list of expected attendance, either the next 7 months or the next 7 days ( including today ).

export async function fetchAttendance(){
    // await new Promise((resolve)=>setTimeout(resolve, 3000));
    noStore();
    let period = "days"; //I would like to build this out so you could toggle to weeks. Whatever. Start with days.
    
    // console.log(period);
    //get all the reservations made in the past x days
    let days =0;
    if (period == "days"){
        days = 7;
    } else {
        days = 7*7; //7 days a week, 7 weeks.
        // now condense the data, counting up all the reservations for the week.
    }

    let now = new Date();
    let past = new Date();

    past.setDate(past.getDate() - days);

    const upcomingRes = await prisma.reservation.findMany({
        where: {
            createdAt:{
                lte: now.toISOString(),
                gte: past.toISOString(),
            }
        }
    });

    //now summarize how many people are coming in each day OR each week.
    //what does the object look like when returned by prisma? What kind of methods does it have?

    // right now there is a "one child one reservation" policy. Parents can still use autofill on the form of course. But they can't literally just set # of children to 2 or more on a single form - there is only one place for the child name.

    // I should put in an easter egg for "Johnny" "DROP TABLE". Just console log a "lol, good one." Confetti?

    // console.log(upcomingRes)

    //fudge it for now,
    return expectedAttendance;
    // let summaryAtt = [];
    // if (period == "days"){
    //     //
    //     for (let i=0;i<6;i++){

    //         summaryAtt.push()
    //     }
    // } else if (period == "weeks"){

    // }

}

export async function getSchedules(){
    noStore();
    const allSchedules = await prisma.schedule.findMany();
    // console.log(allSchedules);
    return allSchedules;
}

//I want to have some sort of search page to browse the reservations. This handles that.

//Can I use prisma to do some sort of filtered fetch? Anyways I want to use try catch blocks.
// https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredReservations(
    query: string, 
    currentPage:number,){
    noStore();

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    // id: number;
    // createdAt: string;
    // updatedAt: string;
    // email: string;
    // customerName: string;
    // childNames: string;
    // amount: number;
    // paid: true | false; 
    // notes: string;
    // schedule: number;
    try{

        // const data = await prisma.reservation.findMany({
        //     where: {
        //       OR: Object.keys(prisma.reservation.createUnchecked({}))
        //         .map(field => ({
        //           [field]: {
        //             contains: query
        //           }
        //         }))
        //     }
        //   });

        // { createdAt: { contains: query } },
        // { updatedAt: { contains: query } },
        // { email: { contains: query } },
        // { customerName: { contains: query } },
        // { childNames: { contains: query } },
        // { notes: { contains: query },
        const data = await prisma.reservation.findMany({
            where: {
                OR: [
                    {childNames: { contains: query, mode: 'insensitive' }},
                    {customerName: { contains: query, mode: 'insensitive' }},
                    {email: { contains: query, mode: 'insensitive' }},
                ]
              }
        });
        // console.log(data);
        return data;
    } catch (e){
        console.log(e);
    }    
}

export async function getReservationById(id: number){
    noStore();

    //? Not sure how to use prisma to get a record by id.
}

export async function updateReservation(id: number, newReservationData: Reservation){
    noStore();
    const reservation = await prisma.reservation.update({
        where: { id: id },
        data: {newReservationData},
    })

    console.log("reservation updated!", reservation);
}

export async function fetchCardData(){
    // await new Promise((resolve) => setTimeout(resolve, 3000)); Delay to test skeleton

    //Here we fetch some data from tables and process it into summaries:
    //1. How much revenue has been collected this calendar year. - get all of them since jan 1 and add all the amounts.
    //2. How much in outstanding payments stand now. - get all reservations that are marked paid: false since jan 1 and sum them.
    //3. Total reservations made this calendar year. - count all the reservation records made since jan 1. 
    //4. Total customers - get all reservation records. Collect all the customerNames. Make a set. Report the number of unique names
    noStore();//no caching - this is supposed to be a live readout.

    let reservationsThisYear;//all the actual records of reservations
    
    let thisYear = new Date().getFullYear();
    let start = new Date(`January 1, ${thisYear}`);
    
    let resThisYr;//how many reservations
    let custThisYr =0;

    let revThisYr =0;//rev for revenue
    let paymentOutst =0;

    try{
        //Prisma will return an array of object, not an object of objects.
        reservationsThisYear = await prisma.reservation.findMany(
            {
                where: {
                    createdAt:{
                        gte: start,
                    }
                }

            }
        );
        // console.log(reservationsThisYear);

        resThisYr = Object.keys(reservationsThisYear).length;

        let custNames = reservationsThisYear.map((el: Reservation)=>el.customerName);
        let custNamesSet = new Set(custNames);        
        custThisYr = custNamesSet.size;

        revThisYr = reservationsThisYear.map((el: Reservation) => +el.amount).reduce((a:number,c:number)=> a+c, 0);
        
        paymentOutst = reservationsThisYear.map((el: Reservation) => {
            if (el.paid==false){
                return +el.amount;
            } else {
                return 0;
            }
        }).reduce((a:number,c:number) => a+c,0);

        // console.log("payment values outstanding:", paymentOutst);
        // paymentOutst = paymentOutst.reduce((a:number,c:number)=>a+c,0);
        return {
            revThisYr,
            paymentOutst,
            resThisYr,
            custThisYr,
        }

    } catch(err) {
        console.log(err);
        throw new Error("trouble with card data");
    }

}

export async function updateSchedule(id: number, newScheduleData: Schedule){
    noStore();
    const schedule = await prisma.schedule.update({
        where: { id: id },
        data: {newScheduleData},
    })

    console.log("schedule updated!", schedule);
}

export async function putReservation(newReservationData: Reservation){
    noStore();
    await prisma.reservation.create({
        data:{
            newReservationData
        }
    })
}

export async function putSchedule(newScheduleData: Schedule){
    noStore();
    await prisma.schedule.create(
        {
            data: {
                newScheduleData
            }
        }
    )
    
}