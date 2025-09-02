'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Heart, DollarSign, User, MessageSquare, ArrowRight, Check, AlertCircle, Copy, CreditCard, Building, Info, Sparkles, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { toast } from 'sonner'
import { formatCurrency } from '@/lib/utils/format'

export default function PaymentPage() {
    const params = useParams()
    const router = useRouter()
    const eventId = params.eventId

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [copiedAccount, setCopiedAccount] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        message: '',
        recipient: '',
        email: '',
        phone: ''
    })

    const quickAmounts = [1000, 5000, 10000, 20000, 50000, 100000]

    // Fetch event details
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/events/${eventId}`)
                if (!response.ok) throw new Error('Event not found')
                const data = await response.json()
                setEvent(data.event)
            } catch (error) {
                console.error('Error fetching event:', error)
                toast.error('Event not found')
                router.push('/')
            } finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [eventId, router])

    const updateForm = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('Please enter your name')
            return false
        }

        if (!formData.amount || parseFloat(formData.amount) < 100) {
            toast.error('Minimum amount is ₦100')
            return false
        }

        if (event?.type === 'wedding' && !formData.recipient) {
            toast.error('Please select who to spray for')
            return false
        }

        return true
    }

    const handlePayment = async () => {
        if (!validateForm()) return

        setProcessing(true)

        try {
            const response = await fetch('/api/payment/initialize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventId,
                    name: formData.name,
                    amount: parseFloat(formData.amount),
                    message: formData.message,
                    recipient: formData.recipient,
                    email: formData.email,
                    phone: formData.phone
                })
            })

            if (!response.ok) throw new Error('Payment initialization failed')

            const { paymentUrl, reference } = await response.json()

            if (paymentUrl) {
                window.location.href = paymentUrl
            } else {
                setTimeout(() => {
                    handlePaymentSuccess(reference)
                }, 2000)
            }
        } catch (error) {
            console.error('Payment error:', error)
            toast.error('Payment failed. Please try again.')
            setProcessing(false)
        }
    }

    const handlePaymentSuccess = async (reference) => {
        try {
            const response = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference })
            })

            if (!response.ok) throw new Error('Payment verification failed')

            setPaymentSuccess(true)
            toast.success('Payment successful! Thank you for your contribution!')

            setTimeout(() => {
                setFormData({
                    name: '',
                    amount: '',
                    message: '',
                    recipient: '',
                    email: '',
                    phone: ''
                })
                setPaymentSuccess(false)
                setProcessing(false)
            }, 5000)
        } catch (error) {
            console.error('Verification error:', error)
            toast.error('Payment verification failed')
            setProcessing(false)
        }
    }

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text)
        setCopiedAccount(type)
        toast.success('Account number copied!')
        setTimeout(() => setCopiedAccount(''), 2000)
    }

    const getEventTheme = () => {
        const themes = {
            wedding: 'from-pink-500 to-rose-600',
            birthday: 'from-blue-500 to-purple-600',
            naming: 'from-green-500 to-teal-600',
            funeral: 'from-gray-600 to-gray-800'
        }
        return themes[event?.type] || themes.birthday
    }

    const getEventIcon = () => {
        const icons = {
            wedding: '💑',
            birthday: '🎂',
            naming: '👶',
            funeral: '🕊️'
        }
        return icons[event?.type] || '🎉'
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
                <div className="text-center">
                    <div className="spinner w-12 h-12 mx-auto mb-4" />
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
                    <p className="text-gray-600 mb-4">This event may have ended or does not exist.</p>
                    <Button onClick={() => router.push('/')}>Go Home</Button>
                </div>
            </div>
        )
    }

    const theme = getEventTheme()

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
            {/* Floating decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-6xl opacity-10"
                        initial={{ x: Math.random() * window.innerWidth, y: -100 }}
                        animate={{
                            y: window.innerHeight + 100,
                            rotate: 360
                        }}
                        transition={{
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    >
                        {getEventIcon()}
                    </motion.div>
                ))}
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Event Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${theme} mb-4 shadow-lg`}>
                        <Gift className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.title}</h1>
                    <div className="flex items-center justify-center space-x-4 text-gray-600">
                        <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.venue}
                        </span>
                    </div>
                    <p className="text-lg text-gray-700 mt-2">Digital Money Spraying</p>
                </motion.div>

                {/* Bank Account Information Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                        <div className="flex items-center mb-4">
                            <Building className="w-5 h-5 mr-2 text-purple-600" />
                            <h3 className="text-lg font-semibold text-gray-800">Bank Transfer Details</h3>
                            <Info className="w-4 h-4 ml-2 text-gray-500" />
                        </div>

                        {event.type === 'wedding' ? (
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Bride's Account */}
                                <div className="bg-white p-4 rounded-lg border border-pink-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-pink-600">👰 Bride's Account</span>
                                        <button
                                            onClick={() => copyToClipboard(event.brideBankAccount, 'bride')}
                                            className="text-pink-600 hover:text-pink-700"
                                        >
                                            {copiedAccount === 'bride' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-1">{event.brideBankName}</p>
                                    <p className="text-lg font-mono font-bold text-gray-800">{event.brideBankAccount}</p>
                                    <p className="text-xs text-gray-500 mt-1">Tap to copy</p>
                                </div>

                                {/* Groom's Account */}
                                <div className="bg-white p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-blue-600">🤵 Groom's Account</span>
                                        <button
                                            onClick={() => copyToClipboard(event.groomBankAccount, 'groom')}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            {copiedAccount === 'groom' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-1">{event.groomBankName}</p>
                                    <p className="text-lg font-mono font-bold text-gray-800">{event.groomBankAccount}</p>
                                    <p className="text-xs text-gray-500 mt-1">Tap to copy</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-purple-600">
                                        <CreditCard className="inline w-4 h-4 mr-1" />
                                        Account Details
                                    </span>
                                    <button
                                        onClick={() => copyToClipboard(event.bankAccount, 'main')}
                                        className="text-purple-600 hover:text-purple-700"
                                    >
                                        {copiedAccount === 'main' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{event.bankName}</p>
                                <p className="text-xl font-mono font-bold text-gray-800">{event.bankAccount}</p>
                                <p className="text-sm text-gray-700 mt-2">{event.organizerName}</p>
                                <p className="text-xs text-gray-500 mt-1">Tap to copy account number</p>
                            </div>
                        )}

                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-xs text-yellow-800 flex items-start">
                                <Sparkles className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                                After transfer, fill the form below to display your spray on the big screen!
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Payment Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="p-6">
                        {paymentSuccess ? (
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="text-center py-8"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 0.5 }}
                                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <Check className="w-10 h-10 text-green-600" />
                                </motion.div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                                <p className="text-gray-600 mb-4">
                                    Thank you for spraying {formatCurrency(parseFloat(formData.amount))}
                                </p>
                                <p className="text-sm text-gray-500">Your contribution will appear on the screen shortly</p>
                                <div className="mt-4">
                                    <Sparkles className="w-8 h-8 text-yellow-500 mx-auto animate-pulse" />
                                </div>
                            </motion.div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Record Your Spray</h3>

                                {/* Name Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <User className="inline w-4 h-4 mr-1" />
                                        Your Name *
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => updateForm('name', e.target.value)}
                                        placeholder="Enter your name"
                                        disabled={processing}
                                    />
                                </div>

                                {/* Recipient Selection (Wedding Only) */}
                                {event.type === 'wedding' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Heart className="inline w-4 h-4 mr-1" />
                                            Who are you spraying for? *
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => updateForm('recipient', 'bride')}
                                                disabled={processing}
                                                className={`p-4 rounded-lg border-2 transition-all ${formData.recipient === 'bride'
                                                    ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md'
                                                    : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/50'
                                                    }`}
                                            >
                                                <span className="text-2xl">👰</span>
                                                <p className="mt-1 font-medium">Bride</p>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => updateForm('recipient', 'groom')}
                                                disabled={processing}
                                                className={`p-4 rounded-lg border-2 transition-all ${formData.recipient === 'groom'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                                                    }`}
                                            >
                                                <span className="text-2xl">🤵</span>
                                                <p className="mt-1 font-medium">Groom</p>
                                            </motion.button>
                                        </div>
                                    </div>
                                )}

                                {/* Amount Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <DollarSign className="inline w-4 h-4 mr-1" />
                                        Amount (₦) *
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => updateForm('amount', e.target.value)}
                                        placeholder="0"
                                        disabled={processing}
                                        className="text-2xl font-bold"
                                    />

                                    {/* Quick Amount Buttons */}
                                    <div className="grid grid-cols-3 gap-2 mt-3">
                                        {quickAmounts.map(amount => (
                                            <motion.button
                                                key={amount}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => updateForm('amount', amount.toString())}
                                                disabled={processing}
                                                className="py-2 px-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 border border-purple-200"
                                            >
                                                ₦{amount.toLocaleString()}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <MessageSquare className="inline w-4 h-4 mr-1" />
                                        Celebration Message (Optional)
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => updateForm('message', e.target.value)}
                                        placeholder="Share your wishes..."
                                        disabled={processing}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50"
                                        rows={3}
                                    />
                                </div>

                                {/* Contact Info (Optional) */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email (Optional)
                                        </label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => updateForm('email', e.target.value)}
                                            placeholder="your@email.com"
                                            disabled={processing}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone (Optional)
                                        </label>
                                        <Input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => updateForm('phone', e.target.value)}
                                            placeholder="08012345678"
                                            disabled={processing}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    onClick={handlePayment}
                                    disabled={processing}
                                    className={`w-full bg-gradient-to-r ${theme} text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all`}
                                >
                                    {processing ? (
                                        <>
                                            <div className="spinner w-5 h-5 mr-2" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Gift className="w-5 h-5 mr-2" />
                                            Display My Spray
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </Button>

                                {/* Security Note */}
                                <p className="text-xs text-center text-gray-500 mt-4">
                                    🔒 Your information is secure and will only be displayed on the event screen
                                </p>
                            </div>
                        )}
                    </Card>
                </motion.div>

                {/* View Live Display Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-6"
                >
                    <a
                        href={`/display/${eventId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        View Live Display
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                </motion.div>
            </div>
        </div>
    )
}