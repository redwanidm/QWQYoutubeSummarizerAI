import { NextRequest, NextResponse } from 'next/server';
interface RawTranscriptEntry {
    text: string;
    start: number;
    duration: number;
  }
export async function POST(request: NextRequest) {
    const apiAccessKey = request.headers.get('x-api-key');
    
    if (!apiAccessKey || apiAccessKey !== process.env.API_ACCESS_KEY) {
        return NextResponse.json({ error: "charak dir :p" }, { status: 401 });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    try {
        const requestBody = await request.json();

        if (!requestBody.transcriptData || !requestBody.language) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
        }

        const { transcriptData, language } = requestBody;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Analyze the following video transcript and provide a structured summary:

Video Transcript: ${transcriptData.transcript}

Raw Transcript Data: ${JSON.stringify(transcriptData.rawTranscript.map((entry: RawTranscriptEntry) => ({
    text: entry.text,
    startTime: formatTimestamp(entry.start),
    endTime: formatTimestamp(entry.start + entry.duration)
})))}
Language you must use: ${language} 

Instructions:
1. Summary: Develop a concise, 3-4 sentence overview that captures the video's core narrative, central argument, or key message. Prioritize depth over brevity, ensuring the summary provides meaningful context and synthesizes the most critical insights.
Key Points: Directly extract the most significant, concrete information and takeaways from the video. Focus on:
    - Specific facts, findings, or discoveries
    - Actionable insights
    - Direct statements of knowledge or conclusion
    - Avoid meta-language like "the video highlights" or "the content discusses"
    - Provide clear, declarative statements that stand alone as valuable information
3. Quotes: Select 3 most representative quotes that not only encapsulate the video's core message but also demonstrate linguistic significance, emotional resonance, or intellectual depth. Prioritize quotes that reveal underlying themes or provocative perspectives.

4. Transcript Sections: Strategically segment the transcript to reveal the video's narrative arc, logical progression, or argumentative structure. Aim to:
    - Capture semantic and thematic transitions
    - Highlight critical conceptual shifts
    - Provide meaningful context for each section
    - Ensure comprehensive coverage of the entire video duration
    - stay within 5-15 logical sections 

Required Output Format (MUST follow exactly):
{
  "summary": "Concise video overview",
  "keyPoints": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ],
  "quotes": [
    "Memorable quote 1",
    "Memorable quote 2"
  ],
  "transcriptSections": [
    {
      "startTime": "MM:SS",
      "endTime": "MM:SS",
      "summary": "Brief explanation of this section's content 4-5 sentences",
      "sectionTitle" : "1 sentence that represents what happened in this section"
    }
  ]
}

IMPORTANT: 
- Respond ONLY with the JSON object. No additional text or explanations.
- do not translate the quotes keep them in their native language
- Each transcriptSection MUST cover a continuous portion of the video
- The sections together MUST cover the ENTIRE video duration
- Format timestamps as MM:SS and for videos duration more than an hour use HH:MM:SS
- For longer videos, combine related content into larger sections to stay within the 5-15 section limit
- Prioritize intellectual rigor, thematic coherence, and nuanced analysis in all components
- Demonstrate critical thinking by identifying subtle connections and underlying themes
- Maintain objectivity while capturing the video's essence and intellectual depth`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2088
                }
            })
        });

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error processing Gemini API request:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

function formatTimestamp(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const dynamic = 'force-dynamic';