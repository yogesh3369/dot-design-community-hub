
import { supabase } from '@/lib/supabase';

export interface Event {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  presenter: string;
  duration: number; // in minutes
  format: string;
  image_path?: string;
  location?: string;
  max_attendees?: number;
  is_featured?: boolean;
  // New pricing fields
  price?: number;
  original_price?: number;
  discount_percentage?: number;
  available_seats?: number;
  created_at?: string;
  updated_at?: string;
}

export interface EventUI {
  id: string;
  title: string;
  date: string;
  time: string;
  presenter: string;
  duration: string;
  format: string;
  image?: string;
  description?: string;
  // New UI pricing fields
  price?: string;
  originalPrice?: string;
  discount?: string;
  seats?: string;
}

/**
 * Formats a date string from Supabase into a user-friendly format
 */
const formatEventDate = (dateString: string): { date: string; time: string } => {
  const date = new Date(dateString);
  
  // Format date as "Month Day, Year"
  const dateFormatted = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Format time as "h:mm AM/PM"
  const timeFormatted = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return { date: dateFormatted, time: timeFormatted };
};

/**
 * Maps a Supabase event to the UI event format
 */
const mapEventToUI = (event: Event): EventUI => {
  const { date, time } = formatEventDate(event.start_date);
  
  // Format pricing
  const price = event.price ? `₹${event.price}` : undefined;
  const originalPrice = event.original_price ? `₹${event.original_price}` : undefined;
  const discount = event.discount_percentage ? `${event.discount_percentage}% OFF` : undefined;
  const seats = event.available_seats ? `${event.available_seats} left` : undefined;
  
  return {
    id: event.id,
    title: event.title,
    date,
    time,
    presenter: event.presenter,
    duration: `${event.duration} minutes`,
    format: event.format,
    image: event.image_path,
    description: event.description,
    price,
    originalPrice,
    discount,
    seats
  };
};

export interface EventFilters {
  search?: string;
  presenter?: string;
  format?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Fetches all events from Supabase with optional filtering
 */
export const getAllEvents = async (filters?: EventFilters, limit?: number): Promise<EventUI[]> => {
  try {
    let query = supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true });
    
    // Apply filters if provided
    if (filters) {
      // Filter by presenter
      if (filters.presenter) {
        query = query.ilike('presenter', `%${filters.presenter}%`);
      }
      
      // Filter by format
      if (filters.format) {
        query = query.ilike('format', `%${filters.format}%`);
      }
      
      // Filter by date range
      if (filters.startDate) {
        query = query.gte('start_date', filters.startDate);
      }
      
      if (filters.endDate) {
        query = query.lte('start_date', filters.endDate);
      }
      
      // Global search across multiple fields
      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,` +
          `description.ilike.%${filters.search}%,` +
          `presenter.ilike.%${filters.search}%,` +
          `format.ilike.%${filters.search}%`
        );
      }
    }
    
    // Apply limit if provided
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }
    
    return data.map(mapEventToUI);
  } catch (error) {
    console.error('Unexpected error fetching events:', error);
    return [];
  }
};

/**
 * Fetches featured events from Supabase
 */
export const getFeaturedEvents = async (limit: number = 3): Promise<EventUI[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_featured', true)
      .order('start_date', { ascending: true })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching featured events:', error);
      return [];
    }
    
    return data.map(mapEventToUI);
  } catch (error) {
    console.error('Unexpected error fetching featured events:', error);
    return [];
  }
};

/**
 * Fetches upcoming events from Supabase
 */
export const getUpcomingEvents = async (limit: number = 3): Promise<EventUI[]> => {
  try {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gt('start_date', now)
      .order('start_date', { ascending: true })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }
    
    return data.map(mapEventToUI);
  } catch (error) {
    console.error('Unexpected error fetching upcoming events:', error);
    return [];
  }
};

/**
 * Fetches a single event by ID
 */
export const getEventById = async (id: string): Promise<EventUI | null> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching event with id ${id}:`, error);
      return null;
    }
    
    return mapEventToUI(data);
  } catch (error) {
    console.error(`Unexpected error fetching event with id ${id}:`, error);
    return null;
  }
};

/**
 * Registers a user for an event
 */
export const registerForEvent = async (eventId: string, userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('event_attendees')
      .insert([
        { event_id: eventId, user_id: userId }
      ]);
    
    if (error) {
      console.error('Error registering for event:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error registering for event:', error);
    return false;
  }
};
