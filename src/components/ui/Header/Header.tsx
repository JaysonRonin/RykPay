import Text from '@/components/ui/Text/Text';
import { memo } from 'react';

function Header(props) {
  const { children } = props;
  return <Text variant="H2.BOLD">{children}</Text>;
}

export default memo(Header);
