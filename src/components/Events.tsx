'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientCTAButton } from '@/components/ui/gradient-cta-button';
import { Link } from 'react-router-dom';
import Pill from '@/components/ui/pill';
import { getUpcomingEvents, EventUI } from '@/services/eventService';
import EventCard from './EventCard';
import { cn } from '@/lib/utils';

interface EventsProps {
  events?: EventUI[];
  maxEvents?: number;
}

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
          setEvents(upcomingEvents);
        } catch (err) {
          console.error('Failed to fetch events:', err);
          setError('Failed to load events. Please try again later.');
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
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lbd-dark/90 to-lbd-dark opacity-95"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px]"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
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
        ) : events.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-white/70">No upcoming events at the moment. Check back soon!</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-12"
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group"
              >
                <EventCard event={event} />
              </motion.div>
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
            <GradientCTAButton className="text-sm px-6 py-3">
              View All Events
            </GradientCTAButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
