export function unloadScript(scriptId: string) {
	const script = document.getElementById(scriptId)
	if (script) {
		script.remove()
	}
}
