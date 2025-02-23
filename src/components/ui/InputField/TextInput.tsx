import React, { forwardRef, memo, useMemo } from 'react';
import {
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Colors } from '@/constants';
import { IconSymbol } from '../icon/IconSymbol';
import type { InputOwnProps } from './InputField';
import TYPOGRAPHY from '../Typography/Typography';

interface TextInputOwnProps {
  onInputFocus: () => void;
  onInputBlur: () => void;
  inputProps?: RNTextInputProps;
  isFocusing: boolean;
  clear: () => void;
}

type TextInputProps = InputOwnProps & TextInputOwnProps;

const TextInput = forwardRef<RNTextInput, TextInputProps>((props, _ref) => {
  const {
    maxLength,
    value,
    onChangeText,
    disabled = false,
    onInputFocus,
    onInputBlur,
    placeholder,
    layoutStyle,
    isFocusing,
    inputProps = {},
    clear,
    selectionColor,
    enableClear,
    onInputPress,
    suffixIcon,
    keyboardType,
  } = props;

  const combinedInputContainerStyle = useMemo(() => {
    // eslint-disable-next-line no-underscore-dangle
    const _styles = { ...styles.inputLayout };

    _styles.borderColor = Colors.light.secondary;

    if (isFocusing) {
      _styles.borderColor = Colors.light.primary;
    }

    if (disabled) {
      _styles.borderColor = Colors.light.secondary;
      _styles.backgroundColor = Colors.light.white;
    }

    if (layoutStyle && layoutStyle.borderColor) {
      _styles.borderColor = layoutStyle.borderColor;
    }

    if (layoutStyle && layoutStyle.backgroundColor) {
      _styles.backgroundColor = layoutStyle.backgroundColor;
    }

    return _styles;
  }, [layoutStyle, isFocusing, disabled]);

  const renderSuffixIcon = () => {
    if (suffixIcon) {
      return suffixIcon;
    }
    if (value.length > 0 && isFocusing && enableClear) {
      return (
        <TouchableOpacity
          disabled={disabled}
          style={styles.clearButton}
          hitSlop={15}
          onPress={() => {
            clear();
          }}
        >
          <IconSymbol name="minus.circle.fill" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <TouchableWithoutFeedback onFocus={onInputFocus} onPress={onInputPress}>
      <View style={combinedInputContainerStyle}>
        <RNTextInput
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType={keyboardType ?? 'default'}
          style={styles.input}
          ref={_ref}
          maxLength={maxLength}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          editable={!disabled}
          onPressIn={onInputPress}
          selectionColor={selectionColor ?? Colors.light.secondary}
          {...inputProps}
        />
        {renderSuffixIcon()}
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  inputLayout: {
    height: 56,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.secondary,
    backgroundColor: Colors.light.white,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  input: {
    letterSpacing: 0.2,
    width: '100%',
    paddingRight: 10 + 24,
    color: Colors.light.dark,
    ...TYPOGRAPHY.BODY.BOLD,
  },
  clearButton: {
    position: 'absolute',
    right: 20,
    top: 16,
  },
});

export default memo(TextInput);
