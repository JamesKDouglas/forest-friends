 import {Schedule} from '@/app/lib/definitions'
 import { Button } from '@/app/ui/button';

//  import { DeleteSession, DuplicateSessionTomorrow, DuplicateSessionNextWeek, DuplicateSessionNextMonth } from '@/app/ui/schedules/buttons'

 export default function ScheduleTable({scheduleNow, delSession, dupST}: {scheduleNow:Schedule, delSession:Function, dupST:Function}){
  console.log("schedule passed to table:", scheduleNow);
    //Each row of the table will have a session. I could do that in the jsx or here.
    let sessions = [];
    for (let i=0;i<scheduleNow.startList.length;i++){
        sessions.push([i, 
          `${scheduleNow.startList[i].getMonth()+1}/${scheduleNow.startList[i].getDate()} 
          ${scheduleNow.startList[i].getHours()}:${scheduleNow.startList[i].getMinutes()}`, 
          `${scheduleNow.endList[i].getMonth()+1}/${scheduleNow.endList[i].getDate()} 
          ${scheduleNow.endList[i].getHours()}:${scheduleNow.endList[i].getMinutes()}`
        ]);
    }

    // const deleteSession = (e) => {
    //   e.preventDefault();
    //   console.log("delete function called!");
    //   console.log('old schedule', schedule);
    //   }


    return(
        <>
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                     {/* <div className="md:hidden">
                        {sessions?.map((session) => (
                          <div
                            key={session[0].toString()}
                            className="mb-2 w-full rounded-md bg-white p-4"
                          >
                            <div className="flex items-center justify-between border-b pb-4">
                              <div>
                                <div className="mb-2 flex items-center">
                                  <p>{session[1].toString()}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex w-full items-center justify-between pt-4">
                              <div>
                                <p className="text-xl font-medium">
                                  {session[2].toString()}
                                </p>
                              </div>
                              <div className="flex justify-end gap-2">
                                <DeleteSession id={session[0]} />
                                <DuplicateSessionTomorrow id={session[0]} session = {session}/>
                                <DuplicateSessionNextWeek id={session[0]} session = {session}/>
                                <DuplicateSessionNextMonth id={session[0]} session = {session}/>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div> */}
                    <table className="hidden min-w-full text-gray-900 md:table">
                      <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                            Start
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            End
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Delete
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Duplicate Tomorrow
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Duplicate Next Week
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Duplicate Next Month
                          </th>
                        </tr>
                      </thead>
                    <tbody className="bg-white">
                      {sessions?.map((session) => (
                        <tr
                          key={session[0].toString()} 
                          className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                          >
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                              <p>{session[1].toString()}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                              <p>
                                {session[2].toString()}
                              </p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                              <button onClick = {delSession} data-id = {session[0].toString()}>
                                del
                              </button>
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                              <button onClick = {dupST} data-id = {session[0].toString()}>
                                dupST
                              </button>
                              {/* <DuplicateSessionTomorrow id={session[0]} session = {session}/> */}
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                              dupSNW
                              {/* <DuplicateSessionNextWeek id={session[0]} session = {session}/> */}
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                              dupSNM
                              {/* <DuplicateSessionNextMonth id={session[0]} session = {session}/> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
        </div>
      </div>
    </div>
        </>
    )
 }