export const CardTitle = forwardRef(
    ({ className, ...props }, ref) => {
        return (
            <h3
                ref={ref}
                className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
                {...props}
            />
        )
    }
)
CardTitle.displayName = 'CardTitle'