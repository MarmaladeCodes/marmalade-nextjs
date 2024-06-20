import { faker } from '@faker-js/faker'
import { getGoogleDriveImage } from '../../utils'
import { GOOGLE_IMAGE_URL } from '../../utils/constants'

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
