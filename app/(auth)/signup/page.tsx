'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import type { UserRole } from '@/types/database'
import { GraduationCap, User } from 'lucide-react'

export default function SignupPage() {
    const router = useRouter()
    const { signUp } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [role, setRole] = useState<UserRole>('student')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await signUp(email, password, fullName, role)
            // Redirect based on role
            router.push(role === 'instructor' ? '/instructor' : '/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign up')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-background rounded-2xl shadow-2xl border border-border p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                    Create Account
                </h1>
                <p className="text-muted-foreground">
                    Join thousands of learners worldwide
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div>
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-foreground mb-2"
                    >
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-foreground mb-2"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="••••••••"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                        At least 6 characters
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                        I want to
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`p-4 rounded-lg border-2 transition-all ${role === 'student'
                                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-border hover:border-primary-300'
                                }`}
                        >
                            <User
                                className={`w-8 h-8 mx-auto mb-2 ${role === 'student'
                                        ? 'text-primary-600'
                                        : 'text-muted-foreground'
                                    }`}
                            />
                            <div className="text-sm font-medium text-foreground">
                                Learn
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Take courses
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole('instructor')}
                            className={`p-4 rounded-lg border-2 transition-all ${role === 'instructor'
                                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-border hover:border-primary-300'
                                }`}
                        >
                            <GraduationCap
                                className={`w-8 h-8 mx-auto mb-2 ${role === 'instructor'
                                        ? 'text-primary-600'
                                        : 'text-muted-foreground'
                                    }`}
                            />
                            <div className="text-sm font-medium text-foreground">Teach</div>
                            <div className="text-xs text-muted-foreground">
                                Create courses
                            </div>
                        </button>
                    </div>
                </div>

                <Button type="submit" className="w-full" loading={loading}>
                    Create Account
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                >
                    Sign in
                </Link>
            </div>
        </div>
    )
}
