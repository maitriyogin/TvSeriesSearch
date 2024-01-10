import {useSearchApi} from '../api/useSearchApi.ts';
import {useFilterState} from '../state/filter-context.tsx';

export const useSearchApiWithFilter = () => {
  const {state} = useFilterState();
  return useSearchApi({showsInput: state});
};
