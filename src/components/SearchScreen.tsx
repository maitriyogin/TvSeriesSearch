import React from 'react';
import {FlatList} from 'react-native';
import {useSearchApiContainer} from '../api/useSearchApi.ts';
import {Show} from '../models/shows.ts';
import {useAppState} from '../state/app-context.tsx';
import {useFilterState} from '../state/filter-context.tsx';
import {isEmpty} from '../utils/utils.ts';
import {SeriesImageRow} from './SeriesImageRow.tsx';

export const SearchScreen = () => {
  useSearchApiContainer();
  const {handlers, state} = useAppState();
  const {
    handlers: {incPage},
    state: {q},
  } = useFilterState();
  return (
    <FlatList<Show>
      data={state.shows}
      numColumns={2}
      onEndReachedThreshold={0.1}
      onEndReached={() => {
        if (!state.loading && isEmpty(q)) {
          incPage();
        }
      }}
      renderItem={({item, index}) => (
        <SeriesImageRow
          item={item}
          index={index}
          onSelect={() => handlers.gotoDetails(item)}
          isFav={!!state.favourites?.includes(item?.id)}
          onToggleFavourite={handlers.toggleFavorite}
        />
      )}
    />
  );
};
