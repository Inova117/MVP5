'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Video } from 'lucide-react'

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
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground mb-4 shadow-tactile">
                        <Video className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-foreground">
                        Tactile Academy
                    </h1>
                </div>

                <Card className="shadow-tactile-lg border-primary/5">
                    <CardHeader className="space-y-1 text-center pb-8">
                        <CardTitle className="text-2xl font-serif">Welcome Back</CardTitle>
                        <CardDescription>
                            Sign in to continue your learning journey
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Demo Login Buttons */}
                        <div className="flex flex-col gap-3">
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
                                <span className="bg-card px-2 text-muted-foreground rounded-full">
                                    Or sign in with email
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive text-center">
                                    {error}
                                </div>
                            )}

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
                                    autoComplete="email"
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
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                            </div>

                            <Button type="submit" className="w-full mt-2" loading={loading} size="lg">
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link
                                href="/signup"
                                className="text-primary font-medium hover:underline underline-offset-4"
                            >
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
