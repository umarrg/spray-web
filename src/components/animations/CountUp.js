import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'


export const CountUp = ({
    end,
    duration = 2,
    prefix = '',
    suffix = '',
    className = ''
}) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let startTime = null
        const startValue = 0

        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

            setCount(Math.floor(progress * (end - startValue) + startValue))

            if (progress < 1) {
                requestAnimationFrame(updateCount)
            }
        }

        requestAnimationFrame(updateCount)
    }, [end, duration])

    return (
        <motion.span
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className={className}
        >
            {prefix}{count.toLocaleString()}{suffix}
        </motion.span>
    )
}