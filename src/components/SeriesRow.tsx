import {StyleSheet, Text, View} from 'react-native';
import {Show, ShowWithScore} from '../models/shows.ts';

interface SeriesRowProps {
  item: ShowWithScore;
  index: number;
}
export const SeriesRow = ({item}: SeriesRowProps) => {
  return (
    <View key={item.show.id} style={styles.row}>
      <Text style={styles.nameText}>{item.show.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'green',
    flex: 1,
    flexDirection: 'row',
    padding: 4,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
