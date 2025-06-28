'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Pill from "@/components/ui/pill";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { getUpcomingEvents, EventUI } from '@/services/eventService';

// Using the EventUI interface from eventService.ts

interface EventsProps {
  events?: EventUI[];
  maxEvents?: number;
}

// Fallback events in case API fails
const fallbackEvents: EventUI[] = [
  {
    id: "event-1",
    title: "AI in Design: Practical Applications",
    date: "July 15, 2025",
    time: "2:00 PM",
    presenter: "Arun Kumar",
    duration: "90 minutes",
    format: "Virtual Workshop",
    image: "/images/events/ai-design-workshop.jpg",
    description: "Learn how AI is revolutionizing the design industry with practical examples."
  },
  {
    id: "event-2",
    title: "Building MVPs with No-Code Tools",
    date: "July 28, 2025",
    time: "11:00 AM",
    presenter: "Terence Dsouza",
    duration: "60 minutes",
    format: "Live Webinar",
    image: "/images/events/nocode-mvp.jpg",
    description: "Discover how to rapidly prototype and build MVPs using no-code platforms."
  },
  {
    id: "event-3",
    title: "UX Research Fundamentals",
    date: "August 10, 2025",
    time: "3:30 PM",
    presenter: "Priya Sharma",
    duration: "75 minutes",
    format: "Virtual Workshop",
    image: "/images/events/ux-research.jpg",
    description: "Master the basics of user experience research methodologies."
  }
];

const Events = ({ events: initialEvents, maxEvents = 3 }: EventsProps) => {
  const [events, setEvents] = useState<EventUI[]>(initialEvents || []);
  const [loading, setLoading] = useState<boolean>(!initialEvents);
  const [error, setError] = useState<string>("");
  
  useEffect(() => {
    if (!initialEvents) {
      const fetchEvents = async () => {
        try {
          setLoading(true);
          const upcomingEvents = await getUpcomingEvents(maxEvents);
          
          if (upcomingEvents.length > 0) {
            setEvents(upcomingEvents);
          } else {
            // Fallback to hardcoded events if no events from API
            setEvents(fallbackEvents.slice(0, maxEvents));
          }
        } catch (err) {
          console.error('Failed to fetch events:', err);
          setError('Failed to load events. Please try again later.');
          setEvents(fallbackEvents.slice(0, maxEvents));
        } finally {
          setLoading(false);
        }
      };
      
      fetchEvents();
    }
  }, [initialEvents, maxEvents]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      id="upcoming-events" 
      className="py-20 lg:py-32 relative overflow-hidden bg-lbd-dark text-lbd-white" 
      ref={sectionRef}
      aria-labelledby="events-heading"
    >
      {/* Background elements - reduced opacity for better text visibility */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lbd-dark/90 to-lbd-dark opacity-95"></div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }} // Reduced opacity
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px]"
          aria-hidden="true"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }} // Reduced opacity
          transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-lbd-pink rounded-full filter blur-[150px]"
          aria-hidden="true"
        />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Pill
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { scale: 0.9, opacity: 0 },
              visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
            }}
            className="mb-6"
          >
            Learn & Connect
          </Pill>
          
          <h2 id="events-heading" className="text-3xl md:text-4xl font-bold font-heading mb-4 text-white">
            Upcoming <span className="text-lbd-pink">Events</span>
          </h2>
          <p className="text-white text-lg mb-8">
            Join our interactive sessions to learn, connect, and grow with the community
          </p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lbd-pink"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-400">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4 border-lbd-pink text-lbd-pink hover:bg-lbd-pink hover:text-white"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-12"
          >
            {events.map((event) => (
            <Card 
              key={event.id} 
              className="bg-gradient-to-b from-black to-black/95 border border-white/10 hover:border-lbd-pink/50 transition-all duration-300 overflow-hidden group shadow-lg shadow-lbd-pink/5 hover:shadow-lbd-pink/10 rounded-xl"
              role="article"
              aria-labelledby={`event-title-${event.id}`}
            >
              <div className="relative h-44 overflow-hidden rounded-t-xl">
                {event.image ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ backgroundImage: `url(${event.image})` }}
                    aria-hidden="true"
                  >
                    {/* Enhanced gradient overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-lbd-dark to-lbd-pink/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-lbd-pink/10 flex items-center justify-center opacity-20">
                        <Calendar className="w-6 h-6 text-lbd-pink/50" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3 z-10">
                  <div className="flex items-center bg-lbd-pink/90 text-white px-2.5 py-1 rounded-full shadow-lg" aria-label="Event date and time">
                    <Calendar className="w-3 h-3 mr-1" aria-hidden="true" />
                    <span className="text-xs font-bold tracking-wide">{event.date}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <div className="flex items-center bg-black/70 text-white px-2.5 py-1 rounded-full shadow-lg" aria-label="Event time">
                    <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
                    <span className="text-xs font-medium">{event.time}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 p-4 z-20 w-full bg-gradient-to-t from-black to-transparent">
                  <h3 
                    id={`event-title-${event.id}`} 
                    className="text-xl font-bold text-white leading-tight group-hover:text-lbd-pink transition-colors duration-300"
                  >
                    {event.title}
                  </h3>
                </div>
              </div>
              <CardContent className="pt-4 pb-2 px-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <p className="text-white/70 mb-1 font-medium text-xs uppercase tracking-wider">Presenter</p>
                    <p className="font-semibold text-white">{event.presenter}</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg">
                    <p className="text-white/70 mb-1 font-medium text-xs uppercase tracking-wider">Duration</p>
                    <p className="font-semibold text-white">{event.duration}</p>
                  </div>
                  <div className="col-span-2 bg-white/5 p-2 rounded-lg">
                    <p className="text-white/70 mb-1 font-medium text-xs uppercase tracking-wider">Format</p>
                    <p className="font-semibold text-white flex items-center">
                      {event.format === "Virtual Workshop" && (
                        <svg className="w-4 h-4 mr-2 text-lbd-pink" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                      {event.format === "Live Webinar" && (
                        <svg className="w-4 h-4 mr-2 text-lbd-pink" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
                        </svg>
                      )}
                      {event.format}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-4 px-4">
                <Button 
                  variant="ghost" 
                  className="bg-gradient-to-r from-lbd-pink to-lbd-pink/80 hover:from-lbd-pink hover:to-lbd-pink text-white w-full justify-center font-medium py-2.5 rounded-lg shadow-md shadow-lbd-pink/20 hover:shadow-lbd-pink/30 transition-all duration-300 border-none text-sm"
                  aria-label={`Register for ${event.title}`}
                >
                  Register Now
                </Button>
              </CardFooter>
            </Card>
            ))}
        </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center"
        >
          <Link to="/events" className="inline-block">
            <Button 
              variant="outline" 
              className="border-lbd-pink text-lbd-pink hover:bg-lbd-pink hover:text-white font-medium"
              aria-label="View all upcoming events"
            >
              View All Events <ArrowRight className="ml-2" aria-hidden="true" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
