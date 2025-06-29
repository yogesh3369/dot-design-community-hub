import { Calendar, Clock, Users, User as UserIcon, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EventUI } from '@/services/eventService';
import { JoinCommunityModal } from '@/components/ui/join-community-modal';

interface EventCardProps {
  event: EventUI;
  className?: string;
}

export default function EventCard({ event, className = '' }: EventCardProps) {
  return (
    <Card 
      className={`glass-card bg-black/90 border border-white/10 hover:border-lbd-pink/30 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-lbd-pink/20 hover:-translate-y-2 backdrop-blur-xl rounded-2xl h-full flex flex-col ${className}`}
    >
      {/* Card Content */}
      <CardContent className="p-6 flex-1 flex flex-col">
        {/* Format Badge */}
        <div className="inline-flex items-center bg-lbd-pink/10 border border-lbd-pink/20 text-lbd-pink text-xs font-medium px-3 py-1 rounded-full mb-4 self-start">
          {event.format}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {event.title}
        </h3>
        
        {/* Description */}
        {event.description && (
          <p className="text-white/60 text-sm mb-4 line-clamp-3">
            {event.description}
          </p>
        )}
        
        {/* Event Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-white/70 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-lbd-pink" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-white/70 text-sm">
            <Clock className="w-4 h-4 mr-2 text-lbd-pink" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-white/70 text-sm">
            <Users className="w-4 h-4 mr-2 text-lbd-pink" />
            <span>{event.seats || 'Unlimited'} Seats</span>
          </div>
          <div className="flex items-center text-white/70 text-sm">
            <UserIcon className="w-4 h-4 mr-2 text-lbd-pink" />
            <span>{event.presenter}</span>
          </div>
        </div>
        
        {/* Duration */}
        <div className="flex items-center text-white/70 text-sm mb-4">
          <Clock className="w-4 h-4 mr-2 text-lbd-pink" />
          <span>Duration: {event.duration}</span>
        </div>
      </CardContent>

      {/* Pricing and CTA */}
      <CardFooter className="p-5 pt-0">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div>
              {event.price && (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{event.price}</span>
                  {event.originalPrice && (
                    <span className="text-white/50 line-through text-sm">{event.originalPrice}</span>
                  )}
                </div>
              )}
              {event.discount && (
                <span className="text-xs text-lbd-pink bg-lbd-pink/10 px-2 py-0.5 rounded-full">
                  {event.discount} OFF
                </span>
              )}
            </div>
            <JoinCommunityModal 
              headingText={`Register for ${event.title}`}
              eventData={{
                eventName: event.title,
                eventId: event.id,
                eventDate: event.date,
                eventTime: event.time
              }}
            >
              <Button
                variant="ghost"
                className="bg-gradient-to-r from-lbd-pink to-purple-600 hover:from-lbd-pink/90 hover:to-purple-600/90 text-white rounded-full px-6 py-2 transition-all duration-300 transform hover:scale-105"
              >
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </JoinCommunityModal>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
