
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

    const valSession = (newStart, newEnd) => {

        // s start e end for session being inspected.
        let s = 0;
        let e = 0;        
        //ps proposed start, pe proposed end.
        let ps = 0;
        let pe = 0;

        let err = "";

        for (let sess=0;sess<currentSchedule.startList.length;sess++){

            ps = newStart.getTime();
            pe = newEnd.getTime()
            
            s = currentSchedule.startList[sess].getTime();
            e = currentSchedule.endList[sess].getTime();
            
            //just the ends. This also handles the case where a proposed session is totally inside an existing one.
            //note that right now you have to leave a minute between one session and another if you want to have two in a row. But why would you want that? It would just be one session. Maybe a staff shift change? well, these schedules aren't based on that.
            if (pe>=s && pe<=e){
                err = "End time is not valid. It's between or equal to the start and end of an existing session. If you want concurrent sessions they have to exist in separate schedules.";
                console.log(err);
                return [false, err];
            }
            if (ps>=s && ps<=e){
                err = "Start time is not valid. It's inside of an existing session. If you want concurrent sessions they have to exist in separate schedules.";
                console.log(err);
                return [false, err];
            }
            
            //totally encompassing. another session
            if (ps<=e && pe>=s){
                err = "The proposed new session totally includes another session! That's outrageous. You cannot. Absolutely no way. As a computer it is my job to enforce reason and order in this world! I can't allow that sort of thing, sorry. Maybe you should make a new schedule?";
                console.log(err);
                return [false, err];
            }
        }
        return [true, "session validated"];
    }

    const makeNewSession = (event) => {
        event.preventDefault();
        console.log("New session! Days: start:", day1, " end: ", day2);
 
        //The way the daypicker works is it outputs 2 days. It's set to single mode but it still just outputs the same day as the start and end. 
        let newStart = new Date(`${day1.startDate}T${time1}:00`);
        let newEnd = new Date(`${day2.startDate}T${time2}:00`);
        
        let isVal = valSession(newStart, newEnd);
        console.log(isVal);
        if (isVal[0] === false){
            console.log(isVal[1]);
            return;
        } else {
            console.log(isVal[1]);
        }

        //This seems a bit convoluted but I had some weird errors trying to do it more directly.

        //similar to the old JSON.stringify then JSON.parse. structuredClone preserves types better.
        //Clone current schedule
        let buildingSchedule = structuredClone(currentSchedule);

        //Push the new start time onto the clone
        buildingSchedule.startList.push(newStart);
        //sort the start times and put that sorted list in a new array.
        let sortedStartList = buildingSchedule.startList.sort((a,b) => a.getTime()-b.getTime())
        //copy the sorted array into the old spot where the start times list was, replacing it
        buildingSchedule.startList = sortedStartList;
        console.log(buildingSchedule.startList);

        //same for end times
        buildingSchedule.endList.push(newEnd);
        let sortedEndList = buildingSchedule.endList.sort((a,b) => a.getTime()-b.getTime())
        buildingSchedule.endList = sortedEndList;
        console.log(buildingSchedule.endList);
        

        setCurrentSchedule({
            ...buildingSchedule,
            startList:buildingSchedule.startList,
            endList:buildingSchedule.endList
        });
    }

    const delSession = (e) =>{
        console.log("e", e);
        let myObject = e.target.getAttribute("data-id");
        console.log("myobject", myObject);
        let buildingSchedule = structuredClone(currentSchedule);

        //delete the session. Which session is carried in as e.
        let rowDataset = e.target.dataset;
        console.log("rowDataset:", rowDataset);
        let sessionID = rowDataset.id;

        // buildingSchedule = buildingSchedule.splice(sessionID, 1);
        console.log("sessID:", sessionID);
        //delete the start time onto the clone
        buildingSchedule.startList.splice(sessionID,1);

        //same for end times
        buildingSchedule.endList.splice(sessionID,1);

        setCurrentSchedule({
            ...buildingSchedule,
            startList:buildingSchedule.startList,
            endList:buildingSchedule.endList
        });
    }

    //duplicate session tomorrow
    const dupST = (e) => {


        let buildingSchedule = structuredClone(currentSchedule);
        let rowDataset = e.target.dataset;
        let sessionID = rowDataset.id;

        //duplicate the start time onto the clone
        let startTime = new Date(buildingSchedule.startList[sessionID]);
        let endTime = new Date(buildingSchedule.endList[sessionID]);

        
        let tomorrowStart = new Date(buildingSchedule.startList[sessionID]);
        tomorrowStart.setDate(startTime.getDate() + 1);
        
        let tomorrowEnd = new Date(buildingSchedule.endList[sessionID]);
        tomorrowEnd.setDate(endTime.getDate() + 1);
        
        let valR = valSession(tomorrowStart, tomorrowEnd);
        if (!valR[0]){
            console.log(valR[1]);
            return(valR[1]);
        }

        buildingSchedule.startList.push(tomorrowStart);
        //sort the start times and put that sorted list in a new array. I could put it in directly but there are edge cases like multiple sessions the same day then you duplicate the earlier one.
        let sortedStartList = buildingSchedule.startList.sort((a,b) => a.getTime()-b.getTime())
        //copy the sorted array into the old spot where the start times list was, replacing it
        buildingSchedule.startList = sortedStartList;

        //same for end times
        buildingSchedule.endList.push(tomorrowEnd);
        let sortedEndList = buildingSchedule.endList.sort((a,b) => a.getTime()-b.getTime());
        buildingSchedule.endList = sortedEndList;

        setCurrentSchedule({
            ...buildingSchedule,
            startList:buildingSchedule.startList,
            endList:buildingSchedule.endList,
        })
    }
     
    //duplicate session next week
    const dupSNW = (e) => {

        let buildingSchedule = structuredClone(currentSchedule);
        let rowDataset = e.target.dataset;
        let sessionID = rowDataset.id;

        let startTime = new Date(buildingSchedule.startList[sessionID]);
        let endTime = new Date(buildingSchedule.endList[sessionID]);

        let nwStart = new Date(buildingSchedule.startList[sessionID]);
        nwStart.setDate(startTime.getDate() + 7);

        let nwEnd = new Date(buildingSchedule.endList[sessionID]);
        nwEnd.setDate(endTime.getDate() + 7);

        let valR = valSession(nwStart, nwEnd);
        if (!valR[0]){
            console.log(valR[1]);
            return(valR[1]);
        }

        buildingSchedule.startList.push(nwStart);
        //sort the start times and put that sorted list in a new array. I could put it in directly but there are edge cases like multiple sessions the same day then you duplicate the earlier one.
        let sortedStartList = buildingSchedule.startList.sort((a,b) => a.getTime()-b.getTime())
        //copy the sorted array into the old spot where the start times list was, replacing it
        buildingSchedule.startList = sortedStartList;

        //same for end times
        buildingSchedule.endList.push(nwEnd);
        let sortedEndList = buildingSchedule.endList.sort((a,b) => a.getTime()-b.getTime());
        buildingSchedule.endList = sortedEndList;

        setCurrentSchedule({
            ...buildingSchedule,
            startList:buildingSchedule.startList,
            endList:buildingSchedule.endList,
        })
    }

    //duplicate session next month
    const dupSNM = (e) => {

        let buildingSchedule = structuredClone(currentSchedule);
        let rowDataset = e.target.dataset;
        let sessionID = rowDataset.id;

        //duplicate the start time onto the clone
        let startTime = new Date(buildingSchedule.startList[sessionID]);
        let endTime = new Date(buildingSchedule.endList[sessionID]);

        //If it's Dec, will this roll over?
        let nmStart = new Date(buildingSchedule.startList[sessionID]);
        nmStart.setDate(startTime.getMonth() + 1);

        let nmEnd = new Date(buildingSchedule.endList[sessionID]);
        nmEnd.setDate(endTime.getMonth() + 1);

        let valR = valSession(nmStart, nmEnd);
        if (!valR[0]){
            console.log(valR[1]);
            return(valR[1]);
        }
        buildingSchedule.startList.push(nmStart);

        //sort the start times and put that sorted list in a new array. I could put it in directly but there are edge cases like multiple sessions the same day then you duplicate the earlier one.
        let sortedStartList = buildingSchedule.startList.sort((a,b) => a.getTime()-b.getTime())
        //copy the sorted array into the old spot where the start times list was, replacing it
        buildingSchedule.startList = sortedStartList;
        console.log(buildingSchedule.startList);

        //same for end times
        buildingSchedule.endList.push(nmEnd);
        let sortedEndList = buildingSchedule.endList.sort((a,b) => a.getTime()-b.getTime());
        buildingSchedule.endList = sortedEndList;
        console.log(buildingSchedule.endList);

        setCurrentSchedule({
            ...buildingSchedule,
            startList:buildingSchedule.startList,
            endList:buildingSchedule.endList,
        })
    }
    
    return(
        <>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
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
                    <p>END</p>
                    <Datepicker 
                        asSingle={true}
                        value={day2} 
                        onChange={handleDayChange2} 
                    /> 

                    <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="time" id="end" name="end" required onChange={handleTimeChange2}  />
                </div>
            </div>
            
            <Button onClick = {makeNewSession} className="mt-4 w-full">
                Add Session<ArrowDownIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            {/* This table displays the prepared schedule and lets you delete or duplicate sessions */}
            <ScheduleTable scheduleNow = {currentSchedule} delSession = {delSession} dupST = {dupST} dupSNW = {dupSNW} dupSNM = {dupSNM} />

        </>
    )
}