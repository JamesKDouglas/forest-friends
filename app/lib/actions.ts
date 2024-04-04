'use server';
import {z} from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const FormSchema = z.object({
    id: z.coerce.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    customerName: z.string().min(1, {message: "Please enter a gaurdian name"}),
    childNames: z.string().min(1, {message: 'Please write a camper name.'}),
    email: z.string().email(),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    notes: z.string(),
    schedule: z.coerce.number(
      {
        invalid_type_error: 'Please select a schedule.',
      }  
    ),
    paid: z.coerce.boolean(),
  });

const CreateReservation = FormSchema.omit({ id: true, createdAt: true, updatedAt: true, paid:true});

export type State = {
  errors?: {
    id: string[];
    customerName?: string[];
    childNames?: string[];
    email?: string[];
    amount?: string[];
    notes?: string[];
    scheduleId?: string[];
    paid?: string[];
  };
  message?: string | null;
};

const UpdateReservation = FormSchema.omit({ createdAt: true, updatedAt: true });

export async function updateReservation(id: number, prevState: State,
  formData: FormData,
) {

  const validatedFields = UpdateReservation.safeParse({
    id: id,
    customerName: formData.get('customerName'),
    childNames: formData.get('childNames'),
    email: formData.get('email'),
    amount: formData.get('amount'),
    notes: formData.get('notes'),
    schedule: Number(formData.get('scheduleId')),
    paid: formData.get('paid'),
  });

  console.log("validated fields: ", validatedFields);
  if (!validatedFields.success){
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Reservation."
    }
  }
  const { customerName, childNames, email, amount, notes, schedule, paid } = validatedFields.data;
  
  const amountInCents = amount*100;
  
  try{
    const response = await prisma.reservation.update({
      where: { id: id }, 
      data: {
        email: email,
        customerName: customerName,
        updatedAt: new Date(),
        childNames: childNames,
        amount: amountInCents,
        notes: notes,
        schedule: { connect: { id: schedule } },
        paid: paid
      }
    });
  }
  catch(err){
    console.log(err);
    return {
      message: "Updating the reservation didn't work.",
    };
  }
  
  revalidatePath('/dashboard/reservations');
  redirect('/dashboard/reservations');
}

export async function createReservation(prevState: State, formData: FormData){
    
    const validatedFields = CreateReservation.safeParse({
        customerName: formData.get('customerName'),
        childNames: formData.get('childNames'),
        email: formData.get('email'),
        amount: formData.get('amount'),
        notes: formData.get('notes'),
        schedule: Number(formData.get('scheduleId')),
      });

      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Reservation.',
        };
      }
      const { customerName, childNames, email, amount, notes, schedule } = validatedFields.data;

      const amountInCents = amount * 100;
      const date = new Date().toISOString();


      try{
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
        });
      } catch(e) {
        console.log(e);
        return ({
          message: "Couldn't create a new reservation! Sorry bro :/."
        })
      }
    revalidatePath('/dashboard/reservations');
    redirect('/dashboard/reservations');
}

export async function deleteReservation(id:string){
  throw new Error('Failed to Delete resrvation');


  try{
    const response = await prisma.reservation.delete({
      where: {
        id:+id,
      },
    })
  } catch(e){
    console.log(e);
    return {
      message: "Can't delete reservation.",
    }
  }
  revalidatePath('/dashboard/reservations');
  redirect('/dashboard/reservations');

}