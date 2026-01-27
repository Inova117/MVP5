'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import type { UserRole } from '@/types/database'
import { GraduationCap, User, Video, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

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
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground mb-4 shadow-tactile">
                        <Video className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-foreground">
                        Join Tactile Academy
                    </h1>
                </div>

                <Card className="shadow-tactile-lg border-primary/5">
                    <CardHeader className="space-y-1 text-center pb-6">
                        <CardTitle className="text-2xl font-serif">Create Account</CardTitle>
                        <CardDescription>
                            Join thousands of learners worldwide
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-foreground block ml-1">
                                    I want to
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setRole('student')}
                                        className={cn(
                                            "p-4 rounded-xl border-2 text-left transition-all duration-300 relative overflow-hidden group",
                                            role === 'student'
                                                ? 'border-primary bg-primary/5 shadow-tactile-sm'
                                                : 'border-border bg-card hover:border-primary/30 hover:bg-muted/50'
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors",
                                            role === 'student' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                        )}>
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className="font-serif font-bold text-foreground mb-1">Learn</div>
                                        <div className="text-xs text-muted-foreground font-sans">Take courses and build skills</div>
                                        {role === 'student' && (
                                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setRole('instructor')}
                                        className={cn(
                                            "p-4 rounded-xl border-2 text-left transition-all duration-300 relative overflow-hidden group",
                                            role === 'instructor'
                                                ? 'border-primary bg-primary/5 shadow-tactile-sm'
                                                : 'border-border bg-card hover:border-primary/30 hover:bg-muted/50'
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors",
                                            role === 'instructor' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                        )}>
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <div className="font-serif font-bold text-foreground mb-1">Teach</div>
                                        <div className="text-xs text-muted-foreground font-sans">Share knowledge and earn</div>
                                        {role === 'instructor' && (
                                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="fullName"
                                        className="text-sm font-medium text-foreground block ml-1"
                                    >
                                        Full Name
                                    </label>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-foreground block ml-1"
                                    >
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium text-foreground block ml-1"
                                    >
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        placeholder="••••••••"
                                    />
                                    <p className="text-xs text-muted-foreground ml-1">
                                        Must be at least 6 characters
                                    </p>
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-12 text-base shadow-tactile hover:shadow-lift hover:-translate-y-0.5 transition-all" loading={loading}>
                                Create Account <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="justify-center pb-8 pt-2">
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-primary font-medium hover:underline underline-offset-4"
                            >
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
