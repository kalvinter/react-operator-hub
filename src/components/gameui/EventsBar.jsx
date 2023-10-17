import React, {useContext} from 'react'

import { effectDirection } from '../../game/Events.js';
import {ArrowDownCircleIcon, ArrowUpCircleIcon} from '@heroicons/react/20/solid'
import { EventDataContext } from '../Game';
import Card from '../common/Card.jsx';

export default function EventsBar() {
    const eventData = useContext(EventDataContext)

    const activeEvents = eventData.activeEvents.map((activeEvent) => {
        let element = activeEvent.originalEvent

        let icon;

        if (element.direction === effectDirection.increase){
            icon = <ArrowUpCircleIcon className='small-icon'></ArrowUpCircleIcon>
        } else {
            icon = <ArrowDownCircleIcon className='small-icon'></ArrowDownCircleIcon>
        }

        return (
            <div className='mx-3' key={element.id}><span className='flex items-center'>{icon} &nbsp;{element.title}</span></div>
        )
    })
    
    let eventPrefixLabel = (eventData.upcomingEventChange)? (<span className='text-orange-600'>WARNING:</span>) : (<span>STATUS:</span>)

    return (
        <Card className="w-full">
            <div className='w-full my-2 flex justify-between items-center'>
                <div className='w-full my-1 border-solid border-2 rounded border-gray-900 bg-black p-2 flex items-center min-h-[3rem]'>
                    <span>{eventPrefixLabel} {eventData.displayedEventText}</span>
                </div>
            </div>
            <div className='w-full my-2 flex justify-between items-center'>
                <b className='ml-2 mr-4 whitespace-nowrap'>Active Events</b>
                <div className='w-full my-1 flex items-center flex-wrap gap-2' id='activeEventsArea'>
                    {activeEvents}
                </div>
            </div>
        </Card>
    )
}
