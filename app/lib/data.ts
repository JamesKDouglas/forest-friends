// I'm rewriting this to use Prisma. It used to use Vercel's sql function.
//This page has all the functions responsible for interacting with the database. 

import type { Schedule, Reservation } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

import { formatCurrency } from './utils';

const prisma = new PrismaClient();

export async function getReservations(){
    const allRes = await prisma.reservations.findMany();
    console.log(allRes);
    return allRes;
}

export async function getSchedules(){
    const allSchedules = await prisma.schedules.findMany();
    console.log(allSchedules);
    return allSchedules;
}

//I want to have some sort of search page to browse the reservations. This handles that.

//Can I use prisma to do some sort of filtered fetch? Anyways I want to use try catch blocks.
// https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors

export async function fetchFilteredReservations(query: string){
    try{
        const data = await prisma.reservations.findMany();
        console.log(data);
        return data;
    } catch {

    }    
}

export async function getReservationById(id: number){
    //? Not sure how to use prisma to get a record by id.
}

export async function updateReservation(id: number, newReservationData: Reservation){
    const reservation = await prisma.reservation.update({
        where: { id: id },
        data: {newReservationData},
    })

    console.log("reservation updated!", reservation);
}

export async function updateSchedule(id: number, newScheduleData: Schedule){
    const schedule = await prisma.schedule.update({
        where: { id: id },
        data: {newScheduleData},
    })

    console.log("schedule updated!", schedule);
}

export async function putReservation(newReservationData: Reservation){
    await prisma.reservation.create({
        data:{
            newReservationData
        }
    })
}

export async function putSchedule(newScheduleData: Schedule){
    await prisma.schedule.create(
        {
            data: {
                newScheduleData
            }
        }
    )
    
}