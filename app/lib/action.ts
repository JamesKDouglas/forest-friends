'use server';
import {z} from 'zod';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';



const prisma = new PrismaClient();

const FormSchema = z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    customerName: z.string(),
    childNames: z.string(),
    email: z.string(),
    amount: z.coerce.number(),
    notes: z.string(),
    schedule: z.coerce.number(),
    paid: z.boolean(),
  });

const CreateReservation = FormSchema.omit({ id: true, createdAt: true, updatedAt: true, paid:true});

export type State = {
    errors?: {
      customerName?: string[];
      amount?: string[];
      paid?: string[];
    };
    message?: string | null;
  };

export async function createReservation(prevState: State, formData: FormData){
    const { customerName, childNames, email, amount, notes, schedule } = CreateReservation.parse({
        customerName: formData.get('customerName'),
        childNames: formData.get('childName'),
        email: formData.get('email'),
        amount: formData.get('amount'),
        notes: formData.get('notes'),
        schedule: Number(formData.get('scheduleId')),
      });
      console.log(schedule);
      const amountInCents = amount * 100;
      const date = new Date().toISOString();
      await prisma.reservation.create({
        data:{
            createdAt: date,
            email: email,
            customerName: customerName,
            childNames: childNames,
            amount: amountInCents,
            notes: notes,
            schedule: {
                connect: {
                    id: schedule,
                }
            },  
            paid: false,
        }
    })
    revalidatePath('/dashboard/reservations');
    redirect('/dashboard/reservations');

    // Test it out:
    //   console.log(rawFormData);
}
