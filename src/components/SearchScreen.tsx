import {FlatList} from 'react-native';
import {useSearchApi} from '../api/useSearchApi.ts';
import {useSearchApiWithFilter} from '../hooks/useSearchApiWithFilter.tsx';
import {ShowWithScore} from '../models/shows.ts';
import {SeriesRow} from './SeriesRow.tsx';

export const SearchScreen = () => {
  const {shows} = useSearchApiWithFilter();
  return (
    <FlatList<ShowWithScore>
      style={{backgroundColor: 'red', flex: 1}}
      data={shows}
      renderItem={SeriesRow}
    />
  );
};
