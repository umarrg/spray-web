import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'


export const Card = forwardRef(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl border border-gray-200 bg-white shadow-sm',
                    className
                )}
                {...props}
            />
        )
    }
)
Card.displayName = 'Card'



  

       