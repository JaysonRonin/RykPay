import Header from '@/components/ui/Header/Header';
import { Colors } from '@/constants';
import PaymentConfirmationScreen from '@/screens/Payments/PaymentConfirmationScreen';
import PaymentErrorScreen from '@/screens/Payments/PaymentErrorScreen';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentTransferScreen from '../screens/Payments/PaymentTransferScreen';
import RouteKeys from './RouteKeys';
import { RouteParamsList } from './typings/types';

const Stack = createStackNavigator<RouteParamsList>();

export default function PaymentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteKeys.PAYMENTS_TRANSFER}
        component={PaymentTransferScreen}
        options={{
          title: 'Transfer',
          headerShown: true,
          headerTransparent: true,
          headerTitle: Header,
        }}
      />
      <Stack.Screen
        name={RouteKeys.PAYMENTS_FAILED}
        component={PaymentErrorScreen}
        options={{
          headerShown: false,
          headerTransparent: false,
          presentation: 'modal',
          headerBackTitleStyle: {
            color: Colors.light.primary,
          },
          headerTitle: Header,
        }}
      />
      <Stack.Screen
        name={RouteKeys.PAYMENTS_CONFIRMATION}
        component={PaymentConfirmationScreen}
        options={{
          headerShown: false,
          headerTransparent: false,
        }}
      />
    </Stack.Navigator>
  );
}
