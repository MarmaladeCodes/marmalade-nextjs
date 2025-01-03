import { VCalendar, parseIcsCalendar } from 'ts-ics'
import { GOOGLE_IMAGE_URL, ICS_URL } from './constants'

export function fixGoogleIcsString(string?: string): string {
	if (!string) return ''
	return string
		.replace(/\\,/g, ',')
		.replace(/\\n/g, '\n')
		.replace(/\\N/g, 'N')
		.replace(/\\\\/g, '\\')
		.replace(/\\;/g, ';')
}

export function getGoogleDriveImage(url: string) {
	try {
		const id = new URL(url).searchParams.get('id')
		if (!id) {
			console.log(`getGoogleDriveImage was passed a URL with no image id (${url})`)
			return ''
		}
		return `${GOOGLE_IMAGE_URL(id)}`
	} catch (error) {
		console.error(`getGoogleDriveImage was passed an invalid URL (${url})`, error)
		return ''
	}
}

export async function getIcs(id: string): Promise<VCalendar | Record<string, never>> {
	try {
		const response = await fetch(ICS_URL(id), { method: 'GET' })
		const textString = await response.text()
		return parseIcsCalendar(textString)
	} catch (error) {
		console.error('Error fetching or parsing ICS:', error)
		return {}
	}
}
