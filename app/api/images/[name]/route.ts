import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
    _request: NextRequest,
    { params }: { params: { name: string } }
) {
    const imageName = params.name

    // Map of thumbnail names to their actual paths in the artifacts directory
    const imageMap: Record<string, string> = {
        'web-dev': 'course_web_dev_thumb_1769200157281.png',
        'data-science': 'course_data_science_thumb_1769200171346.png',
        'ui-ux': 'course_uiux_thumb_1769200184891.png',
        'video-thumb': 'video_thumbnail_placeholder_1769195457688.png',
    }

    const fileName = imageMap[imageName]

    if (!fileName) {
        return new NextResponse('Image not found', { status: 404 })
    }

    // Read the generated image
    const imagePath = path.join(
        process.cwd(),
        '..',
        '..',
        '..',
        '.gemini',
        'antigravity',
        'brain',
        '41af2580-951b-4f57-9fd3-6c50a24b5a7e',
        fileName
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
        return new NextResponse('Error reading image', { status: 500 })
    }
}
