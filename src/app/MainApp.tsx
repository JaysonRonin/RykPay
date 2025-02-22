import { useColorScheme } from '@/hooks/useColorScheme';
import RouteKeys from '@/navigator/RouteKeys';
import TabNavigator from '@/navigator/TabNavigator';
import { RouteParamsList } from '@/navigator/typings/types';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function MainApp(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    /* eslint-disable @typescript-eslint/no-require-imports */
    /* eslint-disable global-require */
    Poppins: require('@assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const Stack = createStackNavigator<RouteParamsList>();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={RouteKeys.HOME}>
          <Stack.Screen name={RouteKeys.HOME} component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
