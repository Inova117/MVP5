'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
    const router = useRouter()
    const { signIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await signIn(email, password)
            router.push('/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-background rounded-2xl shadow-2xl border border-border p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                    Welcome Back
                </h1>
                <p className="text-muted-foreground">
                    Sign in to continue your learning journey
                </p>
            </div>

            {/* Demo Login Buttons */}
            <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                            setEmail('student@demo.com')
                            setPassword('demo123')
                        }}
                        className="w-full"
                    >
                        Student Demo
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                            setEmail('instructor@demo.com')
                            setPassword('demo123')
                        }}
                        className="w-full"
                    >
                        Instructor Demo
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or sign in with email
                        </span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

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
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="••••••••"
                    />
                </div>

                <Button type="submit" className="w-full" loading={loading}>
                    Sign In
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link
                    href="/signup"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                >
                    Sign up
                </Link>
            </div>
        </div>
    )
}
