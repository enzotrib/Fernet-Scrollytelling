import React, { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, type MotionValue } from 'framer-motion';

interface CanvasScrollProps {
    progress: MotionValue<number>;
    frameCount: number;
    baseUrl: string;
}

const CanvasScroll: React.FC<CanvasScrollProps> = ({ progress, frameCount, baseUrl }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(3, '0');
            img.src = `${baseUrl}/ezgif-frame-${frameIndex}.jpg`;
            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
                if (loadedCount === frameCount) {
                    imagesRef.current = loadedImages;
                    setIsLoaded(true);
                    drawFrame(progress.get());
                }
            };
            loadedImages[i - 1] = img;
        }
    }, [frameCount, baseUrl]);

    const drawFrame = (val: number) => {
        if (!imagesRef.current.length || !canvasRef.current) return;

        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(val * (frameCount - 1))
        );

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const img = imagesRef.current[frameIndex];
        if (!img) return;

        const { innerWidth: width, innerHeight: height } = window;
        canvas.width = width;
        canvas.height = height;

        const imgWidth = img.width;
        const imgHeight = img.height;
        const ratio = Math.max(width / imgWidth, height / imgHeight);

        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const x = (width - newWidth) / 2;
        const y = (height - newHeight) / 2;

        context.clearRect(0, 0, width, height);
        context.drawImage(img, x, y, newWidth, newHeight);
    };

    useMotionValueEvent(progress, "change", (latest) => {
        if (isLoaded) {
            requestAnimationFrame(() => drawFrame(latest));
        }
    });

    // Handle resize
    useEffect(() => {
        const handleResize = () => drawFrame(progress.get());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded]);

    return (
        <>
            {!isLoaded && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
                    <div className="text-2xl font-bold mb-4 uppercase tracking-widest text-cyan-400">Loading Experience</div>
                    <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden border border-white/10">
                        <div
                            className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
            />
        </>
    );
};

export default CanvasScroll;
