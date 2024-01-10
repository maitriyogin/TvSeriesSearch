import React, {useReducer} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {enumToObject} from '../models/model-utils.ts';
import {ShowTypeEnum} from '../models/show-enums.ts';
import {ShowsInput} from '../models/shows.ts';
import {AppContextHandlers, useAppState} from '../state/app-context.tsx';
import {
  FilterContextHandlers,
  filterReducer,
  useFilterState,
} from '../state/filter-context.tsx';
import {FilterPicker} from './FilterPicker.tsx';

export const FilterContainer = () => {
  const {handlers, state} = useAppState();
  const {
    handlers: {updateFilterState},
    state: filterState,
  } = useFilterState();
  return (
    <Filter
      reset={updater => updater(filterState)}
      show={!!state.showFilter}
      onHideFilter={handlers.hideFilter}
      onApply={(state: ShowsInput) => updateFilterState(state)}
    />
  );
};

export const Filter = ({
  show,
  onHideFilter,
  onApply,
  reset,
}: {
  show: boolean;
  onHideFilter: AppContextHandlers['hideFilter'];
  onApply: FilterContextHandlers['updateFilterState'];
  reset: (update: (state: ShowsInput) => void) => void;
}) => {
  const [filterState, updateFilterState] = useReducer(filterReducer, {
    showType_enum: ShowTypeEnum.None,
  });
  return show ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            reset(updateFilterState);
            onHideFilter();
          }}>
          <Text style={styles.headerText}>Close</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchText}
            value={filterState.q}
            onChangeText={q => updateFilterState({q})}
          />
        </View>
      </View>
      <FilterPicker<ShowTypeEnum>
        items={ShowTypeEnum}
        selectedItem={filterState.showType_enum}
        setSelectedItem={showType_enum => {
          updateFilterState({
            showType_enum: showType_enum,
          });
        }}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            onApply(filterState);
            onHideFilter();
          }}>
          <Text style={styles.headerText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'absolute',
    marginTop: 140,
    marginBottom: 32,
    marginHorizontal: 16,
    height: 500,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'lightgreen',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'flex-end',
  },
  body: {
    backgroundColor: 'lightorange',
    flex: 1,
  },
  footer: {
    backgroundColor: 'green',
    padding: 4,
    alignSelf: 'flex-end',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchRow: {
    padding: 4,
  },
  searchText: {
    backgroundColor: 'red',
    height: 40,
    borderWidth: 1,
    padding: 4,
  },
});
