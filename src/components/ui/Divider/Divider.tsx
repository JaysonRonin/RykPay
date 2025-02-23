import { Divider as UIDivider } from '@ui-kitten/components';
import { StyleSheet, ViewProps } from 'react-native';

export type DividerVariant = 'GAP_1' | 'GAP_3' | 'GAP_6' | 'GAP_9';

export interface TDivider extends ViewProps {
  variant: DividerVariant;
}

function Divider(props: TDivider) {
  const { variant } = props;
  return <UIDivider style={styles[variant]} />;
}

export default Divider;

const styles = StyleSheet.create({
  GAP_1: {
    height: 10,
  },
  GAP_3: {
    height: 20,
  },
  GAP_6: {
    height: 30,
  },
  GAP_9: {
    height: 40,
  },
});
