/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Header, SearchScreen} from './src/components';
import {Body} from './src/components/Body.tsx';
import {ErrorContainer} from './src/components/Error.tsx';
import {SearchBarContainer} from './src/components/SearchBar.tsx';
import {SeriesDetailsContainer} from './src/components/SeriesDetails.tsx';
import {AppProvider} from './src/state/app-context.tsx';
import {FilterProvider} from './src/state/filter-context.tsx';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'lightgrey',
  };

  return (
    <AppProvider>
      <FilterProvider>
        <SafeAreaView style={[backgroundStyle, styles.container]}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Header>
            <SearchBarContainer />
          </Header>
          <ErrorContainer />
          <Body>
            <SearchScreen />
          </Body>
        </SafeAreaView>
        <SeriesDetailsContainer />
      </FilterProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
