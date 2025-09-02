import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'


export const Select = forwardRef(
    ({ className, children, ...props }, ref) => {
        return (
            <select
                className={cn(
                    'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </select>
        )
    }
)
Select.displayName = 'Select'