import fonts from '@assets/fonts';
import { StyleSheet } from 'react-native';

export type TextVariant =
  | 'H1.REGULAR'
  | 'H1.Medium'
  | 'H1.SEMI_BOLD'
  | 'H1.BOLD'
  | 'H2.REGULAR'
  | 'H2.Medium'
  | 'H2.SEMI_BOLD'
  | 'H2.BOLD'
  | 'BODY.REGULAR'
  | 'BODY.Medium'
  | 'BODY.SEMI_BOLD'
  | 'BODY.BOLD';

const TYPOGRAPHY = {
  H1: StyleSheet.create({
    REGULAR: {
      fontFamily: fonts.regular,
      lineHeight: 40,
      fontSize: 32,
    },
    Medium: {
      fontFamily: fonts.medium,
      lineHeight: 40,
      fontSize: 32,
    },
    SEMI_BOLD: {
      fontFamily: fonts.semiBold,
      lineHeight: 40,
      fontSize: 32,
    },
    BOLD: {
      fontFamily: fonts.bold,
      lineHeight: 40,
      fontSize: 32,
    },
  }),
  H2: StyleSheet.create({
    REGULAR: {
      fontFamily: fonts.regular,
      lineHeight: 28,
      fontSize: 20,
    },
    Medium: {
      fontFamily: fonts.medium,
      lineHeight: 28,
      fontSize: 20,
    },
    SEMI_BOLD: {
      fontFamily: fonts.semiBold,
      lineHeight: 28,
      fontSize: 20,
    },
    BOLD: {
      fontFamily: fonts.bold,
      lineHeight: 28,
      fontSize: 20,
    },
  }),
  BODY: StyleSheet.create({
    REGULAR: {
      fontFamily: fonts.regular,
      lineHeight: 24,
      fontSize: 16,
    },
    Medium: {
      fontFamily: fonts.medium,
      lineHeight: 24,
      fontSize: 16,
    },
    SEMI_BOLD: {
      fontFamily: fonts.semiBold,
      lineHeight: 24,
      fontSize: 16,
    },
    BOLD: {
      fontFamily: fonts.bold,
      lineHeight: 24,
      fontSize: 16,
    },
  }),
};

export default TYPOGRAPHY;
