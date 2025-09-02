import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils/format'



export const MoneyFall = ({ amount, position }) => {
    return (
        <motion.div
            initial={{
                x: `${position}%`,
                y: -100,
                rotate: 0,
                opacity: 1
            }}
            animate={{
                y: window.innerHeight + 100,
                rotate: 360,
                opacity: 0
            }}
            transition={{
                duration: 4,
                ease: 'linear'
            }}
            className="fixed text-4xl font-bold text-green-500 pointer-events-none z-50"
            style={{
                left: `${position}%`,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}
        >
            💵 {formatCurrency(amount)}
        </motion.div>
    )
}