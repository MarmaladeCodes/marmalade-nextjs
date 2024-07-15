export function loadScript(scriptId: string, src: string) {
	let script: HTMLScriptElement | null = document.getElementById(
		scriptId
	) as HTMLScriptElement | null
	if (!script) {
		script = document.createElement('script')
		script.src = src
		script.async = true
		script.defer = true
		script.id = scriptId
		document.body.appendChild(script)
	} else {
		// Update the script src to force reload if it's already present
		script.src = src
	}
}
