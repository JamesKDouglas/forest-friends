'use server';
import {z} from 'zod';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

const FormSchema = z.object({
    id: z.coerce.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    customerName: z.string(),
    childNames: z.string(),
    email: z.string(),
    amount: z.coerce.number(),
    notes: z.string(),
    scheduleId: z.coerce.number(),
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

  // console.log("formData from edit reservation. customerName:", formData.get('scheduleId'));
  console.log("submit form to edit record!")
  const { customerName, childNames, email, amount, notes, scheduleId, paid } = UpdateReservation.parse({
    id: formData.get("id"),
    customerName: formData.get('customerName'),
    childNames: formData.get('childNames'),
    email: formData.get('email'),
    amount: formData.get('amount'),
    notes: formData.get('notes'),
    scheduleId: formData.get('scheduleId'),
    paid: formData.get('paid'),
  });

  // if (!validatedFields.success){
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: "Missing Fields. Failed to Update Reservation."
  //   }
  // }

  // const { customerName, amount, paid } = validatedFields.data;
  const amountInCents = amount*100;
  
  try{
    // console.log("trying so hard to edit record!")
    const response = await prisma.reservation.update({
      where: { id: id }, // Specify the ID of the reservation you want to update
      data: {
        email: email,
        customerName: customerName,
        updatedAt: new Date(),
        childNames: childNames,
        amount: amountInCents,
        paid: paid,
        notes: notes,
        schedule: { connect: { id: scheduleId } } // Connect to the new schedule by its ID
      }
    });
    console.log("tried to update record:", response);
  }
  catch(err){
    return {
      message: "database error, updating the invoice didn't work.",
    };
  }
  
  revalidatePath('/dashboard/reservations');
  redirect('/dashboard/reservations');
}

export async function createReservation(prevState: State, formData: FormData){
    // console.log("formData when creating a reservation:", formData);
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

export async function deleteReservation(id:string){

  try{
    const response = await prisma.reservation.delete({
      where: {
        id:+id,
      },
    })
  } catch(e){
    console.log(e);
  }
  revalidatePath('/dashboard/reservations');
  redirect('/dashboard/reservations');

}