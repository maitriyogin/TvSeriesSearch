import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {Show} from '../models/shows.ts';
import {useAppState} from '../state/app-context.tsx';
import {Dimensions} from 'react-native';
export const SeriesDetailsContainer = () => {
  const {handlers, state} = useAppState();
  return (
    <SeriesDetails
      show={!!state.showDetails}
      onHide={handlers.hideDetails}
      theShow={state.show}
    />
  );
};
const InfoRow = ({
  label,
  value,
  col,
}: {
  label: string;
  value: string | number;
  col?: boolean;
}) => (
  <View
    style={[styles.imageInfoRow, {...(col ? {flexDirection: 'column'} : {})}]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoText}>{value}</Text>
  </View>
);

interface SeriesDetailsProps {
  theShow?: Show;
  show: boolean;
  onHide: () => void;
}
const SeriesDetails = ({show, onHide, theShow}: SeriesDetailsProps) => {
  const windowWidth = Dimensions.get('window').width - 32;
  const windowHeight = Dimensions.get('window').height - 96;
  return show ? (
    <View
      testID={'detailsScreen'}
      style={[styles.container, {height: windowHeight, width: windowWidth}]}>
      <Text style={styles.title}>{theShow?.name}</Text>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.imageInfoContainer}>
            <Image
              src={theShow?.image?.medium}
              style={styles.image}
              resizeMode={'contain'}
            />
            <View style={styles.infoContainer}>
              <InfoRow
                label={'Ratings'}
                value={theShow?.rating?.average ?? ''}
              />
              <InfoRow
                label={'Average Runtime'}
                value={theShow?.averageRuntime ?? ''}
              />
              <InfoRow label={'Status'} value={theShow?.status ?? ''} />
              <InfoRow label={'Show Type'} value={theShow?.type ?? ''} />
              <InfoRow
                col
                label={'Genres'}
                value={theShow?.genres?.reduce((a, v) => `${a}${v} `, '') ?? ''}
              />
            </View>
          </View>
          <RenderHTML
            contentWidth={windowWidth}
            source={{html: theShow?.summary ?? ''}}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          testID={'details-close'}
          onPress={() => {
            onHide();
          }}>
          <Text style={styles.headerText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 16,
    justifyContent: 'space-between',
    position: 'absolute',
    marginTop: 64,
    marginBottom: 0,
    marginHorizontal: 16,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'grey',
    zIndex: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  body: {
    backgroundColor: 'lightorange',
    flex: 1,
    justifyContent: 'flex-start',
  },
  footer: {
    alignSelf: 'flex-end',
  },
  headerText: {
    alignSelf: 'flex-end',
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '400',
  },
  image: {
    height: 252,
    width: 180,
  },
  imageInfoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  imageInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
});
