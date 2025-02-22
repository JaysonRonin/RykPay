import { Colors } from '@/constants';
import React from 'react';
import {
  Text as RNText,
  type TextProps as RNTextProps,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import TYPOGRAPHY, { TextVariant } from '../Typography/Typography';

export interface TextOwnProps {
  /**
   * Typography.
   * @param {TYPOGRAPHY} [H1.REGULAR] TYPOGRAPHY
   */
  variant: TextVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
}

type TypographyKeys = keyof typeof TYPOGRAPHY;
type SubVariantKeys<T extends TypographyKeys> = keyof (typeof TYPOGRAPHY)[T];

type TextProps = TextOwnProps & RNTextProps;

export default function Text({
  color = Colors.light.dark,
  variant,
  children,
  style,
  ...textProps
}: TextProps): JSX.Element {
  const [mainVariant, subVariant] = variant.split('.') as [TypographyKeys, string];
  const textStyle: TextStyle =
    TYPOGRAPHY[mainVariant][subVariant as SubVariantKeys<TypographyKeys>];

  const newTypeProps = {
    ...textProps,
    ...{ allowFontScaling: false },
  };

  return (
    <RNText style={[textStyle, { color }, style]} {...newTypeProps}>
      {children}
    </RNText>
  );
}
