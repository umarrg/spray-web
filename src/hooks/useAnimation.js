import { useState, useCallback } from 'react'



export function useAnimation() {
    const [animations, setAnimations] = useState([])

    const triggerAnimation = useCallback((type, data) => {
        const animation = {
            id: Date.now() + Math.random(),
            type,
            data
        }

        setAnimations(prev => [...prev, animation])

        // Auto-remove animation after duration
        const duration = type === 'confetti' ? 5000 : 4000
        setTimeout(() => {
            setAnimations(prev => prev.filter(a => a.id !== animation.id))
        }, duration)
    }, [])

    const clearAnimations = useCallback(() => {
        setAnimations([])
    }, [])

    return {
        animations,
        triggerAnimation,
        clearAnimations
    }
}