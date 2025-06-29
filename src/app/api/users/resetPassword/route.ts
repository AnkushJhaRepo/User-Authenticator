import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest){

    try {
        
        const reqBody = await request.json()
        const {password, token} = reqBody

        console.log(token)

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})

        if(!user) {
            console.log("No user found")
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword
        await user.save()

        return NextResponse.json({
            message: "Password updated successfully",
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