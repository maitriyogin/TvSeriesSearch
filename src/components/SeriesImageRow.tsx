import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Show} from '../models/shows.ts';

interface SeriesCardProps {
  url: string;
  name: string;
  id: number;
  onSelect: () => void;
  onToggleFavourite: (id: number) => void;
  isFav: boolean;
}
const SeriesCard = ({
  url,
  name,
  onSelect,
  id,
  onToggleFavourite,
  isFav,
}: SeriesCardProps) => {
  return (
    <TouchableOpacity
      testID={`series-${id}`}
      style={imageCardStyles.cardWrapper}
      onPress={onSelect}>
      <View style={imageCardStyles.card}>
        {url && (
          <Image
            src={url}
            style={imageCardStyles.image}
            resizeMode={'contain'}
          />
        )}
        <View style={imageCardStyles.footer}>
          <View style={imageCardStyles.name}>
            <Text style={imageCardStyles.nameText} numberOfLines={3}>
              {name}
            </Text>
          </View>
          <View
            style={isFav ? imageCardStyles.favourite : imageCardStyles.likes}>
            <TouchableOpacity onPress={() => onToggleFavourite(id)}>
              {isFav ? <Text>Favourite</Text> : <Text>Like</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
interface SeriesRowProps {
  item: Show;
  onSelect: () => void;
  index: number;
  onToggleFavourite: (id: number) => void;
  isFav: boolean;
}
export const SeriesImageRow = ({
  item,
  onSelect,
  onToggleFavourite,
  isFav,
}: SeriesRowProps) => {
  return (
    <View key={item.id} style={styles.row}>
      <SeriesCard
        id={item?.id}
        url={item?.image?.medium}
        name={item?.name}
        onSelect={onSelect}
        onToggleFavourite={onToggleFavourite}
        isFav={isFav}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 4,
  },
  nameText: {
    fontSize: 12,
    fontWeight: '400',
  },
});
const imageCardStyles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'grey',
    width: 130,
  },
  footer: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  name: {
    flex: 1,
    padding: 4,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  likes: {
    flex: 1,
    padding: 4,
    height: 30,
  },
  favourite: {
    flex: 1,
    padding: 4,
    height: 30,
    backgroundColor: 'lightpink',
  },
  nameText: {
    fontSize: 12,
    fontWeight: '400',
    flexWrap: 'wrap',
  },
  image: {
    height: 182,
    width: 130,
  },
});
