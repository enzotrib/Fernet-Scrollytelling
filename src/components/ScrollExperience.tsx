import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import CanvasScroll from './CanvasScroll';

const sections = [
    {
        prefix: "180 AÑOS",
        title: "CON LAS HIERBAS BIEN PUESTAS",
        description: "Una receta centenaria que se mantiene fiel a su origen.",
        start: 0.1,
        end: 0.25
    },
    {
        prefix: "EL SECRETO",
        title: "MEJOR GUARDADO",
        description: "Mirra, ruibarbo, manzanilla y azafrán en una danza de sabores única.",
        start: 0.3,
        end: 0.45
    },
    {
        prefix: "DESDE 1845",
        title: "DESTILADO con ALMA",
        description: "Un proceso artesanal perfeccionado a lo largo de los siglos.",
        start: 0.5,
        end: 0.65
    },
    {
        prefix: "FERNET BRANCA",
        title: "MÁS QUE UN TRAGO",
        description: "Un icono cultural que trasciende fronteras y generaciones.",
        start: 0.7,
        end: 0.85
    }
];

const ScrollExperience: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth progress for the canvas to avoid jumps
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative h-[800vh] bg-black">
            {/* Sticky Container for Canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <CanvasScroll
                    progress={smoothProgress}
                    frameCount={127}
                    baseUrl="/imagenes"
                />

                {/* Overlay progress bar (optional, for visual feedback) */}
                <motion.div
                    className="fixed bottom-0 left-0 h-1 bg-[#d6d9c1] z-50 origin-left opacity-30"
                    style={{ scaleX: scrollYProgress }}
                />

                {/* Text Overlays */}
                <div className="relative h-full w-full flex items-center justify-center pointer-events-none px-6">
                    {sections.map((section, index) => (
                        <OverlaySection
                            key={index}
                            {...section}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

interface OverlaySectionProps {
    prefix?: string;
    title: string;
    description: string;
    start: number;
    end: number;
    scrollYProgress: any;
}

const OverlaySection: React.FC<OverlaySectionProps> = ({ prefix, title, description, start, end, scrollYProgress }) => {
    // Calculate individual section animations
    const opacity = useTransform(
        scrollYProgress,
        [start - 0.02, start, end, end + 0.02],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [start - 0.05, start, end, end + 0.05],
        [50, 0, 0, -50]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute w-full flex flex-col items-center text-center px-4"
        >
            {prefix && (
                <span className="block text-xl md:text-2xl font-['Bebas_Neue'] text-[#d6d9c1]/70 tracking-[0.4em] mb-4 uppercase">
                    {prefix}
                </span>
            )}
            <h2 className="text-5xl md:text-[8vw] font-['Bebas_Neue'] text-[#d6d9c1] leading-none mb-10 uppercase tracking-tighter md:whitespace-nowrap">
                {title}
            </h2>
            <p className="text-sm md:text-lg text-white/40 font-light tracking-[0.4em] uppercase leading-relaxed md:whitespace-nowrap">
                {description}
            </p>
        </motion.div>
    );
};

export default ScrollExperience;
