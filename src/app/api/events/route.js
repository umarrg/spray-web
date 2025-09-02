import { NextResponse } from 'next/server'

export async function GET(request) {
    // Return demo data
    return NextResponse.json({
        event: {
            id: '1',
            type: 'wedding',
            title: 'Demo Wedding',
            date: new Date().toISOString(),
            venue: 'Demo Venue',
            organizerName: 'Demo Organizer'
        },
        donations: []
    })
}

export async function POST(request) {
    const data = await request.json()
    return NextResponse.json({
        eventId: Date.now().toString(),
        success: true
    })
}