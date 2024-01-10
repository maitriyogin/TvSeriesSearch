import {StyleSheet, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const Body = ({children}: React.PropsWithChildren) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        },
      ]}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});
