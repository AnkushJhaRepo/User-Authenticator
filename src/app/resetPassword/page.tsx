"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"

export default function ResetPassword() {

    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")
    const [reset, setReset] = useState(false)

    const resetPassword = async () => {
        await axios.post("/api/users/resetPassword", {password, token})
        setReset(true)
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <label htmlFor="password"> Password</label>
            <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-1 bg-white text-black mb-4 rounded-md"
            />
            <button
                className="p-4 bg-blue-500 rounded-lg"
                onClick={resetPassword}
            >
                {reset ? "Password changed": "submit"}</button>
        </div>
    )
}