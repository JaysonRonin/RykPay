import { IconSymbol } from '@/components/ui/icon/IconSymbol';
import TabBar from '@/components/ui/TabBar/TabBar';
import TYPOGRAPHY from '@/components/ui/Typography/Typography';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaymentStack from '@/navigator/PaymentStack';
import RouteKeys from './RouteKeys';
import { RouteParamsList } from './typings/types';

export type RootStackParamList = {
  ACCOUNTS: undefined;
  HOME: undefined;
  PAYMENTS_TAB: undefined;
};

type TabNameType = 'Home' | 'Accounts' | 'Payments';

const Tab = createBottomTabNavigator<RouteParamsList>();

const styles = StyleSheet.create({
  container: { flex: 1 },
  badgeContainer: {
    position: 'absolute',
    left: 10,
    bottom: 5,
    zIndex: 1000,
  },
});

export default function TabNavigator(): React.JSX.Element {
  const tabBarOptions = useCallback((props: BottomTabBarProps) => <TabBar {...props} />, []);
  const activeColor = useThemeColor({}, 'primary');
  const deactivateColor = useThemeColor({}, 'secondary');

  const generateTabIcon = useCallback(
    (isFocused: boolean, tabName: TabNameType): React.ReactNode => {
      const buttonColor = isFocused ? activeColor : deactivateColor;
      if (tabName === 'Home') {
        return (
          <IconSymbol
            size={22}
            color={buttonColor}
            name="chevron.left.forwardslash.chevron.right"
          />
        );
      }

      if (tabName === 'Accounts') {
        return (
          <IconSymbol
            size={22}
            color={buttonColor}
            name="chevron.left.forwardslash.chevron.right"
          />
        );
      }

      if (tabName === 'Payments') {
        return (
          <IconSymbol
            size={22}
            color={buttonColor}
            name="chevron.left.forwardslash.chevron.right"
          />
        );
      }

      return (
        <IconSymbol size={22} color={buttonColor} name="chevron.left.forwardslash.chevron.right" />
      );
    },
    [],
  );

  const paymentScreenOptions = useMemo(
    () => ({
      title: 'Payments',
      tabBarIcon: ({ focused }: { focused: boolean; color?: string; size?: number }) =>
        generateTabIcon(focused, 'Payments'),
    }),
    [],
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Tab.Navigator
        tabBar={tabBarOptions}
        screenOptions={{
          headerShown: false,
          lazy: true,
          headerTitleStyle: TYPOGRAPHY.H2.REGULAR,
        }}
      >
        {/* <Tab.Screen name={RouteKeys.HOME_TAB} component={HomeStack} options={homeScreenOptions} /> */}
        <Tab.Screen
          name={RouteKeys.PAYMENTS_TAB}
          component={PaymentStack}
          options={paymentScreenOptions}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
