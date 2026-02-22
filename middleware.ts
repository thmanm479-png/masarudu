import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Helper function to verify JWT in Edge Runtime
async function verifySession(session: string): Promise<boolean> {
    try {
        const secretKey = process.env.JWT_SECRET || "fallback-secret-key";
        const key = new TextEncoder().encode(secretKey);

        await jwtVerify(session, key, {
            algorithms: ["HS256"],
        });

        return true;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return false;
    }
}

export async function middleware(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;

        // Protect admin routes (UI)
        if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
            const session = request.cookies.get("admin_session")?.value;

            if (!session) {
                return NextResponse.redirect(new URL("/admin/login", request.url));
            }

            const isValid = await verifySession(session);
            if (!isValid) {
                const response = NextResponse.redirect(new URL("/admin/login", request.url));
                response.cookies.delete("admin_session");
                return response;
            }

            return NextResponse.next();
        }

        // Protect admin API routes
        if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login") && !pathname.startsWith("/api/admin/logout")) {
            const session = request.cookies.get("admin_session")?.value;

            if (!session) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            const isValid = await verifySession(session);
            if (!isValid) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            return NextResponse.next();
        }

        return NextResponse.next();
    } catch (error) {
        // Catch any unexpected errors to prevent application crashes
        console.error("Middleware error:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
