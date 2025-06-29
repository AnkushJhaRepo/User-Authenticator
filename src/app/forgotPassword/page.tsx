"use client"
import axios from "axios"
import React, { useState } from "react"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [processing, setProcessing] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const sendForgotPasswordEmail = async () => {
        if (!email.trim()) {
            setError("Please enter your email address")
            return
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address")
            return
        }

        try {
            setProcessing(true)
            setError("")
            await axios.post("/api/users/forgotPassword", { email })
            setSuccess(true)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Failed to reset password. Please try again.")
                console.log("Reset password failed", error.message)
            } else {
                setError("An unexpected error occurred. Please try again.")
                console.error("Unknown error during password reset", error)
            }
        } finally {
            setProcessing(false)
        }
    }

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendForgotPasswordEmail()
    }

    const resetForm = () => {
        setSuccess(false)
        setError("")
        setEmail("")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Forgot Password?</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-600">No worries! Enter your email address and we&apos;ll send you a link to reset your password.</p>
                </div>

                {/* Success State */}
                {success && (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-green-700 mb-2">Email Sent!</h2>
                            <p className="text-slate-600 mb-4">We&apos;ve sent a password reset link to <span className="font-semibold text-slate-800">{email}</span></p>
                            <p className="text-sm text-slate-500">Please check your inbox and follow the instructions to reset your password.</p>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={resetForm}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Send Another Email
                            </button>
                            <a
                                href="/login"
                                className="inline-block w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                            >
                                Back to Login
                            </a>
                        </div>
                    </div>
                )}

                {/* Form State */}
                {!success && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${error ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                                        }`}
                                    disabled={processing}
                                />
                            </div>
                            {error && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing || !email.trim()}
                            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${processing || !email.trim()
                                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                                }`}
                        >
                            {processing ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                    Sending Email...
                                </div>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-slate-600">
                                {"Remember your password?"}
                                <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                                    Back to Login
                                </a>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}