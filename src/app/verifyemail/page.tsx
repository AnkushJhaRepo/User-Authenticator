"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'

export default function VerifyEmailPage() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token") || ""

    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const verifyUserEmail = async (token: string) => {
        try {
            setLoading(true)
            await axios.post('/api/users/verifyEmail', { token })
            setVerified(true)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(true)
                console.log(error.response?.data)
            } else {
                setError(true)
                console.error("Unknown error during email verification:", error)
            }
        } finally {
            setLoading(false)
        }
    }






    useEffect(() => {
        if (token) {
            verifyUserEmail(token)
        }
    }, [token])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 max-w-md w-full text-center">
                {/* Header */}
                <div className="mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Email Verification</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="space-y-4">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-slate-600">Verifying your email...</p>
                    </div>
                )}

                {/* Success State */}
                {verified && !loading && (
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-green-700 mb-2">Email Verified Successfully!</h2>
                            <p className="text-slate-600 mb-6">Your email has been verified. You can now access all features of your account.</p>
                        </div>
                        <Link href="/login" className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                            Continue to Login
                        </Link>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-red-700 mb-2">Verification Failed</h2>
                            <p className="text-slate-600 mb-6">There was an issue verifying your email. The token may be invalid or expired.</p>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Try Again
                            </button>
                            <Link href="/resend-verification" className="inline-block w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                                Resend Verification Email
                            </Link>
                        </div>
                    </div>
                )}

                {/* No Token State */}
                {!token && !loading && (
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-yellow-700 mb-2">No Verification Token</h2>
                            <p className="text-slate-600 mb-6">No verification token was found in the URL. Please check your email for the verification link.</p>
                        </div>
                        <Link href="/resend-verification" className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                            Request New Verification Email
                        </Link>
                    </div>
                )}

                {/* Token Debug Info (only in development) */}
                {process.env.NODE_ENV === 'development' && token && (
                    <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-500 mb-2">Debug Token:</p>
                        <p className="text-xs font-mono text-slate-700 break-all">{token}</p>
                    </div>
                )}
            </div>
        </div>
    )
}