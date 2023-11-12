import { PropsWithChildren } from 'react'
import { Alert, Footer } from 'components'
import { PreviewProps } from 'types'

export function Layout({ preview, children }: PropsWithChildren<PreviewProps>) {
	return (
		<>
			<div className='min-h-screen'>
				<Alert preview={preview} />
				<main>{children}</main>
			</div>
			<Footer />
		</>
	)
}
