'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import {
    Volume2, VolumeX, QrCode, Gift, Zap, Trophy, Heart, Users,
    Sparkles, Crown, Star, Clock, Settings, TrendingUp, PartyPopper,
    DollarSign, MapPin, Calendar, Maximize2, Minimize2, Activity,
    RefreshCw, Eye, EyeOff, Copy, Check, CreditCard, Building,
    Diamond, Gem, Shield, Coins, ArrowUp, ArrowDown, Info, Medal
} from 'lucide-react'
import { EventProvider } from '@/contexts/EventContext'
import { AudioProvider, useAudio } from '@/contexts/AudioContext'
import { WebSocketProvider, useWebSocket } from '@/contexts/WebSocketContext'
import { formatCurrency } from '@/lib/format'

// Liquid Blob Component
const LiquidBlob = ({ color, size, position, delay = 0 }) => {
    return (
        <motion.div
            className={`absolute ${size} rounded-full filter blur-3xl`}
            style={{
                background: color,
                ...position,
                opacity: 0.3
            }}
            animate={{
                x: [0, 50, -50, 0],
                y: [0, -50, 50, 0],
                scale: [1, 1.3, 0.8, 1],
            }}
            transition={{
                duration: 15,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    )
}

// Glass Card Component
const GlassCard = ({ children, className = "", glow = false }) => {
    return (
        <div className={`relative ${className}`}>
            {glow && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-2xl" />
            )}
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0" />
                {children}
            </div>
        </div>
    )
}

// Enhanced Donation Card with Liquid Effects
const LiquidDonationCard = ({ donation, index, eventType }) => {
    const getAmountTier = (amount) => {
        if (amount >= 100000) return {
            tier: 'legendary',
            gradient: 'from-yellow-400 via-orange-400 to-red-400',
            icon: <Crown className="w-6 h-6 text-yellow-400" />,
            animation: true
        }
        if (amount >= 50000) return {
            tier: 'epic',
            gradient: 'from-purple-400 via-pink-400 to-rose-400',
            icon: <Diamond className="w-5 h-5 text-purple-400" />,
            animation: true
        }
        if (amount >= 20000) return {
            tier: 'rare',
            gradient: 'from-blue-400 via-cyan-400 to-teal-400',
            icon: <Star className="w-4 h-4 text-blue-400" />,
            animation: false
        }
        return {
            tier: 'common',
            gradient: 'from-gray-400 to-gray-500',
            icon: null,
            animation: false
        }
    }

    const { tier, gradient, icon, animation } = getAmountTier(donation.amount)

    return (
        <motion.div
            initial={{ x: 300, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -300, opacity: 0, scale: 0.8 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                delay: index * 0.05
            }}
            className="relative group"
        >
            {/* Glow effect for high-tier donations */}
            {animation && (
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-30`}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            <div className={`
        relative p-5 rounded-2xl backdrop-blur-xl transition-all duration-300 
        ${tier === 'legendary' ? 'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20' :
                    tier === 'epic' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' :
                        tier === 'rare' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20' :
                            'bg-white/10'}
        border ${tier === 'legendary' ? 'border-yellow-400/50' :
                    tier === 'epic' ? 'border-purple-400/50' :
                        tier === 'rare' ? 'border-blue-400/50' :
                            'border-white/20'}
        hover:scale-[1.02] hover:border-white/40
      `}>

                {/* Tier Icon */}
                {icon && (
                    <motion.div
                        className="absolute -top-2 -right-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        {icon}
                    </motion.div>
                )}

                {/* Content */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <motion.div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-0.5`}
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-full h-full rounded-2xl bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                                {donation.name.substring(0, 2).toUpperCase()}
                            </div>
                        </motion.div>

                        <div>
                            <h3 className="font-bold text-lg text-white">
                                {donation.name}
                            </h3>
                            <p className="text-sm text-gray-300">
                                {new Date(donation.timestamp || Date.now()).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <motion.div
                            className={`font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: index * 0.05 + 0.2 }}
                        >
                            {formatCurrency(donation.amount)}
                        </motion.div>

                        {donation.message && (
                            <p className="text-sm mt-2 text-gray-300 italic max-w-xs">
                                "{donation.message}"
                            </p>
                        )}
                    </div>
                </div>

                {/* Wedding Recipient Badge */}
                {donation.recipient && eventType === 'wedding' && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xl
              ${donation.recipient === 'bride'
                                ? 'bg-pink-500/30 text-pink-300 border border-pink-400/50'
                                : 'bg-blue-500/30 text-blue-300 border border-blue-400/50'}`}
                    >
                        {donation.recipient === 'bride' ? '👰 Team Bride' : '🤵 Team Groom'}
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

// Account Display Component
const AccountDisplay = ({ event, onCopy }) => {
    const [copiedAccount, setCopiedAccount] = useState('')

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text)
        setCopiedAccount(type)
        setTimeout(() => setCopiedAccount(''), 2000)
    }

    if (!event) return null

    return (
        <GlassCard glow>
            <div className="relative">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
                    Bank Transfer Details
                </h3>

                {event.type === 'wedding' ? (
                    <div className="space-y-4">
                        {/* Bride Account */}
                        <motion.div
                            className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-400/30"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-pink-300">👰 Bride's Account</span>
                                <button
                                    onClick={() => handleCopy(event.brideBankAccount, 'bride')}
                                    className="text-pink-300 hover:text-pink-200 transition-colors"
                                >
                                    {copiedAccount === 'bride' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mb-1">{event.brideBankName}</p>
                            <p className="text-lg font-mono font-bold text-white">{event.brideBankAccount}</p>
                        </motion.div>

                        {/* Groom Account */}
                        <motion.div
                            className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-400/30"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-300">🤵 Groom's Account</span>
                                <button
                                    onClick={() => handleCopy(event.groomBankAccount, 'groom')}
                                    className="text-blue-300 hover:text-blue-200 transition-colors"
                                >
                                    {copiedAccount === 'groom' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mb-1">{event.groomBankName}</p>
                            <p className="text-lg font-mono font-bold text-white">{event.groomBankAccount}</p>
                        </motion.div>
                    </div>
                ) : (
                    <motion.div
                        className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-purple-300">
                                <Building className="inline w-4 h-4 mr-1" />
                                Account Details
                            </span>
                            <button
                                onClick={() => handleCopy(event.bankAccount, 'main')}
                                className="text-purple-300 hover:text-purple-200 transition-colors"
                            >
                                {copiedAccount === 'main' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">{event.bankName}</p>
                        <p className="text-xl font-mono font-bold text-white">{event.bankAccount}</p>
                        <p className="text-sm text-gray-300 mt-2">{event.organizerName}</p>
                    </motion.div>
                )}

                <div className="mt-4 p-3 bg-yellow-500/10 rounded-xl border border-yellow-400/30">
                    <p className="text-xs text-yellow-300 flex items-start">
                        <Info className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                        Transfer to the account above and fill the form to display your spray!
                    </p>
                </div>
            </div>
        </GlassCard>
    )
}

// Enhanced Wedding Battle Component
const LiquidWeddingBattle = ({ brideTotal, groomTotal, donations }) => {
    const total = brideTotal + groomTotal
    const bridePercentage = total > 0 ? (brideTotal / total) * 100 : 50
    const groomPercentage = total > 0 ? (groomTotal / total) * 100 : 50

    const brideDonors = donations.filter(d => d.recipient === 'bride').length
    const groomDonors = donations.filter(d => d.recipient === 'groom').length

    return (
        <GlassCard glow>
            <div className="relative">
                <h2 className="text-2xl font-bold text-center mb-6 text-white flex items-center justify-center">
                    <Heart className="w-6 h-6 mr-2 text-red-400 animate-pulse" />
                    Battle of Love
                    <Heart className="w-6 h-6 ml-2 text-red-400 animate-pulse" />
                </h2>

                {/* Team Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative p-4 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-400/30 text-center"
                    >
                        <motion.div
                            animate={{ rotate: bridePercentage > groomPercentage ? [0, 360] : 0 }}
                            transition={{ duration: 1 }}
                        >
                            <p className="text-3xl mb-2">👰</p>
                        </motion.div>
                        <p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                            {formatCurrency(brideTotal)}
                        </p>
                        <p className="text-sm text-pink-300 mt-1">Team Bride</p>
                        <div className="flex items-center justify-center mt-2 text-xs text-gray-400">
                            <Users className="w-3 h-3 mr-1" />
                            {brideDonors} supporters
                        </div>
                        {bridePercentage > groomPercentage && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2"
                            >
                                <Crown className="w-6 h-6 text-yellow-400" />
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 text-center"
                    >
                        <motion.div
                            animate={{ rotate: groomPercentage > bridePercentage ? [0, 360] : 0 }}
                            transition={{ duration: 1 }}
                        >
                            <p className="text-3xl mb-2">🤵</p>
                        </motion.div>
                        <p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                            {formatCurrency(groomTotal)}
                        </p>
                        <p className="text-sm text-blue-300 mt-1">Team Groom</p>
                        <div className="flex items-center justify-center mt-2 text-xs text-gray-400">
                            <Users className="w-3 h-3 mr-1" />
                            {groomDonors} supporters
                        </div>
                        {groomPercentage > bridePercentage && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2"
                            >
                                <Crown className="w-6 h-6 text-yellow-400" />
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Liquid Battle Bar */}
                <div className="relative h-10 bg-black/30 rounded-full overflow-hidden backdrop-blur-xl border border-white/10">
                    <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-400 to-rose-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${bridePercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.div
                            className="absolute inset-0 opacity-50"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{
                                backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                backgroundSize: '200% 100%'
                            }}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute right-0 top-0 h-full bg-gradient-to-l from-blue-400 to-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${groomPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.div
                            className="absolute inset-0 opacity-50"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{
                                backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                backgroundSize: '200% 100%'
                            }}
                        />
                    </motion.div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/60 backdrop-blur-xl px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                            {bridePercentage.toFixed(0)}% - {groomPercentage.toFixed(0)}%
                        </div>
                    </div>
                </div>

                {/* Winner Status */}
                <motion.div
                    className="mt-4 text-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <p className="text-sm text-gray-300">
                        {bridePercentage > groomPercentage
                            ? "👰 Bride's team is dominating!"
                            : groomPercentage > bridePercentage
                                ? "🤵 Groom's team is crushing it!"
                                : "⚔️ It's an epic tie!"}
                    </p>
                </motion.div>
            </div>
        </GlassCard>
    )
}

// Main Display Component
export default function DisplayContent() {
    const params = useParams()
    const eventId = params.eventId
    const containerRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const [event, setEvent] = useState(null)
    const [donations, setDonations] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [brideTotal, setBrideTotal] = useState(0)
    const [groomTotal, setGroomTotal] = useState(0)
    const [showQR, setShowQR] = useState(true)
    const [showLeaderboard, setShowLeaderboard] = useState(true)
    const [showSettings, setShowSettings] = useState(false)
    const [celebrationActive, setCelebrationActive] = useState(false)
    const [moneyAnimations, setMoneyAnimations] = useState([])
    const [fullscreen, setFullscreen] = useState(false)
    const [autoRefresh, setAutoRefresh] = useState(true)

    const { audioEnabled, toggleAudio, playSound, speak } = useAudio()
    const { isConnected, subscribe } = useWebSocket(eventId)

    // Mouse tracking for interactive effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Fetch event data
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/events/${eventId}`)
                if (!response.ok) throw new Error('Failed to fetch event')
                const data = await response.json()
                setEvent(data.event)
                setDonations(data.donations || [])
                calculateTotals(data.donations || [])
            } catch (error) {
                console.error('Error fetching event:', error)
            }
        }

        fetchEvent()
        if (autoRefresh) {
            const interval = setInterval(fetchEvent, 30000)
            return () => clearInterval(interval)
        }
    }, [eventId, autoRefresh])

    // Calculate totals
    const calculateTotals = useCallback((donationsList) => {
        const total = donationsList.reduce((sum, d) => sum + d.amount, 0)
        setTotalAmount(total)

        if (event?.type === 'wedding') {
            const brideSum = donationsList
                .filter(d => d.recipient === 'bride')
                .reduce((sum, d) => sum + d.amount, 0)
            const groomSum = donationsList
                .filter(d => d.recipient === 'groom')
                .reduce((sum, d) => sum + d.amount, 0)

            setBrideTotal(brideSum)
            setGroomTotal(groomSum)
        }
    }, [event])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen()
            setFullscreen(true)
        } else {
            document.exitFullscreen()
            setFullscreen(false)
        }
    }

    // Loading state
    if (!event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 mx-auto mb-4 border-4 border-purple-600 border-t-transparent rounded-full"
                    />
                    <p className="text-white text-xl">Loading magical experience...</p>
                </div>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
            {/* Interactive Background Gradient */}
            <div
                className="fixed inset-0 opacity-30 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`
                }}
            />

            {/* Liquid Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <LiquidBlob
                    color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    size="w-96 h-96"
                    position={{ top: '-10%', left: '-5%' }}
                    delay={0}
                />
                <LiquidBlob
                    color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                    size="w-80 h-80"
                    position={{ top: '60%', right: '-5%' }}
                    delay={3}
                />
                <LiquidBlob
                    color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                    size="w-72 h-72"
                    position={{ bottom: '-10%', left: '40%' }}
                    delay={6}
                />
            </div>

            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight
                        }}
                        animate={{
                            y: [null, -window.innerHeight],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 15 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 10
                        }}
                    />
                ))}
            </div>

            {/* Premium Glass Header */}
            <header className="relative z-20">
                <div className="bg-black/20 backdrop-blur-2xl border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
                                >
                                    {event.title}
                                </motion.h1>
                                <div className="flex items-center space-x-4 mt-1 text-gray-300">
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1 text-purple-400" />
                                        {new Date(event.date).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1 text-pink-400" />
                                        {event.venue}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                {/* Live Status */}
                                <div className={`flex items-center px-4 py-2 rounded-full backdrop-blur-xl ${isConnected
                                    ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                    : 'bg-red-500/20 text-red-300 border border-red-400/30'
                                    }`}>
                                    <Activity className={`w-4 h-4 mr-1.5 ${isConnected ? 'animate-pulse' : ''}`} />
                                    {isConnected ? 'LIVE' : 'Offline'}
                                </div>

                                {/* Controls */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleAudio}
                                    className={`p-3 rounded-xl backdrop-blur-xl transition-all ${audioEnabled
                                        ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                                        : 'bg-white/10 text-gray-400 border border-white/20'
                                        }`}
                                >
                                    {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleFullscreen}
                                    className="p-3 rounded-xl bg-white/10 backdrop-blur-xl text-white border border-white/20"
                                >
                                    {fullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Total Counter with Liquid Effect */}
            <div className="relative py-12">
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="inline-block"
                    >
                        <p className="text-gray-300 text-lg mb-3">Total Amount Sprayed</p>
                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-50"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <div className="relative text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                                {formatCurrency(totalAmount)}
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-4 space-x-2">
                            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                            <p className="text-gray-300">{donations.length} contributions</p>
                            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-8">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column - QR, Account Details & Wedding Battle */}
                    <div className={`${showQR || event.type === 'wedding' ? 'col-span-3' : 'hidden'} space-y-6`}>
                        {/* QR Code Display */}
                        {showQR && (
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <GlassCard glow>
                                    <h3 className="text-lg font-bold text-white mb-4 text-center">
                                        Scan to Spray
                                    </h3>
                                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl">
                                        <div className="bg-white/90 p-4 rounded-lg">
                                            <QrCode className="w-32 h-32 mx-auto text-gray-800" />
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-400 mt-3">Quick Payment Access</p>
                                </GlassCard>
                            </motion.div>
                        )}

                        {/* Account Details - Always Visible */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <AccountDisplay event={event} />
                        </motion.div>

                        {/* Wedding Battle - Only for Wedding Events */}
                        {event.type === 'wedding' && (
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <LiquidWeddingBattle
                                    brideTotal={brideTotal}
                                    groomTotal={groomTotal}
                                    donations={donations}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Center - Donation Feed */}
                    <div className={`${showQR || event.type === 'wedding'
                        ? showLeaderboard ? 'col-span-6' : 'col-span-9'
                        : showLeaderboard ? 'col-span-8' : 'col-span-12'
                        }`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <GlassCard>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white flex items-center">
                                        <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                                        Live Money Spray Feed
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-sm text-gray-400">Real-time</span>
                                    </div>
                                </div>

                                <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                                    <AnimatePresence>
                                        {donations.length === 0 ? (
                                            <div className="text-center py-20">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                        rotate: [0, 5, -5, 0]
                                                    }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                >
                                                    <Gift className="w-20 h-20 mx-auto text-purple-400/50 mb-4" />
                                                </motion.div>
                                                <p className="text-gray-400 text-lg">Waiting for the first spray...</p>
                                                <p className="text-gray-500 text-sm mt-2">The celebration begins with you!</p>
                                            </div>
                                        ) : (
                                            donations.slice(0, 20).map((donation, index) => (
                                                <LiquidDonationCard
                                                    key={donation.id}
                                                    donation={donation}
                                                    index={index}
                                                    eventType={event.type}
                                                />
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Right Column - Leaderboard */}
                    {showLeaderboard && (
                        <div className={`${showQR || event.type === 'wedding' ? 'col-span-3' : 'col-span-4'}`}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <GlassCard>
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                        <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                                        Top Sprayers
                                    </h2>

                                    <div className="space-y-3">
                                        {(() => {
                                            const topDonors = donations
                                                .reduce((acc, donation) => {
                                                    const existing = acc.find(d => d.name === donation.name)
                                                    if (existing) {
                                                        existing.amount += donation.amount
                                                        existing.count += 1
                                                    } else {
                                                        acc.push({ name: donation.name, amount: donation.amount, count: 1 })
                                                    }
                                                    return acc
                                                }, [])
                                                .sort((a, b) => b.amount - a.amount)
                                                .slice(0, 7)

                                            return topDonors.length === 0 ? (
                                                <p className="text-center text-gray-400 py-8">No sprayers yet</p>
                                            ) : (
                                                topDonors.map((donor, index) => (
                                                    <motion.div
                                                        key={donor.name}
                                                        initial={{ x: 50, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        whileHover={{ scale: 1.02 }}
                                                        className={`
                              relative p-3 rounded-xl backdrop-blur-xl flex items-center justify-between
                              ${index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30' :
                                                                index === 1 ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30' :
                                                                    index === 2 ? 'bg-gradient-to-r from-orange-400/20 to-red-400/20 border border-orange-400/30' :
                                                                        'bg-white/5 border border-white/10'}
                            `}
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                                ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                                                                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                                                                        index === 2 ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' :
                                                                            'bg-white/20 text-white'}
                              `}>
                                                                {index + 1}
                                                            </div>
                                                            {index === 0 && <Crown className="w-5 h-5 text-yellow-400" />}
                                                            {index === 1 && <Medal className="w-4 h-4 text-gray-400" />}
                                                            {index === 2 && <Star className="w-4 h-4 text-orange-400" />}
                                                            <div>
                                                                <p className="font-semibold text-white">{donor.name}</p>
                                                                <p className="text-xs text-gray-400">
                                                                    {donor.count} spray{donor.count > 1 ? 's' : ''}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                                            {formatCurrency(donor.amount)}
                                                        </p>
                                                    </motion.div>
                                                ))
                                            )
                                        })()}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-8 right-8 flex flex-col space-y-3">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowQR(!showQR)}
                    className={`p-4 rounded-full backdrop-blur-xl transition-all shadow-lg ${showQR
                        ? 'bg-purple-500/30 text-purple-300 border border-purple-400/30'
                        : 'bg-white/10 text-gray-400 border border-white/20'
                        }`}
                    title="Toggle QR & Account"
                >
                    <CreditCard className="w-6 h-6" />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLeaderboard(!showLeaderboard)}
                    className={`p-4 rounded-full backdrop-blur-xl transition-all shadow-lg ${showLeaderboard
                        ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-400/30'
                        : 'bg-white/10 text-gray-400 border border-white/20'
                        }`}
                    title="Toggle Leaderboard"
                >
                    <Trophy className="w-6 h-6" />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-4 rounded-full bg-white/10 backdrop-blur-xl text-gray-400 border border-white/20 shadow-lg"
                    title="Settings"
                >
                    <Settings className="w-6 h-6" />
                </motion.button>
            </div>

            {/* Settings Modal */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
                        onClick={() => setShowSettings(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-md w-full mx-4"
                            onClick={e => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                Display Settings
                            </h2>

                            <div className="space-y-5">
                                {/* Settings toggles */}
                                {[
                                    { label: 'Audio Announcements', icon: Volume2, state: audioEnabled, toggle: toggleAudio },
                                    { label: 'Show QR & Account', icon: QrCode, state: showQR, toggle: () => setShowQR(!showQR) },
                                    { label: 'Show Leaderboard', icon: Trophy, state: showLeaderboard, toggle: () => setShowLeaderboard(!showLeaderboard) },
                                    { label: 'Auto Refresh', icon: RefreshCw, state: autoRefresh, toggle: () => setAutoRefresh(!autoRefresh) }
                                ].map((setting, index) => (
                                    <motion.label
                                        key={index}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                    >
                                        <span className="text-gray-300 font-medium flex items-center">
                                            <setting.icon className="w-5 h-5 mr-3 text-purple-400" />
                                            {setting.label}
                                        </span>
                                        <button
                                            onClick={setting.toggle}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${setting.state ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-600'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${setting.state ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </motion.label>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowSettings(false)}
                                className="mt-8 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow-lg"
                            >
                                Close Settings
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #ec4899);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a855f7, #f472b6);
        }
      `}</style>
        </div>
    )
}