import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request,
    { params }
) {
    try {
        const { eventId } = params

        // In production, fetch from database
        // For demo, return mock data
        const event = {
            id: eventId,
            type: 'wedding',
            title: 'Demo Wedding Event',
            date: new Date().toISOString(),
            time: '14:00',
            venue: 'Lagos Event Center',
            organizerName: 'Demo Organizer',
            organizerPhone: '08012345678',
            organizerEmail: 'demo@example.com',
            targetAmount: 5000000,
            status: 'active',
            paymentMethod: 'all'
        }

        const donations = [
            {
                id: '1',
                eventId,
                name: 'Adebayo Kunle',
                amount: 50000,
                message: 'Congratulations!',
                recipient: 'bride',
                timestamp: new Date(Date.now() - 300000).toISOString()
            },
            {
                id: '2',
                eventId,
                name: 'Chioma Nnamdi',
                amount: 100000,
                message: 'Happy married life!',
                recipient: 'groom',
                timestamp: new Date(Date.now() - 600000).toISOString()
            }
        ]

        return NextResponse.json({ event, donations })
    } catch (error) {
        return NextResponse.json(
            { error: 'Event not found' },
            { status: 404 }
        )
    }
}

export async function PUT(
    request,
    { params }
) {
    try {
        const { eventId } = params
        const data = await request.json()

        // In production, update in database
        // For demo, return updated event
        const updatedEvent = {
            id: eventId,
            ...data,
            updatedAt: new Date().toISOString()
        }

        return NextResponse.json({
            success: true,
            event: updatedEvent
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update event' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request,
    { params }
) {
    try {
        const { eventId } = params

        // In production, delete from database
        // For demo, return success
        return NextResponse.json({
            success: true,
            message: 'Event deleted successfully'
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete event' },
            { status: 500 }
        )
    }
}
