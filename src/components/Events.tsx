
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Pill from "@/components/ui/pill";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUpcomingEvents, EventUI } from '@/services/eventService';

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
                <Card className="glass-card bg-gradient-to-br from-lbd-dark-accent/50 to-lbd-dark/80 border border-white/10 hover:border-lbd-pink/30 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-lbd-pink/20 hover:-translate-y-2 backdrop-blur-xl rounded-2xl h-full flex flex-col">
                  {/* Event Image with Overlay Info */}
                  <div className="relative h-56 overflow-hidden rounded-t-2xl">
                    {event.image ? (
                      <motion.div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${event.image})` }}
                        aria-hidden="true"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/20 to-purple-600/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Calendar className="w-16 h-16 text-lbd-pink/30" aria-hidden="true" />
                        </div>
                      </div>
                    )}
                    
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                    
                    {/* Top badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                      <div className="bg-lbd-pink/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </div>
                      {event.discount && (
                        <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          {event.discount}
                        </div>
                      )}
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-lbd-pink transition-colors duration-300">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </div>
                        {event.seats && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {event.seats}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardContent className="p-6 flex-1 flex flex-col">
                    {event.description && (
                      <p className="text-white/70 text-sm mb-4 line-clamp-2 flex-1">
                        {event.description}
                      </p>
                    )}
                    
                    {/* Event Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-white/60 mb-1 font-medium uppercase tracking-wider">Presenter</p>
                        <p className="font-semibold text-white">{event.presenter}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-white/60 mb-1 font-medium uppercase tracking-wider">Duration</p>
                        <p className="font-semibold text-white">{event.duration}</p>
                      </div>
                    </div>

                    {/* Format Badge */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-gradient-to-r from-lbd-pink/20 to-purple-600/20 border border-lbd-pink/30 px-4 py-2 rounded-full">
                        <p className="font-semibold text-lbd-pink flex items-center text-sm">
                          {event.format === "Virtual Workshop" && (
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          )}
                          {event.format === "Live Webinar" && (
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
                            </svg>
                          )}
                          {event.format}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  {/* Pricing and CTA */}
                  <CardFooter className="p-6 pt-0 border-t border-white/10">
                    <div className="w-full">
                      {/* Pricing Section - Only show if pricing data exists */}
                      {(event.price || event.originalPrice) && (
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-baseline gap-2">
                            {event.price && (
                              <span className="text-2xl font-bold text-lbd-pink flex items-center">
                                {event.price}
                              </span>
                            )}
                            {event.originalPrice && (
                              <span className="text-sm text-white/50 line-through">
                                {event.originalPrice}
                              </span>
                            )}
                          </div>
                          {event.seats && (
                            <div className="text-right">
                              <p className="text-xs text-white/60">Only</p>
                              <p className="text-sm font-semibold text-orange-400">{event.seats}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Register Button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-lbd-pink to-purple-600 hover:from-lbd-pink/90 hover:to-purple-600/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-lbd-pink/30 hover:scale-[1.02] group-hover:scale-105"
                        aria-label={`Register for ${event.title}`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          Register Now
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
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
            <Button 
              variant="outline" 
              className="border-lbd-pink text-lbd-pink hover:bg-lbd-pink hover:text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-lbd-pink/30"
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
