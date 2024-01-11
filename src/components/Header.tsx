import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Header = ({children}: React.PropsWithChildren) => (
  <View style={styles.container}>
    <Text style={styles.headerTitle}>Tv Series Search</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 84,
    backgroundColor: 'lightgrey',
    marginTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 24,
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
    alignSelf: 'center',
    marginBottom: 4,
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
});
