import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Check for API key in headers
    const apiAccessKey = request.headers.get('x-api-key');
    
    // Validate the API access key
    if (!apiAccessKey || apiAccessKey !== process.env.API_ACCESS_KEY) {
        return NextResponse.json({ error: "charak dir :p" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
        return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
    }

    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${youtubeApiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: data.error.message }, { status: data.error.code });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : "Internal Server Error" 
        }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';