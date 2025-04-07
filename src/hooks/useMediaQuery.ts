import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state with the current value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Create a listener function
    const listener = () => {
      setMatches(media.matches);
    };
    
    // Attach the listener to know when the matches value changes
    media.addEventListener('change', listener);
    
    // Remove the listener when the hook is unmounted
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [matches, query]);
  
  return matches;
}
