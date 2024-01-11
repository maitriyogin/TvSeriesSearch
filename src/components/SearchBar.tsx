import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {ShowsInput} from '../models/shows.ts';
import {
  FilterContextHandlers,
  useFilterState,
} from '../state/filter-context.tsx';

export const SearchBarContainer = () => {
  const {
    handlers: {updateFilterState},
    state,
  } = useFilterState();
  return (
    <SearchBar
      onApply={(state: ShowsInput) => updateFilterState(state)}
      q={state.q}
    />
  );
};
interface SearchBarProps {
  onApply: FilterContextHandlers['updateFilterState'];
  q?: string;
}
export const SearchBar = ({onApply, q}: SearchBarProps) => {
  const [_q, updateFilterState] = useState(q);
  return (
    <View style={styles.searchRow}>
      <TextInput
        testID={'searchInput'}
        style={styles.searchText}
        value={_q}
        onChangeText={q => updateFilterState(q)}
        onSubmitEditing={() => onApply({q: _q})}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchRow: {
    padding: 4,
  },
  searchText: {
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: 'white',
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});
