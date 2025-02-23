import { StyleSheet, View } from 'react-native';

import Divider from '@/components/ui/Divider/Divider';
import InputField from '@/components/ui/InputField/InputField';
import { Colors } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import RouteKeys from '@/navigator/RouteKeys';
import { ScreenProps } from '@/navigator/typings/types';
import Services from '@/services';
import { useWalletStore } from '@/stores/useWalletStore';
import { transferSchema } from '@/utils/validation';
import { Button, Spinner } from '@ui-kitten/components';
import { useCallback, useMemo, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '@/components/ui/Text/Text';

export default function PaymentTransferScreen({
  navigation,
}: ScreenProps<RouteKeys.PAYMENTS_TRANSFER>): React.JSX.Element {
  const [recipient, setRecipient] = useState<string>('');
  const [isRecipientError, setRecipientError] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [isAmountError, setAmountError] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [isNotesError, setNotesError] = useState<boolean>(false);
  const [appLoading, setAppLoading] = useState<boolean>(false);
  const { authenticate } = useAuth();
  const { balance, transfer } = useWalletStore();

  const [errors, setErrors] = useState<{ recipient?: string; amount?: string; notes?: string }>({});

  const handleTransfer = useCallback(async () => {
    setAppLoading(true);
    const isAuth = await authenticate();

    if (!isAuth) {
      setAppLoading(false);
      throw new Error('Authentication Failed');
    }
    try {
      const result = await Services.payment.transferFunds({
        amount: parseFloat(amount),
        recipient,
        notes,
      });
      setAppLoading(false);
      navigation.navigate(RouteKeys.PAYMENTS_CONFIRMATION, { result });
      transfer(parseFloat(amount), recipient);
      cleanField();
      return result;
    } catch (error: Error) {
      const err = error.message ?? '';
      cleanField();
      navigation.navigate(RouteKeys.PAYMENTS_FAILED, { error: err });
    }
    setAppLoading(false);
    cleanField();
    return null;
  }, [amount, authenticate, navigation, notes, recipient, transfer]);

  const preValidate = useCallback(() => {
    const parsedAmount = parseFloat(amount);

    const result = transferSchema.safeParse({
      recipient,
      amount: parsedAmount,
      notes,
    });

    if (!result.success) {
      const fieldErrors: { recipient?: string; amount?: string; notes?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'recipient') {
          setRecipientError(true);
          fieldErrors.recipient = err.message;
        }
        if (amount && err.path[0] === 'amount') {
          setAmountError(true);
          fieldErrors.amount = err.message;
        }
        if (notes && err.path[0] === 'note') {
          setNotesError(true);
          fieldErrors.notes = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    if (parsedAmount > balance) {
      setAmountError(true);
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: `Insufficient funds. Available balance: $${balance}`,
      }));
      return;
    }

    // Clear errors and proceed with the transfer
    setRecipientError(false);
    setAmountError(false);
    setNotesError(false);
    setErrors({});
    handleTransfer();
  }, [amount, recipient, notes, balance, handleTransfer]);

  const transferButton = useMemo(
    () => (
      <Button
        disabled={appLoading}
        onPress={preValidate}
        style={{ backgroundColor: Colors.light.primary }}
      >
        {appLoading ? <Spinner size="small" /> : 'Transfer'}
      </Button>
    ),
    [appLoading, preValidate],
  );

  const cleanField = () => {
    setRecipient('');
    setAmount('');
    setNotes('');
  };

  return (
    <SafeAreaView edges={['top']}>
      <KeyboardAwareScrollView bottomOffset={62} contentContainerStyle={styles.container}>
        <View>
          <Text variant="BODY.SEMI_BOLD">Current Balance</Text>
          <Text variant="H1.SEMI_BOLD">RM {balance}</Text>
          <Divider variant="GAP_1" />
          <InputField
            key="payment-transfer-input-recipient"
            variant="TEXT"
            label="Recipient"
            value={recipient}
            onChangeText={setRecipient}
            error={isRecipientError}
            errorText={errors.recipient}
          />
          <InputField
            key="payment-transfer-input-Amount"
            variant="TEXT"
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            error={isAmountError}
            errorText={errors.amount}
            keyboardType="numeric"
          />
          <InputField
            key="payment-transfer-input-notes"
            variant="TEXT"
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            error={isNotesError}
            errorText={errors.notes}
          />
          <Divider variant="GAP_1" />
          {transferButton}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
