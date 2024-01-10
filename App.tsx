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
import {Filter, FilterContainer} from './src/components/Filter.tsx';
import {AppProvider} from './src/state/app-context.tsx';
import {FilterContext, FilterProvider} from './src/state/filter-context.tsx';

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
          <Header />
          <Body>
            <SearchScreen />
          </Body>
          <FilterContainer />
        </SafeAreaView>
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
