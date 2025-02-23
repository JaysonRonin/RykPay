import { useColorScheme } from '@/hooks/useColorScheme';
import RouteKeys from '@/navigator/RouteKeys';
import TabNavigator from '@/navigator/TabNavigator';
import { RouteParamsList } from '@/navigator/typings/types';
import * as eva from '@eva-design/eva';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function MainApp(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    /* eslint-disable @typescript-eslint/no-require-imports */
    /* eslint-disable global-require */
    'Poppins-Bold': require('@assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('@assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('@assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('@assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const Stack = createStackNavigator<RouteParamsList>();

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <KeyboardProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName={RouteKeys.HOME}
            >
              <Stack.Screen name={RouteKeys.HOME} component={TabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </KeyboardProvider>
      </ThemeProvider>
    </ApplicationProvider>
  );
}
