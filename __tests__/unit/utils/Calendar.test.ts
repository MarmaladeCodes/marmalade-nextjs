import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'
import { DateFormatType, compareDate, formatDate, getGoogleDriveImage } from 'utils/Calendar'
import { GOOGLE_IMAGE_URL } from 'utils/constants'

describe('compareDate', () => {
	it('returns 1 if passed date is in the future', () => {
		const date = DateTime.local().plus({ days: 1 })
		expect(compareDate(date)).toBe(1)
	})

	it('returns 0 if passed date is today', () => {
		const date = DateTime.local()
		expect(compareDate(date)).toBe(0)
	})

	it('returns -1 if passed date is in the past', () => {
		const date = DateTime.local().minus({ days: 1 })
		expect(compareDate(date)).toBe(-1)
	})
})

describe('formatDate', () => {
	test('returns null if no date passed', () => {
		expect(formatDate({})).toBeNull()
	})

	test('formats date object', () => {
		const date = faker.date.soon()
		const expected = DateTime.fromJSDate(date).toFormat(DateFormatType.DATE)
		expect(formatDate({ date })).toBe(expected)
	})

	test('formats date string', () => {
		const date = DateTime.local().toFormat(DateFormatType.DATE)
		expect(formatDate({ date })).toBe(date)
	})

	test('returns formatted date', () => {
		const format = 'MMMM dd, yyyy'
		const date = faker.date.soon()
		const expected = DateTime.fromJSDate(date).toFormat(format)
		expect(formatDate({ date, format: format })).toBe(expected)
	})

	test('returns formatted time', () => {
		const format = DateFormatType.TIME
		const date = faker.date.soon()
		const expected = DateTime.fromJSDate(date).toFormat(format)
		expect(formatDate({ date, format })).toBe(expected)
	})

	test('returns null on invalid date', () => {
		expect(formatDate({ date: 'invalid' })).toBeNull()
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
