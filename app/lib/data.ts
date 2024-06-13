
//This page has all the functions responsible for interacting with the database. 

import type { Schedule, Reservation } from '@prisma/client';//Reservations is a type defined in definitons.ts. Can I import this from the Prisma client?
import type { LatestReservations, Schedules } from '@/app/lib/definitions'
import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';

const { expectedAttendance } = require('@/app/lib/placeholder-data.js');
const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 6;

export async function fetchReservationsPages(query: string){
    noStore();
    try{
        let count = 0; 
        if (/^\d+$/.test(query)){
            //This just searches for the exact value of course. I'm starting to get into like if someone types in 1, should that search for of value 100 or 201? Idk it's an edge case.
            let queryNum = +query;
            count = await prisma.reservation.count({
                where: {
                    amount: { equals: queryNum },
                  }
            });
        } else {
            count = await prisma.reservation.count({
                where: {
                    OR: [
                        {childNames: { contains: query, mode: 'insensitive' }},
                        {customerName: { contains: query, mode: 'insensitive' }},
                        {email: { contains: query, mode: 'insensitive' }},
                        {notes: { contains: query, mode: 'insensitive' }},
                    ]
                }
            });
        }
        console.log("count of records found:", count);
        const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
        console.log(typeof(totalPages));
        return totalPages;
    } catch(e){
        console.log(e);
    }

}

export async function fetchLatestReservations(){

    noStore();
    const latestRes = await prisma.reservation.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 5,
    });

    return latestRes;
}

export async function fetchAttendance(){
    noStore();
    let period = "days"; //I would like to build this out so you could toggle to weeks. Start with days.
    
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

    //summarize how many people are coming in each day

    // right now there is a "one child one reservation" policy. Parents can still use autofill on the form of course. But they can't literally just set # of children to 2 or more on a single form - there is only one place for the child name.

    // I should put in an easter egg for "Johnny" "DROP TABLE". Just console log a "lol, good one." Confetti?

    //fudge it for now,
    return expectedAttendance;

}

export async function fetchSchedules(){
    const allSchedules = await prisma.schedule.findMany();
    return allSchedules;
}

export async function fetchScheduleById(id:string){
    let idNum = Number(id);
    const schedule = await prisma.schedule.findUnique({
        where: {id:idNum},
    })
    return schedule;
}

export async function fetchFilteredSchedules(
    query: string, 
    currentPage:number,){

    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try{
        let data: Schedules; 
        
        data = await prisma.schedule.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            orderBy: [
                {
                    id: 'desc',
                }
            ],
            where: {
                OR: [
                    {desc: { contains: query, mode: 'insensitive' }},
                    {name: { contains: query, mode: 'insensitive' }},
                ]
            }
        });
        
        return data;
    } catch (e){
        console.log(e);
    }    
}

export async function fetchFilteredReservations(
    query: string, 
    currentPage:number,){

    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try{
        // If I type in '100' in the search it better return all invoices that are $100, right?
        //Then I need to handle the typing.
        let data: LatestReservations; //This is just an array of reservations - whether it's the latest or all of them!
        if (/^\d+$/.test(query)){
            //This just searches for the exact value of course. I'm starting to get into like if someone types in 1, should that search for invoice of value 100 or 201? Idk it's an edge case.
            let queryNum = +query;
            data = await prisma.reservation.findMany({
                orderBy: [
                    {
                        id: 'desc',
                    }
                ],
                where: {
                    amount: { equals: queryNum },
                  }
            });
        } else {
            data = await prisma.reservation.findMany({
                skip: offset,
                take: ITEMS_PER_PAGE,
                orderBy: [
                    {
                        id: 'desc',
                    }
                ],
                where: {
                    OR: [
                        {childNames: { contains: query, mode: 'insensitive' }},
                        {customerName: { contains: query, mode: 'insensitive' }},
                        {email: { contains: query, mode: 'insensitive' }},
                        {notes: { contains: query, mode: 'insensitive' }},
                    ]
                }
            });
        }
        return data;
    } catch (e){
        console.log(e);
    }    
}

export async function fetchSchedulesPages(query: string){
    noStore();
    try{
        let count = 0; 
        count = await prisma.schedule.count({
            where: {
                OR: [
                    {desc: { contains: query, mode: 'insensitive' }},
                    {name: { contains: query, mode: 'insensitive' }},
                ]
            }
        });
        
        console.log("count of schedules found:", count);
        const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
        console.log(typeof(totalPages));
        return totalPages;
    } catch(e){
        console.log(e);
    }
}

export async function fetchReservationById(id: number){
    noStore();
    try{
        const reservation = await prisma.reservation.findUnique({
            where:{ id: id },
        });

        if (!reservation){
            throw new Error("No reservations returned from the database?!?")
        }
//I want to convert reservation.amount from pennies to dollars but Typescript will have none of that.
//Some problem with Decimal type?
//I've turned off typescript error reporting for now so,
        reservation.amount = reservation.amount/100;
        return reservation;
    } catch(e){
        console.log(e);
    }
}

export async function fetchCardData(){
    
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