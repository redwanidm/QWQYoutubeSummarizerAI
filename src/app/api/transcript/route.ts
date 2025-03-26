import { NextRequest, NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export const runtime = 'nodejs'; 

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'Missing video ID' }, { status: 400 });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const transcriptText = transcript.map(entry => entry.text).join(' ');

    return NextResponse.json({ 
      transcript: transcriptText,
      rawTranscript: transcript 
    });
  } catch (error) {
    console.error('Transcript fetch error:', error);
    return NextResponse.json({ 
      error: 'Could not fetch transcript',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
