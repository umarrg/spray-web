'use client'

import { ReactNode } from 'react'
import { EventProvider } from '@/contexts/EventContext'
import { AudioProvider } from '@/contexts/AudioContext'
import { WebSocketProvider } from '@/contexts/WebSocketContext'

export function Providers({ children }) {
    return (
        <EventProvider>
            <AudioProvider>
                <WebSocketProvider>
                    {children}
                </WebSocketProvider>
            </AudioProvider>
        </EventProvider>
    )
}
