import { useState } from 'react'
import { toast } from 'sonner'


export function usePayment() {
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState < string | null > (null)

    const initializePayment = async (data) => {
        setProcessing(true)
        setError(null)

        try {
            const response = await fetch('/api/payment/initialize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Payment initialization failed')
            }

            const result = await response.json()
            return result
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Payment failed'
            setError(errorMessage)
            toast.error(errorMessage)
            throw err
        } finally {
            setProcessing(false)
        }
    }

    const verifyPayment = async (reference) => {
        try {
            const response = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference })
            })

            if (!response.ok) {
                throw new Error('Payment verification failed')
            }

            const result = await response.json()
            return result.success
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Verification failed'
            setError(errorMessage)
            toast.error(errorMessage)
            return false
        }
    }

    return {
        processing,
        error,
        initializePayment,
        verifyPayment
    }
}