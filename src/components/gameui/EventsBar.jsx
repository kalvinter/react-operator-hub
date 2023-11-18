import { useContext } from 'react'

import { effectDirection } from '../../game/Events.js'
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/20/solid'
import { EventDataContext } from '../../pages/Game.jsx'
import Card from '../common/Card.jsx'
import { useTranslation } from 'react-i18next'

function EventTag(props) {
    let icon

    if (props.element.direction === effectDirection.increase) {
        icon = <ArrowUpCircleIcon className="small-icon"></ArrowUpCircleIcon>
    } else {
        icon = <ArrowDownCircleIcon className="small-icon"></ArrowDownCircleIcon>
    }

    return (
        <div
            className="mx-3 border-2 px-2 py-1 md:w-fit w-full border-solid rounded border-color-element"
            key={props.element.id}
        >
            <span className="flex items-center">
                <span className="mr-2">{icon}</span>
                {props.element.getTitle()}
            </span>
        </div>
    )
}

export default function EventsBar() {
    const {t} = useTranslation()

    const eventData = useContext(EventDataContext)

    const activeEvents = eventData.activeEvents.map((activeEvent) => {
        let element = activeEvent.originalEvent

        return <EventTag key={element.id} element={element} />
    })

    let eventPrefixLabel = eventData.upcomingEventChange ? <span className="text-orange-600">{t("Events--New-Event-Prefix")}:</span> : null

    return (
        <Card className="w-full">
            <div className="w-full my-2 flex justify-between items-center">
                <div className="w-full my-1 border-solid border-2 text-color--light rounded border-color-card bg-black p-2 flex items-center min-h-[3rem]">
                    <span>
                        {eventPrefixLabel} {eventData.displayedEventText}
                    </span>
                </div>
            </div>
            <div className="w-full my-2 gap-2 flex flex-col md:flex-row justify-between items-center">
                <b className="ml-2 md:mr-4 w-full md:w-fit whitespace-nowrap">{t("Events--Active-Events-Header")}</b>
                <div className="w-full my-1 flex items-center flex-wrap gap-2" id="activeEventsArea">
                    {activeEvents.length > 0 ? activeEvents : '-'}
                </div>
            </div>
        </Card>
    )
}
