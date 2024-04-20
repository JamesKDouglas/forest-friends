
//This will keep state and have 2 subcomponents 
// -A date picker to prepare 2 date/times. This will be a form that has a submit button. 
// -a table that shows the current situation, listing all the sessions in a table and having a delete button in addition to 3 duplicate buttons. 

import { Schedule } from '@/app/lib/definitions';
import ScheduleTable from '@/app/ui/schedules/scheduleTable';
import DatePicker from '@/app/ui/schedules/datePicker';


export default async function scheduleTableParent({schedule}:{schedule:Schedule}){

    return(
        <>
            <DatePicker/>
            <ScheduleTable/>
        </>
    )
}