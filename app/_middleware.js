// app/_middleware.js
"use client"
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    console.log('request',req);
  let session;
  //await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
