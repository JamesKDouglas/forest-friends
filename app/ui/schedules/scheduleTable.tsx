 'use client'
 import {Schedule} from '@/app/lib/definitions'
 import { Button } from '@/app/ui/button';
 import { XCircleIcon } from '@heroicons/react/20/solid';

 export default function ScheduleTable({scheduleNow, delSession, dupST, dupSNW, dupSNM, cb1}: {scheduleNow:Schedule, delSession:Function, dupST:Function, dupSNW:Function, dupSNM:Function, cb1:Function}){

    let sessions = [];
    for (let i=0;i<scheduleNow.startList.length;i++){
        sessions.push([i, 
          `${scheduleNow.startList[i].getMonth()+1}/${scheduleNow.startList[i].getDate()} 
          ${scheduleNow.startList[i].getHours()}:${scheduleNow.startList[i].getMinutes()}`, 
          `${scheduleNow.endList[i].getMonth()+1}/${scheduleNow.endList[i].getDate()} 
          ${scheduleNow.endList[i].getHours()}:${scheduleNow.endList[i].getMinutes()}`
        ]);
    }

    return(
        <>
          <div className="mt-6 flow-root">
              <div className="inline-block min-w-full align-middle">
                  <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
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
                                <XCircleIcon className="ml-auto h-5 w-5 text-gray" />
                                </button>
                              </div>
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                              <div className="flex items-center gap-3">
                                <button onClick = {dupST} data-id = {session[0].toString()}>
                                  T
                                </button>
                              </div>
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                              <div className="flex items-center gap-3">
                                <button onClick = {dupSNW} data-id = {session[0].toString()}>
                                  NW
                                </button>
                              </div>
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                              <div className="flex items-center gap-3">
                                <button onClick = {dupSNM} data-id = {session[0].toString()}>
                                  NM
                                </button>
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