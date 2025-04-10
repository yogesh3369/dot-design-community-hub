"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
}

interface BentoGridProps {
    items: BentoItem[];
    className?: string;
}

function BentoGrid({ items, className }: BentoGridProps) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto", className)}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-4 rounded-xl overflow-hidden transition-all duration-500",
                        "border border-white/[0.03] bg-gradient-to-br from-lbd-dark-accent/20 via-black/30 to-black/20",
                        "hover:shadow-[0_8px_16px_rgba(0,0,0,0.5)] hover:border-white/[0.05]",
                        "hover:-translate-y-0.5 will-change-transform",
                        item.colSpan ? `col-span-1 ${item.colSpan === 2 ? "md:col-span-2" : ""}` : "col-span-1",
                        {
                            "shadow-[0_8px_16px_rgba(0,0,0,0.4)] -translate-y-0.5 border-white/[0.05]":
                                item.hasPersistentHover
                        }
                    )}
                >
                    <div
                        className={`absolute inset-0 ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-500`}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,94,255,0.008)_1px,transparent_1px)] bg-[length:3px_3px]" />
                    </div>

                    <div className="relative flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center p-2 bg-gradient-to-br from-purple-500/[0.03] to-lbd-pink/[0.03] text-purple-300/50 group-hover:text-purple-300/70 transition-all duration-500">
                                {item.icon}
                            </div>
                            {item.status && (
                                <span
                                    className={cn(
                                        "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                                        "bg-gradient-to-r from-purple-500/[0.03] to-lbd-pink/[0.03] text-purple-300/50",
                                        "transition-all duration-500 group-hover:text-purple-300/70 group-hover:from-purple-500/[0.05] group-hover:to-lbd-pink/[0.05]"
                                    )}
                                >
                                    {item.status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-bold tracking-tight text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-white/95 to-white/85 group-hover:from-purple-300/95 group-hover:to-purple-300/85 transition-all duration-500">
                                {item.title}
                                {item.meta && (
                                    <span className="ml-2 text-xs text-white/40 font-normal">
                                        {item.meta}
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed font-[425] group-hover:text-white/80 transition-colors duration-500">
                                {item.description}
                            </p>
                        </div>

                        {(item.tags || item.cta) && (
                            <div className="flex items-center justify-between mt-2">
                                {item.tags && (
                                    <div className="flex flex-wrap gap-2 text-xs text-white/40">
                                        {item.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 rounded-md bg-gradient-to-r from-purple-500/[0.03] to-lbd-pink/[0.03] backdrop-blur-sm transition-all duration-500 group-hover:text-white/60 group-hover:from-purple-500/[0.05] group-hover:to-lbd-pink/[0.05]"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div
                        className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-purple-500/[0.03] via-lbd-pink/[0.02] to-transparent ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-500`}
                    />
                </div>
            ))}
        </div>
    );
}

export { BentoGrid }
