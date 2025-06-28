"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NextResponse, NextRequest } from "next/server"
import axios from "axios"


export default function LoginPage() {
    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            console.log("Login data:", user)
            const response = await axios.post("/api/users/login", user)
            console.log("Login success", response.data)
            router.push("/profile")
        } catch (error: any) {
            console.log("Login failed", error.message)
        } finally {
            setLoading(false)
        }
    }

    const forgotPassword = () => {
        try {
            router.push('/forgotPassword')
        } catch (error: any) {
            console.log("Forgot password failed", error.message)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <br />
            <div className="flex flex-col border-white border-2 rounded-lg px-2 mb-4">
                <label htmlFor="email" className="text-center my-2">email</label>
                <input
                    className="border-1 bg-white text-black mb-4 rounded-md"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                />
                <label htmlFor="password"
                className="text-center mb-2">password</label>
                <input
                    className="border-1 bg-white text-black mb-4 rounded-md"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="p-2 bg-blue-500 rounded-lg my-4 mr-4"
                        onClick={onLogin}
                    >{buttonDisabled ? "No Login" : "Login"}
                    </button>
                    <button
                        type="button"
                        className="p-2 bg-gray-500 rounded-lg my-4"
                        onClick={forgotPassword}
                    >
                        Forgot password
                    </button>
                </div>
            </div>
            <Link href={"/signup"}>Visit signup page</Link>
        </div>
    )
}