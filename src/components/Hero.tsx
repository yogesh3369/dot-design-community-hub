
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
    
    // Sample profile data for the AnimatedTooltip
    const people = [
        {
            id: 1,
            name: "Lisa Anderson",
            designation: "UI Designer",
            image: "/avatars/avatar-1.jpg",
        },
        {
            id: 2,
            name: "Mark Wilson",
            designation: "Product Designer",
            image: "/avatars/avatar-2.jpg",
        },
        {
            id: 3,
            name: "Emily Chen",
            designation: "UX Researcher",
            image: "/avatars/avatar-3.jpg",
        },
        {
            id: 4,
            name: "David Kim",
            designation: "Design Lead",
            image: "/avatars/avatar-4.jpg",
        },
        {
            id: 5,
            name: "Sarah Johnson",
            designation: "AI Specialist",
            image: "/avatars/avatar-5.jpg",
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
                                <span className="block mb-1 sm:mb-2">Little Bid Dots - From AI Curiosity to Design Confidence</span>
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
                            {isMobile ? (
                                <JoinCommunityModal headingText="Ready to join our community?">
                                    <GradientCTAButton>
                                        Join Our Community
                                    </GradientCTAButton>
                                </JoinCommunityModal>
                            ) : (
                                <JoinCommunityPopover headingText="Ready to join our community?">
                                    <GradientCTAButton>
                                        Join Our Community
                                    </GradientCTAButton>
                                </JoinCommunityPopover>
                            )}
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
