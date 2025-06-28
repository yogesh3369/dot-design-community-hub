import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Search, Clock, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { getAllEvents, EventUI, EventFilters } from '@/services/eventService';
import { format } from 'date-fns';
import { Select } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const EventsPage = () => {
  // State for events and loading status
  const [events, setEvents] = useState<EventUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPresenter, setSelectedPresenter] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  
  // State for unique presenters and formats (for filter dropdowns)
  const [presenters, setPresenters] = useState<string[]>([]);
  const [formats, setFormats] = useState<string[]>([]);
  
  // State to control filter panel visibility
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  
  // State for sorting events
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Create filters object
        const filters: EventFilters = {};
        if (searchQuery) filters.search = searchQuery;
        if (selectedPresenter) filters.presenter = selectedPresenter;
        if (selectedFormat) filters.format = selectedFormat;
        if (startDate) filters.startDate = startDate;
        
        // Fetch events with filters
        const fetchedEvents = await getAllEvents(filters);
        
        if (fetchedEvents.length > 0) {
          setEvents(fetchedEvents);
          
          // Extract unique presenters and formats for filters
          const uniquePresenters = Array.from(new Set(fetchedEvents.map(event => event.presenter)));
          const uniqueFormats = Array.from(new Set(fetchedEvents.map(event => event.format)));
          
          setPresenters(uniquePresenters);
          setFormats(uniqueFormats);
        } else {
          setError("No events found. Please try different filters.");
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [searchQuery, selectedPresenter, selectedFormat, startDate]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPresenter('');
    setSelectedFormat('');
    setStartDate('');
  };
  
  // Sort events by date
  const sortEvents = (events: EventUI[]) => {
    return [...events].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen flex flex-col bg-lbd-dark text-white">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-12 lg:py-20 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px] opacity-5"></div>
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-lbd-pink rounded-full filter blur-[150px] opacity-5"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h1 id="page-heading" className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white">
                Community <span className="text-lbd-pink">Events</span>
              </h1>
              <p className="text-white text-lg mb-6">
                Join our interactive sessions to learn, connect, and grow with the community
              </p>
              
              {/* Search bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lbd-pink" size={18} aria-hidden="true" />
                <Input 
                  id="event-search"
                  type="search" 
                  placeholder="Search events..." 
                  className="pl-10 bg-black border-white/20 focus:border-lbd-pink hover:border-lbd-pink/50 transition-colors text-white"
                  aria-label="Search events"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            {/* Filter and sort controls */}
            <div className="flex justify-between items-center mb-6 mt-8">
              <div className="flex items-center">
                {!loading && !error && (
                  <span className="bg-lbd-pink/10 text-lbd-pink text-xs font-medium px-2.5 py-1.5 rounded-full">
                    {events.length} {events.length === 1 ? 'event' : 'events'} found
                  </span>
                )}
                
                {(searchQuery || selectedPresenter || selectedFormat || startDate) && (
                  <Button 
                    variant="ghost" 
                    className="text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-200 flex items-center ml-3"
                    onClick={clearFilters}
                  >
                    <X className="mr-1.5" size={16} /> Clear Filters
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {/* Sort button */}
                <Button
                  variant="outline"
                  className="text-sm border-white/20 hover:bg-white/10 transition-colors flex items-center"
                  onClick={toggleSortOrder}
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {sortOrder === 'asc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                    )}
                  </svg>
                  Sort by Date {sortOrder === 'asc' ? '(Oldest first)' : '(Newest first)'}
                </Button>
                
                {/* Filter button */}
                <Button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="bg-black/40 hover:bg-black/60 text-white border border-white/10 hover:border-lbd-pink/50 shadow-md flex items-center gap-2 transition-all duration-200"
                >
                  <Filter size={18} className="text-lbd-pink" />
                  Filter Events
                  {(searchQuery || selectedPresenter || selectedFormat || startDate) && (
                    <span className="inline-flex items-center justify-center w-5 h-5 ml-1 bg-lbd-pink text-white text-xs font-bold rounded-full">
                      !
                    </span>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Floating filter panel on the right */}
            {isFilterOpen && (
              <div className="fixed top-0 right-0 bottom-0 z-20 w-full md:w-96 animate-in slide-in-from-right duration-300">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" onClick={() => setIsFilterOpen(false)}></div>
                <div className="h-full bg-black/90 border-l border-white/10 shadow-xl overflow-auto p-6 pt-28">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center">
                      <Filter className="mr-2 text-lbd-pink" size={20} /> Filter Events
                    </h2>
                    <Button 
                      variant="ghost" 
                      className="text-white/70 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      <X size={18} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-5">
                    {/* Presenter filter */}
                    <div>
                      <label htmlFor="presenter-filter" className="block text-sm font-medium mb-2 text-white/80 flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1.5 text-lbd-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Presenter
                      </label>
                      <select
                        id="presenter-filter"
                        className="w-full bg-black border border-white/20 rounded-md p-2.5 text-white focus:border-lbd-pink hover:border-lbd-pink/50 transition-colors"
                        value={selectedPresenter}
                        onChange={(e) => setSelectedPresenter(e.target.value)}
                      >
                        <option value="">All Presenters</option>
                        {presenters.map((presenter) => (
                          <option key={presenter} value={presenter}>{presenter}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Format filter */}
                    <div>
                      <label htmlFor="format-filter" className="block text-sm font-medium mb-2 text-white/80 flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1.5 text-lbd-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                        Format
                      </label>
                      <select
                        id="format-filter"
                        className="w-full bg-black border border-white/20 rounded-md p-2.5 text-white focus:border-lbd-pink hover:border-lbd-pink/50 transition-colors"
                        value={selectedFormat}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                      >
                        <option value="">All Formats</option>
                        {formats.map((format) => (
                          <option key={format} value={format}>{format}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Date filter */}
                    <div>
                      <label htmlFor="start-date" className="block text-sm font-medium mb-2 text-white/80 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-lbd-pink" />
                        Event Date
                      </label>
                      <Input
                        id="start-date"
                        type="date"
                        className="bg-black border border-white/20 text-white focus:border-lbd-pink hover:border-lbd-pink/50 transition-colors p-2.5"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Select a date"
                      />
                    </div>
                    
                    {/* Search input */}
                    <div>
                      <label htmlFor="filter-search" className="block text-sm font-medium mb-2 text-white/80 flex items-center">
                        <Search className="w-3.5 h-3.5 mr-1.5 text-lbd-pink" />
                        Search Events
                      </label>
                      <div className="relative">
                        <Input 
                          id="filter-search"
                          type="search" 
                          placeholder="Search by title, presenter..." 
                          className="bg-black border border-white/20 text-white focus:border-lbd-pink hover:border-lbd-pink/50 transition-colors pl-9 p-2.5"
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={15} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col gap-3">
                    <Button 
                      className="bg-lbd-pink hover:bg-lbd-pink/90 text-white w-full"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </Button>
                    {(searchQuery || selectedPresenter || selectedFormat || startDate) && (
                      <Button 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10 transition-colors w-full"
                        onClick={clearFilters}
                      >
                        Reset All Filters
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Loading state */}
            {loading ? (
              <div className="flex flex-col justify-center items-center py-20">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/10"></div>
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-lbd-pink absolute top-0 left-0"></div>
                </div>
                <p className="mt-4 text-white/70 text-sm animate-pulse">Loading events...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 px-6 bg-black/30 rounded-xl border border-white/10 shadow-lg">
                <div className="max-w-md mx-auto">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 mb-5">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Events Found</h3>
                  <p className="text-white/70 mb-6">{error || "No events match your current filter criteria. Try adjusting your filters or search term."}</p>
                  <Button 
                    variant="outline" 
                    className="border-lbd-pink text-lbd-pink hover:bg-lbd-pink hover:text-white transition-all duration-200"
                    onClick={clearFilters}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear Filters & Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {sortEvents(events).map((event) => (
                <Card 
                  key={event.id} 
                  className="bg-gradient-to-b from-black to-black/95 border border-white/10 hover:border-lbd-pink/50 transition-all duration-300 overflow-hidden group shadow-lg shadow-lbd-pink/5 hover:shadow-lbd-pink/10 rounded-xl"
                  role="article"
                  aria-labelledby={`event-title-${event.id}`}
                >
                  <div className="relative h-44 overflow-hidden rounded-t-xl">
                    {event.image ? (
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${event.image})` }}
                        aria-hidden="true"
                      >
                        {/* Darker overlay for better text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-lbd-pink/20 to-blue-900/20"></div>
                    )}
                    
                    {/* Date badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="flex items-center bg-lbd-pink/90 text-white px-2.5 py-1 rounded-full shadow-lg" aria-label="Event date and time">
                        <Calendar className="w-3 h-3 mr-1" aria-hidden="true" />
                        <span className="text-xs font-medium">{event.date}</span>
                        <span className="mx-1">•</span>
                        <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
                        <span className="text-xs font-medium">{event.time}</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-4 z-10 w-full">
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
                      {event.description && (
                        <div className="col-span-2 bg-white/5 p-2 rounded-lg mt-1">
                          <p className="text-white/70 mb-1 font-medium text-xs uppercase tracking-wider">Description</p>
                          <p className="font-semibold text-white text-xs">{event.description}</p>
                        </div>
                      )}
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
            </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
