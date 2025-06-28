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
        
    } catch (error: any) {
        return NextResponse.json({
            message: error.messagae
        }, {status: 500})
    }
}