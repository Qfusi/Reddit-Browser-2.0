import { getToken } from "next-auth/jwt"
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server"

export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const session = await getSession({ req })

    const { pathname } = req.nextUrl;
    if (pathname.includes("/api/auth") || session) {
        return NextResponse.next();
    }
    
    if (!session && pathname !== "/login") {
        return NextResponse.redirect("/login");
    }
}