import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Star, Crown, Zap } from 'lucide-react'
import { formatCurrency } from '@/lib/format'



export const DonationFeed = ({ donations, eventType }) => {
    const getAmountTier = (amount) => {
        if (amount >= 100000) return 'legendary'
        if (amount >= 50000) return 'epic'
        if (amount >= 20000) return 'rare'
        return 'common'
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-yellow-500" />
                    Live Money Spray Feed
                </h2>
                <div className="text-sm text-gray-500">
                    {donations.length} donation{donations.length !== 1 ? 's' : ''}
                </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                <AnimatePresence>
                    {donations.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Gift className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p>Waiting for the first spray...</p>
                        </div>
                    ) : (
                        donations.slice(0, 20).map((donation, index) => {
                            const tier = getAmountTier(donation.amount)

                            return (
                                <motion.div
                                    key={donation.id}
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -100, opacity: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`
                    relative p-4 rounded-xl transition-all hover:scale-[1.02]
                    ${tier === 'legendary' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white' :
                                            tier === 'epic' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                                                tier === 'rare' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                                                    'bg-gray-50'}
                  `}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                        ${tier === 'common' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white text-gray-800'}
                      `}>
                                                {donation.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className={`font-bold text-lg ${tier === 'common' ? 'text-gray-800' : ''}`}>
                                                    {donation.name}
                                                </h3>
                                                <p className={`text-sm ${tier === 'common' ? 'text-gray-500' : 'text-white/80'}`}>
                                                    {new Date(donation.timestamp || Date.now()).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className={`font-bold text-2xl ${tier === 'common' ? 'text-gray-800' : ''}`}>
                                                {formatCurrency(donation.amount)}
                                            </div>
                                            {donation.message && (
                                                <p className={`text-sm mt-1 italic ${tier === 'common' ? 'text-gray-600' : 'text-white/90'}`}>
                                                    "{donation.message}"
                                                </p>
                                            )}
                                            {tier !== 'common' && (
                                                <div className="flex items-center justify-end mt-2 space-x-1">
                                                    {tier === 'legendary' && <Crown className="w-5 h-5 text-yellow-300" />}
                                                    {(tier === 'epic' || tier === 'legendary') && <Star className="w-4 h-4 text-yellow-300" />}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {donation.recipient && eventType === 'wedding' && (
                                        <div className={`
                      absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold
                      ${donation.recipient === 'bride' ? 'bg-pink-200 text-pink-800' : 'bg-blue-200 text-blue-800'}
                    `}>
                                            {donation.recipient === 'bride' ? '👰' : '🤵'}
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}