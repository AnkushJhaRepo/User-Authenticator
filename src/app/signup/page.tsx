"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        label: "",
        color: "",
        requirements: {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false
        }
    });

    const calculatePasswordStrength = (password: string) => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        const score = Object.values(requirements).filter(Boolean).length;
        
        let label = "";
        let color = "";
        
        if (password.length === 0) {
            label = "";
            color = "";
        } else if (score < 2) {
            label = "Very Weak";
            color = "text-red-500";
        } else if (score < 3) {
            label = "Weak";
            color = "text-orange-500";
        } else if (score < 4) {
            label = "Good";
            color = "text-yellow-500";
        } else if (score < 5) {
            label = "Strong";
            color = "text-blue-500";
        } else {
            label = "Very Strong";
            color = "text-green-500";
        }

        return { score, label, color, requirements };
    };

    const getStrengthBarColor = (score: number) => {
        if (score < 2) return "bg-red-500";
        if (score < 3) return "bg-orange-500";
        if (score < 4) return "bg-yellow-500";
        if (score < 5) return "bg-blue-500";
        return "bg-green-500";
    };

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Completed", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("signup failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(user.password));
    }, [user.password]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {loading ? "Creating Account..." : "Create Account"}
                    </h1>
                    <p className="text-gray-600">Join us today and get started</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <div className="space-y-6">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                                    type="text"
                                    id="username"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    placeholder="Enter your username"
                                    disabled={loading}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                                    type="email"
                                    id="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    placeholder="Enter your email"
                                    disabled={loading}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                                    type="password"
                                    id="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    placeholder="Enter your password"
                                    disabled={loading}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {user.password && (
                                <div className="mt-3 space-y-2">
                                    {/* Strength Bar */}
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                                                    level <= passwordStrength.score
                                                        ? getStrengthBarColor(passwordStrength.score)
                                                        : "bg-gray-200"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Strength Label */}
                                    {passwordStrength.label && (
                                        <div className="flex justify-between items-center">
                                            <span className={`text-sm font-medium ${passwordStrength.color}`}>
                                                {passwordStrength.label}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {passwordStrength.score}/5
                                            </span>
                                        </div>
                                    )}
                                    
                                    {/* Requirements Checklist */}
                                    <div className="grid grid-cols-1 gap-1 text-xs">
                                        <div className={`flex items-center space-x-2 ${
                                            passwordStrength.requirements.length ? "text-green-600" : "text-gray-500"
                                        }`}>
                                            <svg className={`h-3 w-3 ${
                                                passwordStrength.requirements.length ? "text-green-500" : "text-gray-400"
                                            }`} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>At least 8 characters</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className={`flex items-center space-x-2 ${
                                                passwordStrength.requirements.uppercase ? "text-green-600" : "text-gray-500"
                                            }`}>
                                                <svg className={`h-3 w-3 ${
                                                    passwordStrength.requirements.uppercase ? "text-green-500" : "text-gray-400"
                                                }`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>Uppercase</span>
                                            </div>
                                            <div className={`flex items-center space-x-2 ${
                                                passwordStrength.requirements.lowercase ? "text-green-600" : "text-gray-500"
                                            }`}>
                                                <svg className={`h-3 w-3 ${
                                                    passwordStrength.requirements.lowercase ? "text-green-500" : "text-gray-400"
                                                }`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>Lowercase</span>
                                            </div>
                                            <div className={`flex items-center space-x-2 ${
                                                passwordStrength.requirements.number ? "text-green-600" : "text-gray-500"
                                            }`}>
                                                <svg className={`h-3 w-3 ${
                                                    passwordStrength.requirements.number ? "text-green-500" : "text-gray-400"
                                                }`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>Number</span>
                                            </div>
                                            <div className={`flex items-center space-x-2 ${
                                                passwordStrength.requirements.special ? "text-green-600" : "text-gray-500"
                                            }`}>
                                                <svg className={`h-3 w-3 ${
                                                    passwordStrength.requirements.special ? "text-green-500" : "text-gray-400"
                                                }`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>Special char</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Signup Button */}
                        <button
                            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                                buttonDisabled || loading
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
                            } ${loading ? "animate-pulse" : ""}`}
                            onClick={onSignup}
                            disabled={buttonDisabled || loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : buttonDisabled ? (
                                "Please fill all fields"
                            ) : (
                                "Create Account"
                            )}
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-4 border-t border-gray-100">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <Link 
                                    href="/login" 
                                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500">
                    <p>By creating an account, you agree to our Terms of Service</p>
                </div>
            </div>
        </div>
    );
}