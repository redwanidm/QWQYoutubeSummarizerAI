import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const apiAccessKey = request.headers.get('x-api-key');
    
    if (!apiAccessKey || apiAccessKey !== process.env.API_ACCESS_KEY) {
        return NextResponse.json({ error: "charak dir :p (Unauthorized)" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('video_id');

    if (!videoId) {
        return NextResponse.json({ error: "Missing video_id parameter" }, { status: 400 });
    }

    const API_BASE_URL = process.env.NGROK_URL;

    if (!API_BASE_URL) {
        return NextResponse.json({ error: "Transcript API base URL is not configured" }, { status: 500 });
    }

    try {
        const response = await fetch(`${API_BASE_URL}/transcript/?video_id=${videoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                'Origin': 'http://localhost:3000',
            },
        });

        if (!response.ok) {
            return NextResponse.json({ 
                error: "Failed to fetch transcript", 
                status: response.status,
                statusText: response.statusText 
            }, { status: response.status });
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: "No transcript data found" }, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Transcript fetch error:', error);

        return NextResponse.json({ 
            error: "Internal Server Error", 
            details: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
}

// Ensure the route is dynamically rendered
export const dynamic = 'force-dynamic';