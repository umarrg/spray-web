export const CardContent = forwardRef(
    ({ className, ...props }, ref) => {
        return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
    }
)
CardContent.displayName = 'CardContent'