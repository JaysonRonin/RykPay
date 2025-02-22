import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants';
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
          headerLeft: () => (
            <IconSymbol name="left.circle" size={24} color={Colors.light.primary} />
          ),
          headerShown: true,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
