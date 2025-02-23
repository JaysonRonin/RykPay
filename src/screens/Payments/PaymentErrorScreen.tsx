import { Button } from '@ui-kitten/components';
import Text from '@/components/ui/Text/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenProps } from '@/navigator/typings/types';
import RouteKeys from '@/navigator/RouteKeys';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Divider from '@/components/ui/Divider';

export default function PaymentErrorScreen({
  navigation,
  route,
}: ScreenProps<RouteKeys.PAYMENTS_FAILED>): React.JSX.Element {
  const { error } = route.params;

  const dismissModal = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <MaterialIcons color={Colors.light.primary} size={64} name="error-outline" />
      <Divider variant="GAP_6" />
      <Text variant="H2.SEMI_BOLD">Transfer Failed</Text>
      <Divider variant="GAP_1" />
      <Text variant="BODY.REGULAR">
        Please try again. Contact our services center 03-11221111, Sorry for inconvenience.
      </Text>
      <Text variant="CAPTION.REGULAR">{`Error: ${error ?? ''}`}</Text>
      <Divider variant="GAP_6" />
      <Button onPress={dismissModal} style={{ backgroundColor: Colors.light.primary }}>
        <Text variant="BODY.REGULAR">Back</Text>
      </Button>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
});
