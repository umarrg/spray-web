import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request,
    { params }
) {
    try {
        const { eventId } = params
        const donations = [
            {
                id: '1',
                eventId,
                name: 'Demo Donor 1',
                amount: 25000,
                timestamp: new Date().toISOString()
            }
        ]
        return NextResponse.json({ donations })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch donations' },
            { status: 500 }
        )
    }
}