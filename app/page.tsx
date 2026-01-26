import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GraduationCap, BookOpen, TrendingUp, Award } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="font-display font-bold text-2xl text-primary-600 flex items-center gap-2">
                    <GraduationCap className="w-8 h-8" />
                    <span>E-Learning</span>
                </div>
                <Link href="/login">
                    <Button variant="ghost" className="font-semibold">Sign In</Button>
                </Link>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 py-10">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
                        Learn at Your Own Pace
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Premium online courses with video streaming, progress tracking, and
                        certificates. Join thousands of learners worldwide.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/signup">
                            <Button size="lg">Get Started Free</Button>
                        </Link>
                        <Link href="/courses">
                            <Button variant="outline" size="lg">
                                Browse Courses
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                    <div className="bg-background rounded-xl p-6 shadow-lg border border-border">
                        <GraduationCap className="w-12 h-12 text-primary-600 mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            Expert Instructors
                        </h3>
                        <p className="text-muted-foreground">
                            Learn from industry professionals with real-world experience
                        </p>
                    </div>

                    <div className="bg-background rounded-xl p-6 shadow-lg border border-border">
                        <BookOpen className="w-12 h-12 text-primary-600 mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            HD Video Content
                        </h3>
                        <p className="text-muted-foreground">
                            High-quality video lessons with playback controls and speed
                            options
                        </p>
                    </div>

                    <div className="bg-background rounded-xl p-6 shadow-lg border border-border">
                        <TrendingUp className="w-12 h-12 text-primary-600 mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            Track Progress
                        </h3>
                        <p className="text-muted-foreground">
                            Monitor your learning journey with detailed progress metrics
                        </p>
                    </div>

                    <div className="bg-background rounded-xl p-6 shadow-lg border border-border">
                        <Award className="w-12 h-12 text-primary-600 mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            Earn Certificates
                        </h3>
                        <p className="text-muted-foreground">
                            Get recognized for your achievements with course certificates
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 text-center bg-primary-600 text-white rounded-2xl p-12">
                    <h2 className="text-3xl font-display font-bold mb-4">
                        Ready to Start Learning?
                    </h2>
                    <p className="text-lg mb-8 opacity-90">
                        Join our community of learners and instructors today
                    </p>
                    <Link href="/signup">
                        <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                            Create Account
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
