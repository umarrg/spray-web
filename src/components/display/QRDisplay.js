import { QrCode, ExternalLink } from 'lucide-react'
import { useState } from 'react'



export const QRDisplay = ({ eventId }) => {
    const [showUrl, setShowUrl] = useState(false)
    const paymentUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/payment/${eventId}`

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Scan to Spray Money
            </h3>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                    {/* In production, use a real QR code library like qrcode.js */}
                    <QrCode className="w-32 h-32 text-gray-800" />
                </div>
            </div>

            <button
                onClick={() => setShowUrl(!showUrl)}
                className="w-full mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center"
            >
                <ExternalLink className="w-4 h-4 mr-1" />
                {showUrl ? 'Hide' : 'Show'} Payment Link
            </button>

            {showUrl && (
                <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 break-all">{paymentUrl}</p>
                </div>
            )}

            <p className="text-xs text-gray-500 text-center mt-4">
                Quick Payment Access
            </p>
        </div>
    )
}
