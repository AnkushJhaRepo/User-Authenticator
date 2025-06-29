import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        console.log(reqBody)

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        try {
            await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
        } catch (err) {
            console.error("Email sending failed:", err);
            // Still return success — don't block signup
        }

        return NextResponse.json({
            message: "User created successfully",
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