import { motion } from 'framer-motion'
import { Heart, Crown, TrendingUp, Users } from 'lucide-react'
import { formatCurrency } from '@/lib/format'


export const WeddingBattle = ({ brideTotal, groomTotal, donations }) => {
    const total = brideTotal + groomTotal
    const bridePercentage = total > 0 ? (brideTotal / total) * 100 : 50
    const groomPercentage = total > 0 ? (groomTotal / total) * 100 : 50

    const brideDonors = donations.filter(d => d.recipient === 'bride').length
    const groomDonors = donations.filter(d => d.recipient === 'groom').length

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center">
                <Heart className="w-6 h-6 mr-2 text-red-500" />
                The Battle of Love
                <Heart className="w-6 h-6 ml-2 text-red-500" />
            </h2>

            {/* Team Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-lg bg-pink-50 border-2 border-pink-200"
                >
                    <h3 className="text-lg font-semibold text-pink-600 mb-2">Team Bride 👰</h3>
                    <p className="text-3xl font-bold text-pink-700">{formatCurrency(brideTotal)}</p>
                    <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {brideDonors} supporters
                    </div>
                    {bridePercentage > groomPercentage && (
                        <Crown className="w-6 h-6 text-yellow-500 mx-auto mt-2" />
                    )}
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-lg bg-blue-50 border-2 border-blue-200"
                >
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Team Groom 🤵</h3>
                    <p className="text-3xl font-bold text-blue-700">{formatCurrency(groomTotal)}</p>
                    <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {groomDonors} supporters
                    </div>
                    {groomPercentage > bridePercentage && (
                        <Crown className="w-6 h-6 text-yellow-500 mx-auto mt-2" />
                    )}
                </motion.div>
            </div>

            {/* Battle Bar */}
            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bridePercentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-400 to-pink-600"
                />
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${groomPercentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute right-0 top-0 h-full bg-gradient-to-l from-blue-400 to-blue-600"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white px-2 py-1 rounded-full text-xs font-bold text-gray-700">
                        {bridePercentage.toFixed(0)}% - {groomPercentage.toFixed(0)}%
                    </div>
                </div>
            </div>

            {/* Winner Status */}
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    {bridePercentage > groomPercentage
                        ? "👰 Bride's team is winning!"
                        : groomPercentage > bridePercentage
                            ? "🤵 Groom's team is leading!"
                            : "It's a tie! Keep spraying!"}
                </p>
            </div>
        </div>
    )
}