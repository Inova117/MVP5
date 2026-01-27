import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
    _request: NextRequest,
    { params: _params }: { params: { dimensions: string[] } }
) {
    // Read the generated thumbnail image
    const imagePath = path.join(
        process.cwd(),
        '..',
        '..',
        '..',
        '.gemini',
        'antigravity',
        'brain',
        '41af2580-951b-4f57-9fd3-6c50a24b5a7e',
        'video_thumbnail_placeholder_1769195457688.png'
    )

    try {
        const imageBuffer = fs.readFileSync(imagePath)
        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    } catch (error) {
        // If image not found, return a simple SVG placeholder
        const svg = `<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:rgb(30,58,138);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(88,28,135);stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="1280" height="720" fill="url(#grad)"/>
            <circle cx="640" cy="360" r="80" fill="white" opacity="0.9"/>
            <polygon points="620,330 680,360 620,390" fill="rgb(30,58,138)"/>
            <text x="640" y="480" font-family="Arial, sans-serif" font-size="36" fill="white" text-anchor="middle">Click to Play</text>
        </svg>`

        return new NextResponse(svg, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    }
}
