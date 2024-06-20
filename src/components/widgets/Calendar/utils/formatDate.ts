import { DateTime } from 'luxon'
import { DateFormat, DateFormatType } from '../types'
import { normalizeDate } from './'

export function formatDate({
	date,
	format = DateFormatType.DATE
}: {
	date?: Date | string
	format?: DateFormat
}): string | null {
	if (!date) return null
	const normalizedDate = normalizeDate(date)
	if (isNaN(normalizedDate.getTime())) {
		console.error(`formatDate was passed an invalid date (${date})`)
		return null
	}
	const formatted = DateTime.fromJSDate(normalizedDate).toFormat(format)
	return formatted
}
