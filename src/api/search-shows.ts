import {Show, ShowsInput, ShowsOutput, ShowWithScore} from '../models/shows.ts';
import {buildUrl} from './api-utils.ts';

const TV_URL_SEARCH = 'https://api.tvmaze.com/search/shows';
const TV_URL_SHOWS = 'https://api.tvmaze.com/shows';

export const searchShows = async (params: ShowsInput): Promise<ShowsOutput> => {
  const url = buildUrl(TV_URL_SEARCH, params);
  try {
    const results = await fetch(url);
    const shows: ShowWithScore[] = await results.json();
    return {url, shows: shows.map(s => s.show)};
  } catch (error) {
    return {
      url,
      shows: [],
      error:
        (error as unknown as {message: string})?.message || (error as string),
    };
  }
};
export const pageShows = async (params: ShowsInput): Promise<ShowsOutput> => {
  const url = buildUrl(TV_URL_SHOWS, params);
  try {
    const results = await fetch(url);
    const shows: Show[] = await results.json();
    return {url, shows, error: undefined};
  } catch (error) {
    return {
      url,
      shows: [],
      error:
        (error as unknown as {message: string})?.message || (error as string),
    };
  }
};
