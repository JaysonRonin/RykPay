import Text from '@/components/ui/Text/Text';
import { memo } from 'react';

function Header(props: { children: React.JSX.Element }) {
  const { children } = props;
  return <Text variant="H2.BOLD">{children}</Text>;
}

export default memo(Header);
