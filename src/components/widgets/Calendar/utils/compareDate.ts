import { DateTime } from 'luxon'

export enum DateFormatType {
	DATE = 'MMMM dd, yyyy',
	TIME = 'h:mm'
}
type DateFormat = DateFormatType.DATE | DateFormatType.TIME | string

export function compareDate(date: DateTime): number {
	const today = DateTime.local().startOf('day')
	date = date.startOf('day')

	if (today < date) {
		return 1
	} else if (today.equals(date)) {
		return 0
	}
	// today > eventDate
	return -1
}
