import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true, expires: new Date(0)
        })

        return response

    } catch (error: unknown) {
    if (error instanceof Error) {
        return NextResponse.json({
            message: error.message
        }, { status: 500 });
    }

    return NextResponse.json({
        message: "An unknown error occurred"
    }, { status: 500 });
}

}