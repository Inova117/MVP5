import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
    {
        variants: {
            variant: {
                primary:
                    'bg-primary text-primary-foreground shadow-tactile hover:shadow-lift hover:scale-[1.02] hover:-translate-y-0.5',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-tactile-sm hover:bg-secondary/80 hover:shadow-tactile hover:-translate-y-0.5',
                outline:
                    'border-2 border-primary/20 bg-background hover:bg-primary/5 hover:text-primary-700 hover:border-primary/50',
                ghost: 'hover:bg-muted hover:text-foreground',
                destructive:
                    'bg-destructive text-destructive-foreground shadow-tactile hover:bg-destructive/90 hover:shadow-lift',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                sm: 'h-9 px-4 text-xs',
                md: 'h-11 px-6',
                lg: 'h-14 px-8 text-base',
                icon: 'h-11 w-11',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, loading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={loading || props.disabled}
                {...props}
            >
                {loading ? (
                    <>
                        <svg
                            className="h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Loading...
                    </>
                ) : (
                    children
                )}
            </button>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
