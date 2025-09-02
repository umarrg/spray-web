import { motion } from 'framer-motion'
import { TrendingUp, Target, Sparkles } from 'lucide-react'
import { Progress } from '@/components/ui/Progress'
import { formatCurrency } from '@/lib/format'


export const TotalCounter = ({ totalAmount, targetAmount, donationCount }) => {
    const percentage = targetAmount ? (totalAmount / targetAmount) * 100 : 0

    return (
        <div className="bg-white shadow-lg py-8">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block"
                >
                    <p className="text-gray-600 mb-2">Total Sprayed</p>
                    <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                        {formatCurrency(totalAmount)}
                    </div>
                    <div className="flex items-center justify-center mt-4 space-x-2">
                        <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                        <p className="text-sm text-gray-600">{donationCount} contributions</p>
                        <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                    </div>
                </motion.div>

                {targetAmount && targetAmount > 0 && (
                    <div className="mt-6 max-w-md mx-auto">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-semibold text-gray-800">
                                {percentage.toFixed(1)}%
                            </span>
                        </div>
                        <Progress value={totalAmount} max={targetAmount} />
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">Current</span>
                            <span className="text-xs text-gray-500 flex items-center">
                                <Target className="w-3 h-3 mr-1" />
                                Target: {formatCurrency(targetAmount)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}