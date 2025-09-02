import { Trophy, Crown, Medal, Award } from 'lucide-react'
import { formatCurrency } from '@/lib/format'



export const Leaderboard = ({ donations }) => {
    const topDonors = donations
        .reduce((acc, donation) => {
            const existing = acc.find(d => d.name === donation.name)
            if (existing) {
                existing.amount += donation.amount
                existing.count += 1
            } else {
                acc.push({
                    name: donation.name,
                    amount: donation.amount,
                    count: 1
                })
            }
            return acc
        }, [])
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 10)

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="w-5 h-5 text-yellow-500" />
        if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />
        if (index === 2) return <Award className="w-5 h-5 text-orange-600" />
        return null
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                    Top Sprayers
                </h2>
            </div>

            <div className="space-y-3">
                {topDonors.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No donations yet</p>
                ) : (
                    topDonors.map((donor, index) => (
                        <div
                            key={donor.name}
                            className={`
                flex items-center justify-between p-3 rounded-lg transition-all hover:scale-[1.02]
                ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' :
                                    index === 1 ? 'bg-gray-50 border border-gray-200' :
                                        index === 2 ? 'bg-orange-50 border border-orange-200' :
                                            'bg-gray-50'}
              `}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold text-white
                  ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                        index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                                            index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                                                'bg-gray-400'}
                `}>
                                    {index + 1}
                                </div>
                                {getRankIcon(index)}
                                <div>
                                    <p className="font-semibold text-gray-800">{donor.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {donor.count} donation{donor.count > 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">{formatCurrency(donor.amount)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}