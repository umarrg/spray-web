import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'



export const Celebration = ({ active, message = 'Amazing!' }) => {
    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: 3
                        }}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-12 py-8 rounded-2xl shadow-2xl"
                    >
                        <div className="flex items-center space-x-4">
                            <Sparkles className="w-12 h-12" />
                            <h2 className="text-4xl font-bold">{message}</h2>
                            <Star className="w-12 h-12" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
