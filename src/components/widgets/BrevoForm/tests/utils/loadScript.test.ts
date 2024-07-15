import { loadScript } from '../../utils'
import { CAPTCHA_SCRIPT_ID, CAPTCHA_SCRIPT_SRC, MAIN_SCRIPT_SRC } from '../../utils/constants'

describe('loadScript', () => {
	beforeEach(() => {
		// Clean up the DOM before each test
		const existingScript = document.getElementById(CAPTCHA_SCRIPT_ID)
		if (existingScript) {
			document.body.removeChild(existingScript)
		}
	})

	it('should load a script from the provided URL', () => {
		const url = CAPTCHA_SCRIPT_SRC
		loadScript(CAPTCHA_SCRIPT_ID, url)

		const scriptElement: HTMLScriptElement | null = document.getElementById(
			CAPTCHA_SCRIPT_ID
		) as HTMLScriptElement | null
		expect(scriptElement).toBeTruthy()
		expect(scriptElement?.src).toBe(url)
		expect(scriptElement?.async).toBe(true)
		expect(scriptElement?.defer).toBe(true)
	})

	it('should update the script src if it already exists', () => {
		const url = CAPTCHA_SCRIPT_SRC
		const newUrl = MAIN_SCRIPT_SRC
		loadScript(CAPTCHA_SCRIPT_ID, url)

		const scriptElement: HTMLScriptElement | null = document.getElementById(
			CAPTCHA_SCRIPT_ID
		) as HTMLScriptElement | null
		expect(scriptElement?.src).toBe(url)

		loadScript(CAPTCHA_SCRIPT_ID, newUrl)
		expect(scriptElement?.src).toBe(newUrl)
	})
})
