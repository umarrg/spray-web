import { createContext, useContext, useState, ReactNode, useCallback } from 'react'



const AudioContext = createContext(undefined)

export function AudioProvider({ children }) {
    const [audioEnabled, setAudioEnabled] = useState(true)

    const toggleAudio = () => setAudioEnabled(prev => !prev)

    const playSound = useCallback((sound) => {
        if (!audioEnabled) return

        const sounds = {
            'money-drop': 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF',
            'celebration': 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF',
        }

        if (sounds[sound]) {
            const audio = new Audio(sounds[sound])
            audio.play().catch(() => { })
        }
    }, [audioEnabled])

    const speak = useCallback((text) => {
        if (!audioEnabled || !('speechSynthesis' in window)) return

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.9
        utterance.pitch = 1.1
        window.speechSynthesis.speak(utterance)
    }, [audioEnabled])

    return (
        <AudioContext.Provider value={{ audioEnabled, toggleAudio, playSound, speak }}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => {
    const context = useContext(AudioContext)
    if (!context) throw new Error('useAudio must be used within AudioProvider')
    return context
}