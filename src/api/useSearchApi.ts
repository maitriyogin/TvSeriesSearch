import {useEffect, useState} from 'react';
import {ShowsInput, ShowWithScore} from '../models/shows.ts';
import {searchShows} from './search-shows.ts';

interface SearchApiProps {
  showsInput: ShowsInput;
}

export const useSearchApi = ({showsInput}: SearchApiProps) => {
  const [shows, setShows] = useState<ShowWithScore[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [url, setUrl] = useState<string>('');
  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      const {url, shows} = await searchShows(showsInput);
      setShows(shows);
      setUrl(url);
      setLoading(false);
    };
    fetchShows().catch(e => setError(e.message));
  }, [showsInput]);
  return {shows, loading, error};
};
