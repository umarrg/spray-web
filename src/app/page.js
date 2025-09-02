'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Sparkles, Gift, Heart, Calendar, Users, TrendingUp, ArrowRight, Play, Zap, Star, Crown, Diamond, Gem, Activity, Globe, Shield, Coins, PartyPopper } from 'lucide-react'
import Link from 'next/link'

// Liquid Blob Component
const LiquidBlob = ({ color, size, position, delay = 0 }) => {
  return (
    <motion.div
      className={`absolute ${size} rounded-full filter blur-3xl opacity-70`}
      style={{
        background: color,
        ...position
      }}
      animate={{
        x: [0, 30, -30, 0],
        y: [0, -30, 30, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Floating Glass Card Component
const GlassCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-2xl" />
      <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        {children}
      </div>
    </motion.div>
  )
}

// 3D Rotating Icon Component
const Icon3D = ({ Icon, size = 60, color }) => {
  return (
    <motion.div
      className="relative"
      whileHover={{
        rotateY: 180,
        scale: 1.1
      }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`w-${size / 4} h-${size / 4} rounded-2xl bg-gradient-to-br ${color} p-4 shadow-2xl`}>
        <Icon className="w-full h-full text-white" />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)`,
        }}
        animate={{
          x: [-100, 100],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      />
    </motion.div>
  )
}

export default function HomePage() {
  const router = useRouter()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalSprayed: 0,
    activeEvents: 0,
    topDonation: 0
  })

  // Parallax scroll
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const y3 = useTransform(scrollY, [0, 300], [0, -150])

  // Mouse tracking for interactive gradient
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Animate stats with spring effect
    const timer = setTimeout(() => {
      setStats({
        totalEvents: 342,
        totalSprayed: 45678900,
        activeEvents: 12,
        topDonation: 500000
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: Diamond,
      title: 'Liquid Transactions',
      description: 'Seamless money flow with stunning visual effects',
      color: 'from-violet-500 to-purple-600',
      glow: 'shadow-violet-500/50'
    },
    {
      icon: Heart,
      title: 'Love Battles',
      description: 'Epic bride vs groom competitions with live animations',
      color: 'from-pink-500 to-rose-600',
      glow: 'shadow-pink-500/50'
    },
    {
      icon: Zap,
      title: 'Lightning Display',
      description: 'Real-time updates with mesmerizing effects',
      color: 'from-amber-500 to-orange-600',
      glow: 'shadow-amber-500/50'
    },
    {
      icon: Crown,
      title: 'Royal Leaderboard',
      description: 'Crown the biggest sprayers with glory',
      color: 'from-emerald-500 to-teal-600',
      glow: 'shadow-emerald-500/50'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Interactive Background Gradient */}
      <div
        className="fixed inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.4) 0%, transparent 50%)`
        }}
      />

      {/* Liquid Background Elements */}
      <div className="fixed inset-0">
        <LiquidBlob
          color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          size="w-96 h-96"
          position={{ top: '-10%', left: '-5%' }}
          delay={0}
        />
        <LiquidBlob
          color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          size="w-80 h-80"
          position={{ top: '50%', right: '-5%' }}
          delay={2}
        />
        <LiquidBlob
          color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          size="w-72 h-72"
          position={{ bottom: '-10%', left: '30%' }}
          delay={4}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              y: [null, -window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div style={{ y: y1 }} className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Glowing Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-70 animate-pulse" />
              <div className="relative px-6 py-3 bg-black/30 backdrop-blur-xl rounded-full border border-white/20">
                <span className="text-white font-medium flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Next-Gen Money Spraying Experience
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Title with Liquid Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8 relative"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
              Liquid Money
            </span>
            <span className="block text-white mt-2">
              Spraying <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">Revolution</span>
            </span>

            {/* Floating 3D Elements */}
            <motion.div
              className="absolute -top-10 -right-10 text-6xl"
              animate={{
                rotate: 360,
                y: [0, -20, 0]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              💎
            </motion.div>
            <motion.div
              className="absolute -bottom-10 -left-10 text-6xl"
              animate={{
                rotate: -360,
                y: [0, 20, 0]
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              💰
            </motion.div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Experience the future of celebration with our revolutionary glassmorphic interface
            and liquid animations that will mesmerize your guests
          </motion.p>

          {/* CTA Buttons with Liquid Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/setup')}
              className="group relative px-8 py-4 overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-xl group-hover:blur-2xl transition-all" />
              <span className="relative flex items-center justify-center text-white font-semibold text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Launch Event
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/demo')}
              className="group relative px-8 py-4 overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 border border-white/20" />
              <span className="relative flex items-center justify-center text-white font-semibold text-lg">
                <Play className="mr-2 h-5 w-5" />
                Experience Demo
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section with Liquid Numbers */}
      <section className="relative py-20">
        <motion.div style={{ y: y2 }} className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Events Hosted', value: stats.totalEvents, suffix: '+', icon: Calendar },
              { label: 'Total Sprayed', value: `₦${(stats.totalSprayed / 1000000).toFixed(1)}M`, suffix: '+', icon: Coins },
              { label: 'Live Now', value: stats.activeEvents, suffix: '', icon: Activity },
              { label: 'Top Spray', value: `₦${(stats.topDonation / 1000).toFixed(0)}K`, suffix: '', icon: Crown }
            ].map((stat, index) => (
              <GlassCard key={index} delay={index * 0.1}>
                <div className="text-center relative">
                  <div className="absolute -top-4 -right-4">
                    <stat.icon className="w-8 h-8 text-purple-400/50" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1
                    }}
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2"
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="relative py-20">
        <motion.div style={{ y: y3 }} className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-white mb-4"
            >
              Liquid Glass Features
            </motion.h2>
            <p className="text-xl text-gray-400">
              Experience the most beautiful money spraying platform ever created
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: -30 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`relative h-full rounded-3xl overflow-hidden ${feature.glow} shadow-2xl`}>
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-transparent to-pink-900/50 animate-gradient" />

                  {/* Glass morphism effect */}
                  <div className="relative h-full bg-white/5 backdrop-blur-2xl border border-white/10 p-8">
                    {/* Liquid animation overlay */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        background: [
                          'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
                          'radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                          'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
                        ]
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />

                    <div className="relative z-10">
                      <Icon3D Icon={feature.icon} color={feature.color} />
                      <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover reveal effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Event Types with Liquid Morph */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-white mb-4"
            >
              Celebrate Everything
            </motion.h2>
            <p className="text-xl text-gray-400">
              Every event becomes a masterpiece
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Weddings', icon: '💑', count: '150+', gradient: 'from-pink-500 to-rose-600' },
              { name: 'Birthdays', icon: '🎂', count: '89+', gradient: 'from-blue-500 to-purple-600' },
              { name: 'Naming', icon: '👶', count: '45+', gradient: 'from-green-500 to-teal-600' },
              { name: 'Others', icon: '🎉', count: '58+', gradient: 'from-yellow-500 to-orange-600' }
            ].map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-2xl group-hover:blur-3xl transition-all" />
                <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 text-center overflow-hidden">
                  {/* Liquid morph background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-20`}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  <motion.div
                    className="relative text-6xl mb-4"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {type.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">{type.name}</h3>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {type.count}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Events Hosted</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Liquid Animation */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Animated liquid background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-3xl animate-pulse" />
            </div>

            <h2 className="text-5xl font-bold text-white mb-6">
              Ready for the Future?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join the revolution of digital celebrations
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/setup')}
              className="relative group px-12 py-5 text-lg font-semibold"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative text-white flex items-center justify-center">
                <Gem className="mr-3 h-6 w-6" />
                Create Liquid Event
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}