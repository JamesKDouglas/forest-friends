'use server';
import {z} from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


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

const CreateReservation = FormSchema.omit({ id: true, createdAt: true, updatedAt: true});

//The State is the state of the HTML page which is why everything is a string at this point.
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
        paid: formData.get('paid'),
      });

      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Reservation.',
        };
      }
      const { customerName, childNames, email, amount, notes, schedule, paid } = validatedFields.data;

      const amountInCents = amount * 100;
      const date = new Date().toISOString();
      console.log("paid status from making reservation:", paid);

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
              paid: paid,
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
  // throw new Error('Failed to Delete resrvation');
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

export async function deleteSchedule(id:string){
  // throw new Error('Failed to Delete schedule');
  try{
    const response = await prisma.schedule.delete({
      where: {
        id:+id,
      },
    })
  } catch(e){
    console.log(e);
    return {
      message: "Can't delete schedule.",
    }
  }
  revalidatePath('/dashboard/schedules');
  redirect('/dashboard/schedules');

}

const FormSchemaSchedule = z.object({
  id: z.coerce.number(),
  name: z.string().min(1, {message: "Please enter a schedule name"}),
  desc: z.string().min(1, {message: "Please enter a description"}),
  startList: z.array(Date),
  endList: z.array(Date),
});

const UpdateSchedule = FormSchemaSchedule.omit({});

export type StateUpdateSched = {
  errors?: {
    id: string[];
    name?: string[];
    desc?: string[];
    startList?: Date[];
    endList?: Date[];
  };
  message?: string | null;
};

export async function updateSchedule(formData: FormData) {
  //The updated schedule isn't part of the formData because it's a child component rather than an input field.
  //When this function is called I trigger the chain of callbacks to get that data from the child.
  let {startListIn, endListIn} = liftedData;

  //The startList and endList are arrays of Date objects. Can I even keep this in a FormData type?
  const validatedFields = UpdateSchedule.safeParse({
    id: id,
    name: formData.get('name'),
    desc: formData.get('desc'),
    startList: startListIn,
    endList: endListIn,
  });

  console.log("validated fields: ", validatedFields);
  if (!validatedFields.success){
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Schedule."
    }
  }
  const { id, name, desc, startList, endList } = validatedFields.data;
  
  try{
    const response = await prisma.schedule.update({
      where: { id: id }, 
      data: {
        name: name,
        desc: desc,
        startList: startList,
        endList: endList,
      }
    });
  }
  catch(err){
    console.log(err);
    return {
      message: "Updating the schedule didn't work.",
    };
  }
  
  revalidatePath('/dashboard/schedules');
  redirect('/dashboard/schedules');
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}