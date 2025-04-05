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
                        "group relative p-4 rounded-xl overflow-hidden transition-all duration-300",
                        "border border-white/5 dark:border-white/5 bg-lbd-dark-accent/20 dark:bg-black",
                        "hover:shadow-[0_2px_8px_rgba(138,94,255,0.08)] dark:hover:shadow-[0_2px_8px_rgba(255,255,255,0.01)]",
                        "hover:-translate-y-0.5 will-change-transform",
                        item.colSpan ? `col-span-1 ${item.colSpan === 2 ? "md:col-span-2" : ""}` : "col-span-1",
                        {
                            "shadow-[0_2px_8px_rgba(138,94,255,0.05)] -translate-y-0.5":
                                item.hasPersistentHover,
                            "dark:shadow-[0_2px_8px_rgba(255,255,255,0.01)]":
                                item.hasPersistentHover,
                        }
                    )}
                >
                    <div
                        className={`absolute inset-0 ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,94,255,0.01)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:4px_4px]" />
                    </div>

                    <div className="relative flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-lbd-dark text-purple-400/70 group-hover:bg-gradient-to-br group-hover:from-purple-500/5 group-hover:to-lbd-pink/5 transition-all duration-300">
                                {item.icon}
                            </div>
                            {item.status && (
                                <span
                                    className={cn(
                                        "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                                        "bg-purple-500/5 text-purple-400/70",
                                        "transition-colors duration-300 group-hover:bg-purple-500/10"
                                    )}
                                >
                                    {item.status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium text-white/90 tracking-tight text-[15px] group-hover:text-purple-300/90 transition-colors duration-300">
                                {item.title}
                                {item.meta && (
                                    <span className="ml-2 text-xs text-white/60 font-normal">
                                        {item.meta}
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-white/70 leading-snug font-[425] group-hover:text-white/90 transition-colors duration-300">
                                {item.description}
                            </p>
                        </div>

                        {(item.tags || item.cta) && (
                            <div className="flex items-center justify-between mt-2">
                                {item.tags && (
                                    <div className="flex items-center space-x-2 text-xs text-white/60">
                                        {item.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 rounded-md bg-purple-500/5 backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/10"
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
                        className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-purple-500/5 to-transparent ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    />
                </div>
            ))}
        </div>
    );
}

export { BentoGrid }
