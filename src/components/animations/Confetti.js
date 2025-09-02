import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'



export const Confetti = () => {
    const [pieces, setPieces] = useState([])

    useEffect(() => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#6C5CE7', '#FD79A8', '#FDCB6E']
        const newPieces = []

        for (let i = 0; i < 100; i++) {
            newPieces.push({
                id: i,
                x: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 2
            })
        }

        setPieces(newPieces)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {pieces.map(piece => (
                <motion.div
                    key={piece.id}
                    initial={{
                        x: `${piece.x}%`,
                        y: -20,
                        rotate: 0,
                        opacity: 1
                    }}
                    animate={{
                        y: window.innerHeight + 20,
                        rotate: 720,
                        opacity: 0
                    }}
                    transition={{
                        duration: piece.duration,
                        delay: piece.delay,
                        ease: 'linear'
                    }}
                    className="absolute w-3 h-3"
                    style={{
                        backgroundColor: piece.color,
                        left: `${piece.x}%`
                    }}
                />
            ))}
        </div>
    )
}