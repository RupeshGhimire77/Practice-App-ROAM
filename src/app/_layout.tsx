import { StyleSheet } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RentalProvider } from '../features/rentals/rental-context';

export default function RootLayout() {

  const screenOptions ={
    headerShown: false,
    contentStyle: styles.screen,
  };
  return (
    <RentalProvider>
      <StatusBar  style='dark'/>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="(tabs)"/>
          <Stack.Screen name="car/[id]" options={{ presentation: 'card'}}/>
          <Stack.Screen name="checkout/[id]" options={{ presentation: 'modal'}}/>
          <Stack.Screen name="booking-confirmed/[id]" options={{ presentation: 'card' }} />
      </Stack>
      {/* <Slot /> */}
    </RentalProvider>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F7F8FA' },
});
