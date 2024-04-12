Type error: No overload matches this call.
  Overload 1 of 2, '(action: (state: State) => Promise<State>, initialState: State, permalink?: string | undefined): [state: State, dispatch: () => void]', gave the following error:
    Argument of type '(prevState: State, formData: FormData) => Promise<{ 
        errors: { 
            email?: string[] | undefined; 
            schedule?: string[] | undefined; 
            customerName?: string[] | undefined; 
            childNames?: string[] | undefined; 
            amount?: string[] | undefined; 
            notes?: string[] | undefined; 
            paid?: string[] | undefined; 
        }; 
        message: string; 
    } | 
    { ...;...' is not assignable to parameter of type '(state: State) => Promise<State>'.
      Target signature provides too few arguments. Expected 2 or more, but got 1.

  Overload 2 of 2, '(action: (state: State, payload: FormData) => Promise<State>, initialState: State, permalink?: string | undefined): [state: State, dispatch: (payload: FormData) => void]', gave the following error.
    Argument of type '(prevState: State, formData: FormData) => Promise<{ errors: { email?: string[] | undefined; schedule?: string[] | undefined; customerName?: string[] | undefined; childNames?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; paid?: string[] | undefined; }; message: string; } | { ...;...' is not assignable to parameter of type '(state: State, payload: FormData) => Promise<State>'.
      Type 'Promise<{ errors: { email?: string[] | undefined; schedule?: string[] | undefined; customerName?: string[] | undefined; childNames?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; paid?: string[] | undefined; }; message: string; } | { ...; }>' is not assignable to type 'Promise<State>'.
        Type '{ errors: { email?: string[] | undefined; schedule?: string[] | undefined; customerName?: string[] | undefined; childNames?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; paid?: string[] | undefined; }; message: string; } | { ...; }' is not assignable to type 'State'.
          Type '{ errors: { email?: string[] | undefined; schedule?: string[] | undefined; customerName?: string[] | undefined; childNames?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; paid?: string[] | undefined; }; message: string; }' is not assignable to type 'State'.
            Types of property 'errors' are incompatible.
              Property 'id' is missing in type '{ email?: string[] | undefined; schedule?: string[] | undefined; customerName?: string[] | undefined; childNames?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; paid?: string[] | undefined; }' but required in type '{ id: string[]; customerName?: string[] | undefined; childNames?: string[] | undefined; email?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; scheduleId?: string[] | undefined; paid?: string[] | undefined; }'.

  27 | export default function Form({schedules}: {schedules:Schedules}) {
  28 |   const initialState = { message: null, errors: {}};
> 29 |   const [state, dispatch] = useFormState(createReservation, initialState);
     |                                          ^
  30 |
  31 |   // const schedules = await fetchSchedules();
  32 |   console.log("Schedules: ", schedules);

//   I suppose this is saying that you cannot provide these two arguments, to the useFormState function (which is a hook)
 
//  One is a function and the second is an object with a simple message, errors structure.


Type error: No overload matches this call.
  Overload 1 of 2, '(action: (state: State) => Promise<State>, initialState: State, permalink?: string | undefined): [state: State, dispatch: () => void]', gave the following error.
    Argument of type '(prevState: State, formData: FormData) => Promise<{ errors: { id?: string[] | undefined; customerName?: string[] | undefined; childNames?: string[] | undefined; email?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; schedule?: string[] | undefined; paid?: string[] | undefined; }; ...' is not assignable to parameter of type '(state: State) => Promise<State>'.
      Target signature provides too few arguments. Expected 2 or more, but got 1.
  Overload 2 of 2, '(action: (state: State, payload: FormData) => Promise<State>, initialState: State, permalink?: string | undefined): [state: State, dispatch: (payload: FormData) => void]', gave the following error.
    Argument of type '(prevState: State, formData: FormData) => Promise<{ errors: { id?: string[] | undefined; customerName?: string[] | undefined; childNames?: string[] | undefined; email?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; schedule?: string[] | undefined; paid?: string[] | undefined; }; ...' is not assignable to parameter of type '(state: State, payload: FormData) => Promise<State>'.
      Type 'Promise<{ errors: { id?: string[] | undefined; customerName?: string[] | undefined; childNames?: string[] | undefined; email?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; schedule?: string[] | undefined; paid?: string[] | undefined; }; message: string; } | { ...; }>' is not assignable to type 'Promise<State>'.
        Type '{ errors: { id?: string[] | undefined; customerName?: string[] | undefined; childNames?: string[] | undefined; email?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; schedule?: string[] | undefined; paid?: string[] | undefined; }; message: string; } | { ...; }' is not assignable to type 'State'.
          Type '{ errors: { id?: string[] | undefined; customerName?: string[] | undefined; childNames?: string[] | undefined; email?: string[] | undefined; amount?: string[] | undefined; notes?: string[] | undefined; schedule?: string[] | undefined; paid?: string[] | undefined; }; message: string; }' is not assignable to type 'State'.
            The types of 'errors.id' are incompatible between these types.
              Type 'string[] | undefined' is not assignable to type 'string[]'.
                Type 'undefined' is not assignable to type 'string[]'.

  27 |   const initialState = { message: null, errors: {}};
  28 |   const updateReservationWithId = updateReservation.bind(null, reservation.id);
> 29 |   const [ state, dispatch ] = useFormState(updateReservationWithId, initialState);
     |                                            ^
  30 |
  31 |   
  32 |   return  <>