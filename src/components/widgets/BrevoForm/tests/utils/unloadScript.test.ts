import { unloadScript } from '../../utils'
import { CAPTCHA_SCRIPT_ID } from '../../utils/constants'

describe('unloadScript', () => {
	beforeEach(() => {
		// Clean up the DOM before each test
		const existingScript = document.getElementById(CAPTCHA_SCRIPT_ID)
		if (existingScript) {
			document.body.removeChild(existingScript)
		}
	})

	it('should remove the script element from the DOM', () => {
		const scriptElement = document.createElement('script')
		scriptElement.id = CAPTCHA_SCRIPT_ID
		document.body.appendChild(scriptElement)

		unloadScript(CAPTCHA_SCRIPT_ID)

		const removedScript = document.getElementById(CAPTCHA_SCRIPT_ID)
		expect(removedScript).toBeNull()
	})

	it('should not throw an error if the script element does not exist', () => {
		expect(() => unloadScript(CAPTCHA_SCRIPT_ID)).not.toThrow()
	})
})
