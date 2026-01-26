import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(_request: NextRequest) {
    // DEMO MODE: Middleware disabled to allow access without real Supabase session
    // In a real app, strict session checking would happen here

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/instructor/:path*'],
}
