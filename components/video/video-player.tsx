'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
    src: string
    poster?: string
    onProgress?: (seconds: number) => void
    onComplete?: () => void
    currentTime?: number
}

export function VideoPlayer({
    src,
    poster,
    onProgress,
    onComplete,
    currentTime = 0,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [playbackRate, setPlaybackRate] = useState(1)

    useEffect(() => {
        if (videoRef.current && currentTime > 0) {
            videoRef.current.currentTime = currentTime
        }
    }, [currentTime])

    const handleTimeUpdate = () => {
        if (videoRef.current && onProgress) {
            const time = videoRef.current.currentTime
            if (Math.floor(time) % 5 === 0) {
                // Save every 5 seconds
                onProgress(time)
            }
        }
    }

    const handleEnded = () => {
        if (onComplete) {
            onComplete()
        }
    }

    const changeSpeed = (rate: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = rate
            setPlaybackRate(rate)
        }
    }

    return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
            <video
                ref={videoRef}
                className="w-full h-full"
                src={src}
                poster={poster}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                controls
            >
                Your browser does not support the video tag.
            </video>

            {/* Custom Speed Controls Overlay */}
            <div className="absolute bottom-20 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {[0.5, 1, 1.5, 2].map((rate) => (
                    <button
                        key={rate}
                        onClick={() => changeSpeed(rate)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${playbackRate === rate
                            ? 'bg-primary-600 text-white'
                            : 'bg-black/60 text-white hover:bg-black/80'
                            }`}
                    >
                        {rate}x
                    </button>
                ))}
            </div>
        </div>
    )
}
