import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'



const WebSocketContext = createContext(undefined)

export function WebSocketProvider({ children }) {
    const [isConnected, setIsConnected] = useState(false)
    const [listeners, setListeners] = useState(new Map())

    useEffect(() => {
        // Simulate connection for demo
        // In production, connect to real WebSocket server
        setTimeout(() => setIsConnected(true), 1000)

        // Simulate incoming donations for demo
        const interval = setInterval(() => {
            const event = 'donation'
            const callbacks = listeners.get(event)
            if (callbacks) {
                const demoData = {
                    id: Date.now().toString(),
                    name: ['John Doe', 'Jane Smith', 'Mike Johnson'][Math.floor(Math.random() * 3)],
                    amount: Math.floor(Math.random() * 50000) + 1000,
                    message: Math.random() > 0.5 ? 'Congratulations!' : '',
                    timestamp: new Date().toISOString()
                }
                callbacks.forEach(cb => cb(demoData))
            }
        }, 10000) // Every 10 seconds for demo

        return () => clearInterval(interval)
    }, [listeners])

    const subscribe = useCallback((event, callback) => {
        setListeners(prev => {
            const newListeners = new Map(prev)
            if (!newListeners.has(event)) {
                newListeners.set(event, new Set())
            }
            newListeners.get(event).add(callback)
            return newListeners
        })

        // Return unsubscribe function
        return () => {
            setListeners(prev => {
                const newListeners = new Map(prev)
                newListeners.get(event)?.delete(callback)
                return newListeners
            })
        }
    }, [])

    const emit = useCallback((event, data) => {
        // In production, send to WebSocket server
        console.log('Emitting:', event, data)
    }, [])

    return (
        <WebSocketContext.Provider value={{ isConnected, subscribe, emit }}>
            {children}
        </WebSocketContext.Provider>
    )
}

export const useWebSocket = () => {
    const context = useContext(WebSocketContext)
    if (!context) throw new Error('useWebSocket must be used within WebSocketProvider')
    return context
}