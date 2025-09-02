'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Cake, Baby, Church, ChevronRight, ChevronLeft, Check, Calendar, MapPin, User, Phone, Mail, CreditCard, Building, Sparkles, Diamond, Crown, Star, Gem, Zap, Shield, Globe, DollarSign, Clock } from 'lucide-react'
import { toast } from 'sonner'

// Liquid Glass Input Component
const GlassInput = ({ icon: Icon, label, type = 'text', value, onChange, placeholder, className = '' }) => {
    const [focused, setFocused] = useState(false)

    return (
        <div className="relative group">
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    {Icon && <Icon className="w-4 h-4 mr-2 text-purple-400" />}
                    {label}
                </label>
            )}
            <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl transition-all ${focused ? 'opacity-100' : 'opacity-0'}`} />
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    className={`relative w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 transition-all ${className}`}
                />
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: '0%' }}
                    animate={{ width: focused ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    )
}

// Liquid Glass Select Component
const GlassSelect = ({ icon: Icon, label, value, onChange, options, placeholder }) => {
    const [focused, setFocused] = useState(false)

    return (
        <div className="relative group">
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    {Icon && <Icon className="w-4 h-4 mr-2 text-purple-400" />}
                    {label}
                </label>
            )}
            <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl transition-all ${focused ? 'opacity-100' : 'opacity-0'}`} />
                <select
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="relative w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus:outline-none focus:border-purple-400/50 transition-all appearance-none cursor-pointer"
                >
                    <option value="" className="bg-gray-900">{placeholder}</option>
                    {options.map(option => (
                        <option key={option} value={option} className="bg-gray-900">{option}</option>
                    ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none rotate-90" />
            </div>
        </div>
    )
}

// 3D Event Type Card
const EventTypeCard = ({ type, selected, onClick }) => {
    const Icon = type.icon

    return (
        <motion.button
            whileHover={{ scale: 1.05, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="relative group w-full"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${type.color} rounded-3xl blur-2xl transition-opacity ${selected ? 'opacity-50' : 'opacity-0 group-hover:opacity-30'}`} />

            {/* Card content */}
            <div className={`relative p-8 rounded-3xl border-2 transition-all ${selected
                ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-400/50'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
                } backdrop-blur-xl overflow-hidden`}>

                {/* Liquid animation background */}
                <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                        background: selected ? [
                            'radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
                            'radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                            'radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)'
                        ] : 'none'
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10">
                    <motion.div
                        className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${type.color} p-4 shadow-2xl`}
                        animate={{ rotate: selected ? 360 : 0 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Icon className="w-full h-full text-white" />
                    </motion.div>

                    <h3 className="font-bold text-xl text-white mb-2">{type.name}</h3>
                    <p className="text-sm text-gray-400">{type.description}</p>

                    {selected && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                        >
                            <Check className="w-5 h-5 text-white" />
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.button>
    )
}

// Progress Step with Liquid Connection
const ProgressStep = ({ step, currentStep, isLast }) => {
    const isActive = currentStep >= step.number
    const isCompleted = currentStep > step.number

    return (
        <div className="flex items-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: step.number * 0.1 }}
                className="relative"
            >
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-full blur-xl transition-all ${isActive ? 'bg-purple-500/50' : 'bg-transparent'
                    }`} />

                {/* Step circle */}
                <div className={`relative w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all ${isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-xl border border-white/20 text-gray-400'
                    }`}>
                    {isCompleted ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <Check className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        step.number
                    )}
                </div>

                {/* Step label */}
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm ${isActive ? 'text-purple-400 font-semibold' : 'text-gray-500'
                    }`}>
                    {step.title}
                </div>
            </motion.div>

            {/* Liquid connection line */}
            {!isLast && (
                <div className="relative flex-1 h-1 mx-4">
                    <div className="absolute inset-0 bg-white/10 rounded-full" />
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: isCompleted ? '100%' : '0%' }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />
                </div>
            )}
        </div>
    )
}

export default function EventSetupPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [eventData, setEventData] = useState({
        type: '',
        title: '',
        date: '',
        time: '',
        venue: '',
        organizerName: '',
        organizerPhone: '',
        organizerEmail: '',
        bankName: '',
        bankAccount: '',
        brideBankAccount: '',
        groomBankAccount: '',
        brideBankName: '',
        groomBankName: '',
        paymentMethod: 'all',
        targetAmount: 0,
        description: ''
    })

    const eventTypes = [
        {
            id: 'wedding',
            name: 'Wedding',
            icon: Heart,
            color: 'from-pink-500 to-rose-600',
            description: 'Epic bride vs groom battles'
        },
        {
            id: 'birthday',
            name: 'Birthday',
            icon: Cake,
            color: 'from-blue-500 to-purple-600',
            description: 'Celebrate in style'
        },
        {
            id: 'naming',
            name: 'Naming',
            icon: Baby,
            color: 'from-green-500 to-teal-600',
            description: 'Welcome new life'
        },
        {
            id: 'funeral',
            name: 'Memorial',
            icon: Church,
            color: 'from-gray-600 to-gray-800',
            description: 'Honor with dignity'
        }
    ]

    const banks = ['OPay', 'Moniepoint', 'GTBank', 'First Bank', 'Access Bank', 'UBA', 'Zenith Bank', 'Sterling Bank', 'Kuda Bank', 'PalmPay']

    const steps = [
        { number: 1, title: 'Event Type' },
        { number: 2, title: 'Details' },
        { number: 3, title: 'Organizer' },
        { number: 4, title: 'Payment' }
    ]

    const updateEventData = (field, value) => {
        setEventData(prev => ({ ...prev, [field]: value }))
    }

    const validateStep = (step) => {
        // Validation logic here
        return true
    }

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1)
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData)
            })

            if (!response.ok) throw new Error('Failed to create event')

            const { eventId } = await response.json()
            localStorage.setItem('currentEventId', eventId)
            toast.success('Event created successfully!')
            router.push(`/display/${eventId}`)
        } catch (error) {
            console.error('Error:', error)
            toast.error('Failed to create event')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/30 rounded-full filter blur-3xl animate-float" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/30 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-600/30 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '4s' }} />
            </div>

            {/* Particles */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                        animate={{ y: [null, -window.innerHeight], opacity: [0, 1, 0] }}
                        transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, delay: Math.random() * 10 }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-6">
                        <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-white font-medium">Create Your Liquid Event</span>
                        <Sparkles className="w-5 h-5 text-yellow-400 ml-2" />
                    </div>

                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                        Event Setup Wizard
                    </h1>
                    <p className="text-gray-400 text-lg">Configure your celebration in style</p>
                </motion.div>

                {/* Progress Bar */}
                <div className="mb-16">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <ProgressStep
                                key={step.number}
                                step={step}
                                currentStep={currentStep}
                                isLast={index === steps.length - 1}
                            />
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="relative"
                >
                    <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl">
                        {/* Glass morphism overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-3xl" />

                        <div className="relative z-10">
                            {/* Step 1: Event Type */}
                            {currentStep === 1 && (
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                                        <Diamond className="w-8 h-8 text-purple-400 mr-3" />
                                        Choose Your Event Type
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {eventTypes.map((type) => (
                                            <EventTypeCard
                                                key={type.id}
                                                type={type}
                                                selected={eventData.type === type.id}
                                                onClick={() => updateEventData('type', type.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Event Details */}
                            {currentStep === 2 && (
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                                        <Calendar className="w-8 h-8 text-purple-400 mr-3" />
                                        Event Details
                                    </h2>

                                    <div className="space-y-6">
                                        <GlassInput
                                            icon={Sparkles}
                                            label="Event Title"
                                            value={eventData.title}
                                            onChange={(e) => updateEventData('title', e.target.value)}
                                            placeholder={eventData.type === 'wedding' ? "John & Mary's Wedding" : "Sarah's 30th Birthday"}
                                        />

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <GlassInput
                                                icon={Calendar}
                                                label="Event Date"
                                                type="date"
                                                value={eventData.date}
                                                onChange={(e) => updateEventData('date', e.target.value)}
                                            />

                                            <GlassInput
                                                icon={Clock}
                                                label="Event Time"
                                                type="time"
                                                value={eventData.time}
                                                onChange={(e) => updateEventData('time', e.target.value)}
                                            />
                                        </div>

                                        <GlassInput
                                            icon={MapPin}
                                            label="Venue"
                                            value={eventData.venue}
                                            onChange={(e) => updateEventData('venue', e.target.value)}
                                            placeholder="Eko Convention Center, Victoria Island"
                                        />

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Description (Optional)
                                            </label>
                                            <textarea
                                                value={eventData.description}
                                                onChange={(e) => updateEventData('description', e.target.value)}
                                                placeholder="Add special instructions..."
                                                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 transition-all h-32 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Organizer */}
                            {currentStep === 3 && (
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                                        <User className="w-8 h-8 text-purple-400 mr-3" />
                                        Organizer Information
                                    </h2>

                                    <div className="space-y-6">
                                        <GlassInput
                                            icon={User}
                                            label="Full Name"
                                            value={eventData.organizerName}
                                            onChange={(e) => updateEventData('organizerName', e.target.value)}
                                            placeholder="Enter your full name"
                                        />

                                        <GlassInput
                                            icon={Phone}
                                            label="Phone Number"
                                            type="tel"
                                            value={eventData.organizerPhone}
                                            onChange={(e) => updateEventData('organizerPhone', e.target.value)}
                                            placeholder="08012345678"
                                        />

                                        <GlassInput
                                            icon={Mail}
                                            label="Email Address"
                                            type="email"
                                            value={eventData.organizerEmail}
                                            onChange={(e) => updateEventData('organizerEmail', e.target.value)}
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Payment */}
                            {currentStep === 4 && (
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                                        <CreditCard className="w-8 h-8 text-purple-400 mr-3" />
                                        Payment Configuration
                                    </h2>

                                    {eventData.type === 'wedding' ? (
                                        <div className="space-y-6">
                                            {/* Bride's Account */}
                                            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-pink-600/10 to-rose-600/10 border border-pink-400/20">
                                                <h3 className="text-xl font-semibold text-pink-400 mb-4 flex items-center">
                                                    <Heart className="w-5 h-5 mr-2" />
                                                    Bride's Account
                                                </h3>
                                                <div className="space-y-4">
                                                    <GlassSelect
                                                        icon={Building}
                                                        label="Bank Name"
                                                        value={eventData.brideBankName}
                                                        onChange={(e) => updateEventData('brideBankName', e.target.value)}
                                                        options={banks}
                                                        placeholder="Select Bank"
                                                    />
                                                    <GlassInput
                                                        icon={CreditCard}
                                                        label="Account Number"
                                                        value={eventData.brideBankAccount}
                                                        onChange={(e) => updateEventData('brideBankAccount', e.target.value)}
                                                        placeholder="Enter account number"
                                                    />
                                                </div>
                                            </div>

                                            {/* Groom's Account */}
                                            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-400/20">
                                                <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                                                    <Heart className="w-5 h-5 mr-2" />
                                                    Groom's Account
                                                </h3>
                                                <div className="space-y-4">
                                                    <GlassSelect
                                                        icon={Building}
                                                        label="Bank Name"
                                                        value={eventData.groomBankName}
                                                        onChange={(e) => updateEventData('groomBankName', e.target.value)}
                                                        options={banks}
                                                        placeholder="Select Bank"
                                                    />
                                                    <GlassInput
                                                        icon={CreditCard}
                                                        label="Account Number"
                                                        value={eventData.groomBankAccount}
                                                        onChange={(e) => updateEventData('groomBankAccount', e.target.value)}
                                                        placeholder="Enter account number"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <GlassSelect
                                                icon={Building}
                                                label="Bank Name"
                                                value={eventData.bankName}
                                                onChange={(e) => updateEventData('bankName', e.target.value)}
                                                options={banks}
                                                placeholder="Select Bank"
                                            />

                                            <GlassInput
                                                icon={CreditCard}
                                                label="Account Number"
                                                value={eventData.bankAccount}
                                                onChange={(e) => updateEventData('bankAccount', e.target.value)}
                                                placeholder="Enter account number"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between mt-10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrevious}
                        className={`px-8 py-4 rounded-2xl font-semibold transition-all ${currentStep === 1
                            ? 'invisible'
                            : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20'
                            }`}
                    >
                        <ChevronLeft className="inline w-5 h-5 mr-2" />
                        Previous
                    </motion.button>

                    {currentStep < 4 ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNext}
                            className="relative group px-8 py-4 rounded-2xl font-semibold"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl" />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                            <span className="relative text-white flex items-center">
                                Next Step
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </span>
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="relative group px-8 py-4 rounded-2xl font-semibold"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl" />
                            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                            <span className="relative text-white flex items-center">
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Gem className="w-5 h-5 mr-2" />
                                        Launch Event
                                    </>
                                )}
                            </span>
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    )
}