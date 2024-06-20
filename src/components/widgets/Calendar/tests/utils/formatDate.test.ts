import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'
import { DateFormatType } from '../../types'
import { formatDate } from '../../utils'

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
