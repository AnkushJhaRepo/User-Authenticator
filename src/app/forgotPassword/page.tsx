"use client"
import axios from "axios"
import React, { useState } from "react"

export default function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [processing, setProcessing] = useState(false)

    const sendForgotPasswordEmail = async () => {

        try {
            setProcessing(true)
            await axios.post("/api/users/forgotPassword", { email })
        } catch (error: any) {
            setProcessing(false)
            console.log("ForgotPassword failed", error.message)
        }finally{
            setProcessing(false)
        }
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p>Provide me your email</p>
            <br />
            <label htmlFor="email">Email</label>
            <input
                className="border-1 bg-white text-black mb-4 rounded-md"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className="bg-blue-500 p-2 rounded-lg"
                type="button"
                onClick={sendForgotPasswordEmail}
            >
                {processing ? "Processing":"Send Email"}
            </button>
        </div>
    )
}