
"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle, ChevronRight, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Pill from "@/components/ui/pill";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { JoinCommunityPopover } from "@/components/ui/join-community-popover";
import { JoinCommunityModal } from "@/components/ui/join-community-modal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GradientCTAButton } from "@/components/ui/gradient-cta-button";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

const Hero = () => {
    // Check if screen is mobile size
    const isMobile = useMediaQuery('(max-width: 768px)');
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };
    
    // Profile data for the AnimatedTooltip with LinkedIn images
    const people = [
        {
            id: 1,
            name: "Raktim",
            designation: "Principal UX Consultant",
            image: "https://media.licdn.com/dms/image/v2/C5603AQG4FCbKDkL38g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1641937432312?e=1756339200&v=beta&t=a_rukAzQShdvz2L4xd-vO1EWmK7XjgcgcSKkNz7n96E",
        },
        {
            id: 2,
            name: "Yogesh",
            designation: "Senior Associate (UI/UX Designer)",
            image: "https://media.licdn.com/dms/image/v2/D5603AQFg2R2sZ41TCQ/profile-displayphoto-crop_800_800/B56ZeX.IN0HoAI-/0/1750601337166?e=1756339200&v=beta&t=iO44k8aR80KR1_P7VTztyV-rcJJOoBz_K5fr67RDXtw",
        },
        {
            id: 3,
            name: "Vinay",
            designation: "Lead Consultant",
            image: "https://media.licdn.com/dms/image/v2/D5603AQEBQv1flD4k3w/profile-displayphoto-shrink_400_400/B56ZT.A8IQGsAk-/0/1739428447227?e=1756339200&v=beta&t=QhAwqYBAuLImH1hnORuNw66bNZoLdS-_u9q3D-WOS4k",
        },
        {
            id: 4,
            name: "Shruti Khopkar",
            designation: "Product Designer",
            image: "https://media.licdn.com/dms/image/v2/D4D03AQFHDmbhh9hdpw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1698748377871?e=1756339200&v=beta&t=o2xF8rdf-ORShEtH4oWe-KCOl8VUGaYgq3mtuTyGssM",
        },
        {
            id: 5,
            name: "Terence Dsouza",
            designation: "Product Designer",
            image: "https://media.licdn.com/dms/image/v2/D5603AQG3x2aAYeqTeg/profile-displayphoto-shrink_400_400/B56ZSeV.wuGoAo-/0/1737823350473?e=1756339200&v=beta&t=_3aZvERtSc1k-gFEtxEibDj7VXABxqxZlZbUUiNjz_4",
        },
    ];

    return (
        <div className="relative min-h-screen w-full flex items-center overflow-hidden bg-lbd-dark pt-24 md:pt-24">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient blur circles */}
                <div className="absolute left-[-15%] top-[15%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-purple-600/20 blur-[120px]" />
                <div className="absolute right-[-10%] bottom-[5%] w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full bg-lbd-pink/20 blur-[120px]" />
                <div className="absolute left-[40%] top-[60%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-blue-500/10 blur-[100px]" />

                {/* Main content container with grid layout */}
                <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 py-8 sm:py-20 md:py-32 lg:py-40 min-h-[80vh] md:content-center">
                    {/* Left column - Text content */}
                    <div className="flex flex-col justify-start items-center md:items-start md:col-span-3 order-1 md:order-1 pt-24 md:pt-0">
                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-center md:text-left"
                        >
                            <motion.div 
                                className="mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                <AnimatedTooltip items={people} className="justify-center md:justify-start mb-4" />
                            </motion.div>
                            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight leading-[1.1]">
                                <span className="block text-white">
                                    From AI Curiosity
                                </span>
                                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-lbd-pink to-red-500">
                                    to Design
                                </span>
                                <span className="block text-white">
                                    Confidence
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/60 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-light tracking-wide max-w-2xl mx-auto md:mx-0 text-center md:text-left">
                                <span className="block mb-1 sm:mb-2">Little Big Dots - From AI Curiosity to Design Confidence</span>
                                <span className="block">A supportive community helping designers master AI with hands-on methodologies, resources, and collaborative learning.</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* CTA - Single button with proper animation */}
                    <div className="flex flex-col justify-center items-center md:col-span-2 order-2 md:order-2 mt-6 md:mt-0 mb-12 md:mb-0">
                        <motion.div 
                            custom={3}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-full max-w-md mx-auto text-center"
                        >
                            <JoinCommunityPopover 
                                headingText="Ready to join our community?"
                                buttonText="Join Our Community"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-lbd-dark via-transparent to-lbd-dark/80 pointer-events-none" />
        </div>
    );
};

export default Hero;
