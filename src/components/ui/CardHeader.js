export const CardHeader = forwardRef(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('flex flex-col space-y-1.5 p-6', className)}
                {...props}
            />
        )
    }
)
CardHeader.displayName = 'CardHeader'