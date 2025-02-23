import Text from '@/components/ui/Text/Text';

export function Header(props) {
  const { children } = props;
  return <Text variant="H2.BOLD">{children}</Text>;
}
