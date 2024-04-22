 import {Schedule} from '@/app/lib/definitions'
 import { DeleteSession, DuplicateSessionTomorrow, DuplicateSessionNextWeek, DuplicateSessionNextMonth } from '@/app/ui/schedules/buttons'

 export default async function ScheduleTable({scheduleNow}: {scheduleNow:Schedule}){

    //I want to generate a table with the startList and endList. 
    // That means combining the startList and endList into "sessions"
    //
    let sessions = [];
    for (let i=0;i<scheduleNow.startList.length;i++){
        sessions.push([i, scheduleNow.startList[i], scheduleNow.endList[i]]);
    }


    return(
        <>
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                     <div className="md:hidden">
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
                    {/* WHen the screen is small do I want to get rid of some of these duplicate buttons? */}
                    <DeleteSession id={session[0]} />
                    <DuplicateSessionTomorrow id={session[0]} session = {session}/>
                    <DuplicateSessionNextWeek id={session[0]} session = {session}/>
                    <DuplicateSessionNextMonth id={session[0]} session = {session}/>
                  </div>
                </div>
              </div>
            ))}

          </div>
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
                    <DuplicateSessionTommorrow id={session[0]} session = {session}/>
                    <DuplicateSessionNextWeek id={session[0]} session = {session}/>
                    <DuplicateSessionNextMonth id={session[0]} session = {session}/>
                  </div>
                </div>
              </div>
            ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
        </>
    )
 }