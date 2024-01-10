import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons/faFilter';
import {useAppState} from '../state/app-context.tsx';

export const Header = () => (
  <View style={styles.container}>
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>Tv Series Search</Text>
      <FilterButtonContainer />
    </View>
  </View>
);

const FilterButtonContainer = () => {
  const {handlers} = useAppState();
  return <FilterButton onShowFilter={handlers.showFilter} />;
};
const FilterButton = ({onShowFilter}: {onShowFilter: () => void}) => (
  <TouchableOpacity style={styles.icon} onPress={onShowFilter}>
    <FontAwesomeIcon icon={faFilter} />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'lightgrey',
    marginTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  icon: {
    flex: 0.1,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  headerTitle: {
    flex: 1,
    fontSize: 32,
    fontWeight: '600',
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
});
