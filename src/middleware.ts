import { getSessionCookie } from "better-auth/cookies";

import { cookiePrefix } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request, {
		cookiePrefix,
	});
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/"],
};
