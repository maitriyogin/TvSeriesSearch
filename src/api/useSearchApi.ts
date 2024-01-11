import {useEffect} from 'react';
import {useAppState} from '../state/app-context.tsx';
import {useFilterState} from '../state/filter-context.tsx';
import {usePrevious} from '../utils/hook-utils.tsx';
import {isEmpty} from '../utils/utils.ts';
import {pageShows, searchShows} from './search-shows.ts';

export const useSearchApiContainer = () => {
  useSearchApi(pageShows, searchShows);
};
export const useSearchApi = (
  _pageShows: typeof pageShows,
  _searchShows: typeof searchShows,
) => {
  const {
    state,
    handlers: {setLoading, setError, setShows},
  } = useAppState();
  const {state: showsInput} = useFilterState();
  const previousInput = usePrevious(showsInput);
  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      if (isEmpty(showsInput.q)) {
        const res = await _pageShows(showsInput);
        if (showsInput.page === 1) {
          res?.shows && setShows(res?.shows);
        } else {
          res?.shows && setShows([...(state?.shows ?? []), ...res?.shows]);
        }
      } else {
        const res = await _searchShows(showsInput);
        res?.shows && setShows(res?.shows);
      }
      setLoading(false);
    };
    if (showsInput && showsInput !== previousInput)
      fetchShows().catch(e => setError(e.message ? e.message : e));
  }, [
    setError,
    setLoading,
    setShows,
    state?.shows,
    previousInput,
    showsInput,
    _pageShows,
    _searchShows,
  ]);
  return {};
};
