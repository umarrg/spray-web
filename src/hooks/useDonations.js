import { useState, useCallback, useEffect } from 'react'

export function useDonations(eventId) {
    const [donations, setDonations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchDonations = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/events/${eventId}/donations`)
            if (!response.ok) throw new Error('Failed to fetch donations')
            const data = await response.json()
            setDonations(data.donations || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }, [eventId])

    const addDonation = useCallback((donation) => {
        setDonations(prev => [donation, ...prev])
    }, [])

    useEffect(() => {
        fetchDonations()
    }, [fetchDonations])

    return {
        donations,
        loading,
        error,
        refetch: fetchDonations,
        addDonation
    }
}