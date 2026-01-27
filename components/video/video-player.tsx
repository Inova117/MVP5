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
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group shadow-tactile-lg transition-transform duration-300 hover:shadow-lift border border-primary/5">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={src}
                poster={poster}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                controls
            >
                Your browser does not support the video tag.
            </video>

            {/* Custom Speed Controls Overlay */}
            <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 backdrop-blur-md bg-black/30 p-1.5 rounded-full border border-white/10">
                {[0.5, 1, 1.5, 2].map((rate) => (
                    <button
                        key={rate}
                        onClick={() => changeSpeed(rate)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${playbackRate === rate
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-transparent text-white/80 hover:bg-white/20 hover:text-white'
                            }`}
                    >
                        {rate}x
                    </button>
                ))}
            </div>
        </div>
    )
}
