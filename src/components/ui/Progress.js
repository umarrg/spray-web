import { cn } from "@/lib/utils"
import { motion } from 'framer-motion'

export const Progress = ({ value, max = 100, className, showLabel = false }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    return (
        <div className={cn('w-full', className)}>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute h-full bg-gradient-to-r from-purple-600 to-pink-600"
                />
            </div>
            {showLabel && (
                <div className="mt-2 text-sm text-gray-600 text-center">
                    {percentage.toFixed(1)}%
                </div>
            )}
        </div>
    )
}