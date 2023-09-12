import React, {useContext} from 'react'

import { effectDirection } from '../../Events.js';
import {ArrowDownCircleIcon, ArrowUpCircleIcon} from '@heroicons/react/20/solid'
import { EventDataContext } from '../Game';

export default function EventsBar() {
    const eventData = useContext(EventDataContext)

    const activeEvents = eventData.activeEvents.map((activeEvent) => {
        let element = activeEvent.originalEvent
        return (
            <div className='mx-3' key={element.id}><span className='flex items-center'>{element.direction === effectDirection.increase ?  <ArrowUpCircleIcon></ArrowUpCircleIcon>: <ArrowDownCircleIcon></ArrowDownCircleIcon>} &nbsp;{element.title}</span></div>
        )
    })
    
    let eventPrefixLabel = (eventData.upcomingEventChange)? (<span className='text-orange-600'>WARNING:</span>) : (<span>STATUS:</span>)

    return (
        <div className="w-full my-2 border-solid border-2 rounded border-gray-900 p-2 bg-neutral-700">
            <div className='w-full my-2 flex justify-between items-center'>
                <div className='w-full my-1 border-solid border-2 rounded border-gray-900 bg-black p-2 flex items-center' id='eventsArea'>
                    <span>{eventPrefixLabel} {eventData.displayedEventText}</span>
                </div>
            </div>
            <div className='w-full my-2 flex justify-between items-center'>
                <b className='ml-2 mr-4 whitespace-nowrap'>Active Events</b>
                <div className='w-full my-1 flex items-center' id='activeEventsArea'>
                    {activeEvents}
                </div>
            </div>
        </div>
    )
}
