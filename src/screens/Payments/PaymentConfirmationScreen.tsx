import Divider from '@/components/ui/Divider';
import Text from '@/components/ui/Text/Text';
import { Colors } from '@/constants';
import RouteKeys from '@/navigator/RouteKeys';
import { ScreenProps } from '@/navigator/typings/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentConfirmationScreen({
  navigation,
  route,
}: ScreenProps<RouteKeys.PAYMENTS_CONFIRMATION>): React.JSX.Element {
  const { result } = route.params;

  const dismissConfirmation = () => {
    navigation.popTo(RouteKeys.PAYMENTS_TRANSFER);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.cardContainer}>
        <MaterialIcons color={Colors.light.primary} size={64} name="check" />
        <Divider variant="GAP_3" />
        <Text variant="H2.SEMI_BOLD">Transfer Successful</Text>
        <Divider variant="GAP_1" />
        <Text variant="BODY.REGULAR">Recipient:</Text>
        <Text variant="BODY.SEMI_BOLD">{`${result.recipient}`}</Text>
        <Divider variant="GAP_1" />
        <Text variant="BODY.REGULAR">Transaction ID</Text>
        <Text variant="BODY.SEMI_BOLD">{`${result.transactionId}`}</Text>
        <Divider variant="GAP_1" />
        <Text variant="BODY.REGULAR">Amount:</Text>
        <Text variant="BODY.SEMI_BOLD">{`RM ${result.amount}`}</Text>
        <Divider variant="GAP_1" />
        <Text variant="CAPTION.REGULAR">{`Notes: ${result.description}`}</Text>
        <Divider variant="GAP_6" />
        <Button onPress={dismissConfirmation} style={{ backgroundColor: Colors.light.primary }}>
          <Text variant="BODY.REGULAR">Home</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: Colors.light.secondary,
  },
});
