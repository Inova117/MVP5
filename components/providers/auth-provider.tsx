'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Profile, UserRole } from '@/types/database'

// Simplified User interface for Mock purpose
interface User {
    id: string
    email: string
}

interface AuthContextType {
    user: User | null
    profile: Profile | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (
        email: string,
        password: string,
        fullName: string,
        role: UserRole
    ) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USER: User = {
    id: 'mock-user-id',
    email: 'demo@example.com',
}

const MOCK_PROFILE_STUDENT: Profile = {
    id: 'mock-user-id',
    role: 'student',
    full_name: 'Demo Student',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
}

const MOCK_PROFILE_INSTRUCTOR: Profile = {
    id: 'mock-user-id',
    role: 'instructor',
    full_name: 'Demo Instructor',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check localStorage for persisted session
        const storedRole = localStorage.getItem('demo_role') as UserRole | null

        if (storedRole) {
            setUser(MOCK_USER)
            setProfile(storedRole === 'instructor' ? MOCK_PROFILE_INSTRUCTOR : MOCK_PROFILE_STUDENT)
        }

        setLoading(false)
    }, [])

    const signIn = async (email: string, _password: string) => {
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Auto-detect role for demo purposes (instructor@... vs anything else)
        // Or just default to student if not specified
        const isInstructor = email.includes('instructor')
        const role = isInstructor ? 'instructor' : 'student'

        setUser(MOCK_USER)
        setProfile(isInstructor ? MOCK_PROFILE_INSTRUCTOR : MOCK_PROFILE_STUDENT)
        localStorage.setItem('demo_role', role)

        setLoading(false)
    }

    const signUp = async (
        _email: string,
        _password: string,
        fullName: string,
        role: UserRole
    ) => {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))

        setUser(MOCK_USER)
        setProfile({
            ...MOCK_PROFILE_STUDENT,
            role,
            full_name: fullName
        })
        localStorage.setItem('demo_role', role)

        setLoading(false)
    }

    const signOut = async () => {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        setUser(null)
        setProfile(null)
        localStorage.removeItem('demo_role')
        setLoading(false)
    }

    return (
        <AuthContext.Provider
            value={{ user, profile, loading, signIn, signUp, signOut }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
