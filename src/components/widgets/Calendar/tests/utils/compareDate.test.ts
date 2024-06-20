import { DateTime } from 'luxon'
import { compareDate } from '../../utils'

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
