
//This will keep state and have 2 subcomponents 
// -A date picker to prepare 2 date/times. This will be a form that has a submit button. 
// -a table that shows the current situation, listing all the sessions in a table and having a delete button in addition to 3 duplicate buttons. 
'use client'
import { Schedule } from '@/app/lib/definitions';
// import ScheduleTable from '@/app/ui/schedules/scheduleTable';
import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 
import { Button } from '@/app/ui/button';
import { ArrowDownIcon } from '@heroicons/react/20/solid';


export default function ScheduleMaker({schedule}:{schedule:Schedule}){

    const [value1, setValue1] = useState({ 
        startDate: null, 
        endDate: null
    }); 

    const [value2, setValue2] = useState({ 
        startDate: null, 
        endDate: null 
    }); 
        
    const handleValueChange1 = (newValue) => {
        console.log("newValue:", newValue); 
        setValue1(newValue); 
    }

    const handleValueChange2 = (newValue) => {
        console.log("newValue:", newValue); 
        setValue2(newValue); 
    } 

    const [time1, setTime1] = useState({ 
        startDate: null, 
        endDate: null
    }); 

    const [time2, setTime2] = useState({ 
        startDate: null, 
        endDate: null 
    }); 
        
    const handleTimeChange1 = (newValue) => {
        console.log("newValue:", newValue); 
        setTime1(newValue); 
    }

    const handleTimeChange2 = (newValue) => {
        console.log("newValue:", newValue); 
        setTime2(newValue); 
    } 

    const makeNewSession = () => {
        console.log("new session! Days Start:", value1, " end: ", value2);
        console.log("times: ", time1, "end ", time2);
    }
     
    return(
        <>
        {/* You can't put a form inside a form! So I have to just keep state and use an event handler */}
        {/* <form onSubmit = {makeNewSession}> */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    {/* Start session (camper arrive) */}
                    <p>START</p>
                    <Datepicker 
                        asSingle={true}
                        value={value1} 
                        onChange={handleValueChange1} 
                    /> 
                    {/* <label for="start">Camper start time</label> */}

                    {/* This isn't a react component so I can't keep state with it. There must be some time input component for React I can download? Also, it's weird to keep 4 variables for state. How can I combine them into one hook? */}
                    <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="time" id="start" name="start" required onChange={handleTimeChange1} />
                </div>

                <div className="sm:col-span-3">
                    {/* End session (campers leave) */}
                    <p>END</p>
                    <Datepicker 
                        asSingle={true}
                        value={value2} 
                        onChange={handleValueChange2} 
                    /> 

                    {/* <label for="end">Camper end time</label> */}
                    <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="time" id="end" name="end" required onChange={handleTimeChange2}  />
                </div>
            </div>
            
            {/* Enclose the two date/time pickers in a form and this button submits the form, which dispatches the state */}
            <Button onClick = {makeNewSession} className="mt-4 w-full">
                Add Session<ArrowDownIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            {/* This table displays the prepared schedule and lets you delete or duplicate sessions */}
            {/* <ScheduleTable/> */}
        {/* </form> */}
        </>
    )
}