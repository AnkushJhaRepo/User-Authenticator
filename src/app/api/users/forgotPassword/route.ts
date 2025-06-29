import { sendEmail } from "@/helpers/mailer";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connect()


export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {email} = reqBody

        const user = await User.findOne({email})

        await sendEmail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({
            message: "mail sent",
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