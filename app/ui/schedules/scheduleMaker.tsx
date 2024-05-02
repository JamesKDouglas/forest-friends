
//This will keep state and have 2 subcomponents 
// -A date picker to prepare 2 date/times. This will be a form that has a submit button. 
// -a table that shows the current situation, listing all the sessions in a table and having a delete button in addition to 3 duplicate buttons. 
'use client'
import { Schedule } from '@/app/lib/definitions';
import ScheduleTable from '@/app/ui/schedules/scheduleTable';
import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 
import { Button } from '@/app/ui/button';
import { ArrowDownIcon } from '@heroicons/react/20/solid';

//This accepts the whole object of a schedule it could be that if someone in the future modifies this to change the name here in this component. Now you have two copies of the data and it's confusing. So better not do that I guess. The other option is to destructure/pass on only what is required.

export default function ScheduleMaker({ schedule } : {schedule:Schedule}){ 
    console.log("Hello yes time to edit a schedule")
    console.log(schedule);
    //state for choosing dates for a session
    const [day1, setDay1] = useState({ 
        startDate: null, 
        endDate: null
    }); 

    const [day2, setDay2] = useState({ 
        startDate: null, 
        endDate: null 
    }); 
        
    const handleDayChange1 = (newValue) => {
        console.log("Start Day:", newValue); 
        setDay1(newValue); 
    }

    const handleDayChange2 = (newValue) => {
        console.log("End Day:", newValue); 
        setDay2(newValue); 
    } 

    const [time1, setTime1] = useState(""); 

    const [time2, setTime2] = useState(""); 

    const handleTimeChange1 = (e) => {
        e.preventDefault();
        console.log("Start time incoming:", e.target.value); 
        setTime1(e.target.value); 
    }

    const handleTimeChange2 = (e) => {
        e.preventDefault();
        console.log("End time incoming:", e.target.value); 
        setTime2(e.target.value); 
    }         

    const [currentSchedule, setCurrentSchedule] = useState(schedule);
    //
    // const [schedule, setSchedule] = useState({startList: startList, endList:endList});
    console.log("trying to keep schedule as a state: ", schedule)
    const makeNewSession = (e) => {
        e.preventDefault();
        console.log("New session! Days: start:", day1, " end: ", day2);
        console.log("Times: start: ", time1, " end: ", time2);
        console.log('schedule', schedule);

        //I want to combine day1 and time1 into a date object
        //Then append it to the startList. 
        //And then sort that startlist in chronological order.
        //The way the daypicker works is it outputs 2 days. It's set to single mode but it still just outputs the same day as the start and end. 
        let newStart = new Date(`${day1.startDate}T${time1}:00`);
        console.log("new start obj:", newStart);
        let newEnd = new Date(`${day2.startDate}T${time2}:00`);
        console.log("new end obj:", newEnd);
        //Before we proceed - are these start and end times valid? They cannot exist in the middle of existing sessions.

        for (let sess=0;sess<schedule.startList.length;sess++){
            if (newStart.getTime()>=schedule.startList[sess].getTime()&&newStart.getTime()<=schedule.endList[sess].getTime()){
                console.log("Start time is not valid. It's between or equal to the start and end of an existing session. If you want concurrent sessions they have to exist in separate schedules.");
                return;
            }

            if (newEnd.getTime()>=schedule.startList[sess].getTime()&&newEnd.getTime()<=schedule.endList[sess].getTime()){
                console.log("End time is not valid. It's between or equal to the start and end of an existing session. If you want concurrent sessions they have to exist in separate schedules.");
                return;
            }

            //I need another test to reject invalid times. Right now it's possible to make a session that totally includes another one!
            if (newStart.getTime()<schedule.endList[sess] && newEnd.getTime()>schedule.startList[sess]){
                console.log("The proposed new session totally includes another session! That's outrageous. You cannot. Absolutely no way. As a computer it is my job to enforce reason and order in this world! I can't allow that sort of thing, sorry. Maybe you should make a new schedule?");
                return;
            }

        }

        //This seems a bit convoluted but I had some weird errors trying to do it more directly.

        //similar to the old JSON.stringify then JSON.parse. structuredClone preserves types better.
        let buildingSchedule = structuredClone(currentSchedule);
        buildingSchedule.startList.push(newStart);
        let sortedStartList = buildingSchedule.startList.sort((a,b) => a.getTime()-b.getTime())
        buildingSchedule.startList = sortedStartList;
        console.log(buildingSchedule.startList);

        buildingSchedule.endList.push(newEnd);
        let sortedEndList = buildingSchedule.endList.sort((a,b) => a.getTime()-b.getTime())
        buildingSchedule.endList = sortedEndList;
        console.log(buildingSchedule.endList);

        // return (schedule)
        setCurrentSchedule({
            ...buildingSchedule,
            startList:buildingSchedule.startList,
            endList:buildingSchedule.endList
        });
    }
     
    return(
        <>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    {/* Start session (camper arrive) */}
                    <p>START</p>
                    <Datepicker 
                        asSingle={true}
                        value={day1} 
                        onChange={handleDayChange1} 
                    /> 
                    
                    <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="time" id="start" name="start" required onChange={handleTimeChange1} />
                </div>

                <div className="sm:col-span-3">
                    {/* End session (campers leave) */}
                    <p>END</p>
                    <Datepicker 
                        asSingle={true}
                        value={day2} 
                        onChange={handleDayChange2} 
                    /> 

                    {/* <label for="end">Camper end time</label> */}
                    <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="time" id="end" name="end" required onChange={handleTimeChange2}  />
                </div>
            </div>
            
            <Button onClick = {makeNewSession} className="mt-4 w-full">
                Add Session<ArrowDownIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            {/* This table displays the prepared schedule and lets you delete or duplicate sessions */}
            <ScheduleTable scheduleNow = {currentSchedule}/>
        {/* </form> */}

        </>
    )
}