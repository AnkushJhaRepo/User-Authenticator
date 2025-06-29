"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"

export default function ResetPassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [token, setToken] = useState("")
    const [reset, setReset] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)

    const resetPassword = async () => {
        if (!validateForm()) return

        try {
            setProcessing(true)
            setError("")
            await axios.post("/api/users/resetPassword", { password, token })
            setReset(true)
        } catch (error: any) {
            setError(error.response?.data?.message || "Failed to reset password. Please try again.")
            console.log("Reset password failed", error.message)
        } finally {
            setProcessing(false)
        }
    }

    const validateForm = () => {
        if (!password.trim()) {
            setError("Please enter a password")
            return false
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long")
            return false
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return false
        }
        if (!token) {
            setError("Invalid reset token")
            return false
        }
        return true
    }

    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength += 25
        if (/[a-z]/.test(password)) strength += 25
        if (/[A-Z]/.test(password)) strength += 25
        if (/[0-9]/.test(password)) strength += 12.5
        if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5
        return Math.min(strength, 100)
    }

    const getStrengthColor = (strength: number) => {
        if (strength < 25) return "bg-red-500"
        if (strength < 50) return "bg-orange-500"
        if (strength < 75) return "bg-yellow-500"
        return "bg-green-500"
    }

    const getStrengthText = (strength: number) => {
        if (strength < 25) return "Weak"
        if (strength < 50) return "Fair"
        if (strength < 75) return "Good"
        return "Strong"
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        resetPassword()
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(password))
    }, [password])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Reset Password</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-600">Enter your new password below</p>
                </div>

                {/* Success State */}
                {reset && (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-green-700 mb-2">Password Reset Successfully!</h2>
                            <p className="text-slate-600 mb-6">Your password has been updated. You can now log in with your new password.</p>
                        </div>
                        <a
                            href="/login"
                            className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Continue to Login
                        </a>
                    </div>
                )}

                {/* No Token State */}
                {!token && !reset && (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-red-700 mb-2">Invalid Reset Link</h2>
                            <p className="text-slate-600 mb-6">This password reset link is invalid or has expired. Please request a new one.</p>
                        </div>
                        <a
                            href="/forgot-password"
                            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Request New Reset Link
                        </a>
                    </div>
                )}

                {/* Form State */}
                {token && !reset && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* New Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full pr-12 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 ${
                                        error && !password ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                                    }`}
                                    disabled={processing}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {password && (
                                <div className="mt-2">
                                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                                        <span>Password strength</span>
                                        <span className={`font-medium ${passwordStrength >= 75 ? 'text-green-600' : passwordStrength >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {getStrengthText(passwordStrength)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                                            style={{ width: `${passwordStrength}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full pr-12 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 ${
                                        confirmPassword && password !== confirmPassword ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                                    }`}
                                    disabled={processing}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing || !password || !confirmPassword || password !== confirmPassword}
                            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                                processing || !password || !confirmPassword || password !== confirmPassword
                                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white'
                            }`}
                        >
                            {processing ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                    Updating Password...
                                </div>
                            ) : (
                                'Reset Password'
                            )}
                        </button>

                        {/* Password Requirements */}
                        <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                            <p className="font-medium mb-2">Password Requirements:</p>
                            <ul className="space-y-1">
                                <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : 'text-slate-500'}`}>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    At least 8 characters
                                </li>
                                <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-slate-500'}`}>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    One uppercase letter
                                </li>
                                <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-600' : 'text-slate-500'}`}>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    One lowercase letter
                                </li>
                                <li className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-600' : 'text-slate-500'}`}>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    One number
                                </li>
                            </ul>
                        </div>
                    </form>
                )}

                {/* Debug Token Info (only in development) */}
                {process.env.NODE_ENV === 'development' && token && (
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-500 mb-2">Debug Token:</p>
                        <p className="text-xs font-mono text-slate-700 break-all">{token}</p>
                    </div>
                )}
            </div>
        </div>
    )
}