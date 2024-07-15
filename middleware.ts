import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PROD_DOMAIN } from 'utils/constants'

const [BASIC_AUTH_USER, BASIC_AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':')

export function middleware(req: NextRequest) {
	// HTTP Basic Auth Middleware for Challenge
	if (!isAuthenticated(req)) {
		return new NextResponse('Authentication required', {
			status: 401,
			headers: { 'WWW-Authenticate': 'Basic' }
		})
	}

	return NextResponse.next()
}

// Check HTTP Basic Auth header if present
function isAuthenticated(req: NextRequest) {
	console.debug('NextRequest.nextUrl', req.nextUrl)
	console.debug('process.env.WP_DOMAIN', process.env.WP_DOMAIN)
	console.debug('PROD_DOMAIN', PROD_DOMAIN)
	// Don't authenticate in production
	if (process.env.WP_DOMAIN === PROD_DOMAIN) {
		return true
	}
	const authheader = req.headers.get('authorization') || req.headers.get('Authorization')

	if (!authheader) {
		return false
	}

	const auth = Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':')
	const user = auth[0]
	const pass = auth[1]

	if (user == BASIC_AUTH_USER && pass == BASIC_AUTH_PASS) {
		return true
	} else {
		return false
	}
}

// Step 3. Configure "Matching Paths" below to protect routes with HTTP Basic Auth
export const config = {
	matcher: '/some/admin/page/:path*'
}
