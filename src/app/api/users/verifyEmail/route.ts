import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
        
        if(!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        console.log(user)

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

        
        
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