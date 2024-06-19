import { DateTime } from 'luxon'
import { VEvent } from 'ts-ics'
import { Event } from '../'
import { SortOrder, SortOrderType } from '../types'
import { DateFormatType, compareDate, formatDate, normalizeDate } from './'

export function buildAndSortEvents({
	all = false,
	events = [],
	order = SortOrder.ASC,
	past = false
}: {
	all?: boolean
	events?: VEvent[]
	order?: SortOrderType
	past?: boolean
}): JSX.Element[] {
	const eventObj: { [date: string]: JSX.Element } = {}
	events.forEach((event: VEvent, index: number): void => {
		const date = normalizeDate(event.start.date)
		const formattedDate = formatDate({ date })
		if (!formattedDate) return
		const timestamp = date.getTime()
		const comparedDates = compareDate(DateTime.fromFormat(formattedDate, DateFormatType.DATE))
		if (!all && ((past && comparedDates >= 0) || (!past && comparedDates < 0))) {
			return
		}
		eventObj[timestamp] = <Event data={event} index={index} key={`event-${index}`} />
	})
	const sortedEvents = Object.keys(eventObj).sort()
	if (order === SortOrder.DESC) {
		sortedEvents.reverse()
	}
	return sortedEvents.map((timestamp) => eventObj[timestamp])
}
