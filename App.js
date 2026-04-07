import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Client/src/navigation/AppNavigator';
import { AppProvider } from './Client/src/context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F3', // Cream background
  },
});
