import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppState} from '../state/app-context.tsx';
import {isEmpty} from '../utils/utils.ts';

export const ErrorContainer = () => {
  const {
    state: {error},
    handlers: {setError},
  } = useAppState();
  return <Error message={error} onDismiss={() => setError(undefined)} />;
};
export const Error = ({
  message,
  onDismiss,
}: {
  message?: string;
  onDismiss: () => void;
}) => {
  return !isEmpty(message) ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Error</Text>
        <TouchableOpacity onPress={onDismiss} testID={'error-dismiss'}>
          <Text style={styles.headerText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>{message}</Text>
      </View>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'orange',
    height: 80,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  body: {
    backgroundColor: 'lightorange',
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerText: {
    alignSelf: 'flex-end',
    fontSize: 20,
    fontWeight: '600',
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
