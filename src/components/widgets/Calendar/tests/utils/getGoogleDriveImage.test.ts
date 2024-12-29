import { faker } from '@faker-js/faker'
import { parseIcsCalendar } from 'ts-ics'
import { fixGoogleIcsString, getGoogleDriveImage, getIcs } from '../../utils'
import { GOOGLE_IMAGE_URL, ICS_URL } from '../../utils/constants'

jest.mock('ts-ics', () => ({
	parseIcsCalendar: jest.fn()
}))

describe('fixGoogleIcsString', () => {
	it('returns empty string for undefined input', () => {
		expect(fixGoogleIcsString(undefined)).toBe('')
	})

	it('replaces escaped commas', () => {
		expect(fixGoogleIcsString('Hello\\, World')).toBe('Hello, World')
	})

	it('replaces escaped newlines', () => {
		expect(fixGoogleIcsString('Hello\\nWorld')).toBe('Hello\nWorld')
	})

	it('replaces escaped capital N', () => {
		expect(fixGoogleIcsString('Hello\\NWorld')).toBe('HelloNWorld')
	})

	it('replaces double backslashes', () => {
		expect(fixGoogleIcsString('Hello\\\\World')).toBe('Hello\\World')
	})

	it('replaces escaped semicolons', () => {
		expect(fixGoogleIcsString('Hello\\;World')).toBe('Hello;World')
	})

	it('handles multiple replacements', () => {
		expect(fixGoogleIcsString('Hello\\, World\\nNew\\\\Line\\;End')).toBe(
			'Hello, World\nNew\\Line;End'
		)
	})

	it('returns original string if no replacements needed', () => {
		const original = 'Hello World'
		expect(fixGoogleIcsString(original)).toBe(original)
	})
})

describe('getGoogleDriveImage', () => {
	it('returns Google Drive image URL', () => {
		const id = faker.string.uuid()
		const url = `${faker.internet.url()}?id=${id}`
		const expected = `${GOOGLE_IMAGE_URL(id)}`
		expect(getGoogleDriveImage(url)).toBe(expected)
	})

	it('returns correct URL if ID has special characters', () => {
		const id = faker.internet.password()
		const url = `${faker.internet.url()}?id=${id}`
		const expected = `${GOOGLE_IMAGE_URL(id)}`
		expect(getGoogleDriveImage(url)).toBe(expected)
	})

	it('returns empty string if no ID', () => {
		const url = faker.internet.url()
		expect(getGoogleDriveImage(url)).toBe('')
	})

	it('returns empty string for invalid URL', () => {
		const url = faker.lorem.word()
		expect(getGoogleDriveImage(url)).toBe('')
	})
})

describe('getIcs', () => {
	const mockCalendarData = 'BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR'
	const mockParsedResult = { type: 'VCALENDAR', properties: {}, components: [] }

	beforeEach(() => {
		global.fetch = jest.fn()
		;(parseIcsCalendar as jest.Mock).mockReturnValue(mockParsedResult)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('fetches and parses ICS data successfully', async () => {
		;(global.fetch as jest.Mock).mockResolvedValueOnce({
			text: () => Promise.resolve(mockCalendarData)
		})

		const id = faker.string.uuid()
		const result = await getIcs(id)

		expect(global.fetch).toHaveBeenCalledWith(ICS_URL(id), {
			method: 'GET'
		})
		expect(parseIcsCalendar).toHaveBeenCalledWith(mockCalendarData)
		expect(result).toEqual(mockParsedResult)
	})

	it('returns empty object on fetch error', async () => {
		;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

		const id = faker.string.uuid()
		const result = await getIcs(id)

		expect(result).toEqual({})
	})

	it('returns empty object on parse error', async () => {
		;(global.fetch as jest.Mock).mockResolvedValueOnce({
			text: () => Promise.resolve('invalid calendar data')
		})
		;(parseIcsCalendar as jest.Mock).mockImplementationOnce(() => {
			throw new Error('Parse error')
		})

		const id = faker.string.uuid()
		const result = await getIcs(id)

		expect(result).toEqual({})
	})
})
