import { Header } from '@/components/ui/Header';
import { Colors } from '@/constants';
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
          headerStyle: {
            color: Colors.light.primary,
          },
          headerTitle: Header,
        }}
      />
    </Stack.Navigator>
  );
}
