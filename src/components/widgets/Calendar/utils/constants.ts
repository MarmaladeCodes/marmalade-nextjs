export const END_TIME_PREFIX = 'till '

export function GOOGLE_IMAGE_URL(id?: string) {
	if (!id) return ''
	return `https://drive.google.com/uc?export=view&id=${id}sz=w1000`
}

export function ICS_URL(calendar_id: string) {
	return `https://calendar.google.com/calendar/ical/${calendar_id}/public/basic.ics`
}

export const LOCATION_PREFIX = '@ '

export const NO_EVENTS_MSG = 'Stay tuned!'

export const POSTER_ALT_PREFIX = 'Poster for '
