import { motion } from 'framer-motion'
import { ReactNode } from 'react'


export const EntranceAnimation = ({
    children,
    delay = 0,
    direction = 'up'
}) => {
    const getInitialPosition = () => {
        switch (direction) {
            case 'left': return { x: -100, y: 0 }
            case 'right': return { x: 100, y: 0 }
            case 'up': return { x: 0, y: 100 }
            case 'down': return { x: 0, y: -100 }
        }
    }

    return (
        <motion.div
            initial={{
                ...getInitialPosition(),
                opacity: 0
            }}
            animate={{
                x: 0,
                y: 0,
                opacity: 1
            }}
            transition={{
                duration: 0.6,
                delay,
                ease: 'easeOut'
            }}
        >
            {children}
        </motion.div>
    )
}
