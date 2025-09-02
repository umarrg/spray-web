import { createContext, useContext, useState, ReactNode } from 'react'


const EventContext = createContext(undefined)

export function EventProvider({ children }) {
    const [event, setEvent] = useState(null)
    const [donations, setDonations] = useState([])

    const addDonation = (donation) => {
        setDonations(prev => [donation, ...prev])
    }

    return (
        <EventContext.Provider value={{ event, setEvent, donations, setDonations, addDonation }}>
            {children}
        </EventContext.Provider>
    )
}

export const useEvent = () => {
    const context = useContext(EventContext)
    if (!context) throw new Error('useEvent must be used within EventProvider')
    return context
}
