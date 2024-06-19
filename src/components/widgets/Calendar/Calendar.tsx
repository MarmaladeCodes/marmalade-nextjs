import { VEvent } from 'ts-ics'
import { SortOrder, SortOrderType } from './types'
import { buildAndSortEvents } from './utils'
import { NO_EVENTS_MSG } from './utils/constants'

export function Calendar({
	all = false,
	events = [],
	order = SortOrder.ASC,
	past = false
}: {
	all?: boolean
	events?: VEvent[]
	order?: SortOrderType
	past?: boolean
}): JSX.Element {
	const elements: JSX.Element[] = buildAndSortEvents({ all, events, order, past })
	if (elements.length === 0) {
		return <p className={'pb-6 flex'}>{NO_EVENTS_MSG}</p>
	}
	return <>{elements}</>
}
