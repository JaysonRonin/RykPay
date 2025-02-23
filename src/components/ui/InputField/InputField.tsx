import { Colors } from '@/constants';
import fonts from '@assets/fonts';
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type ColorValue,
  type InputModeOptions,
  type KeyboardTypeOptions,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import Text from '../Text/Text';
import { IconSymbol } from '../icon/IconSymbol';
import TextInput from './TextInput';

export type InputVariant = 'TEXT' | 'TEXTAREA';

export interface InputOwnProps {
  /**
   * Input variant
   * @param {variant} ['TEXT']
   */
  variant?: InputVariant;
  label?: string;
  /**
   * if required = true, asterik will be shown beside the label text( eg. Label Text *). Default value is false
   */
  required?: boolean;
  /**
   * To show/hide tooltips icon. Default value is false
   */
  tooltips?: boolean;
  /**
   * Callback when tooltips icon is clicked
   */
  toolTipsOnClick?: () => void;
  /**
   * Color of the tooltip icon. Default semantic grey 500.
   */
  toolTipIconColor?: string;
  /**
   * Optional helper text
   */
  helpText?: string;
  /**
   * Display when the input text is empty
   */
  placeholder?: string;
  /**
   * Max length of input characters. Character count will be shown when maxLength is defined.
   */
  maxLength?: number;
  /**
   * Value of the input field
   */
  value: string;
  /**
   * Callback for text changes
   */
  onChangeText: (e: string) => void;
  /**
   * To disable text edit. Default value is false
   */
  disabled?: boolean;
  layoutStyle?: LayoutStyle;
  inputProps?: RNTextInputProps;
  /**
   * Indicates error for input field. Default value is false
   */
  error?: boolean;
  errorStyle?: ErrorStyle;
  /**
   * Error messages to be shown below the input field.
   */
  errorText?: string;
  selectionColor?: ColorValue;
  bookIcon?: boolean;
  /**
   * Callback for mobile input book icon
   */
  onBookIconClick?: () => void;
  /**
   *  To mask the value, only applies to PIN variant
   */
  isMaskedPin?: boolean;
  clearVariant?: 'Cross Icon' | 'Clear Text';
  keyboardType?: KeyboardTypeOptions;
  inputMode?: InputModeOptions;
  /**
   *  To enable clear icon
   */
  enableClear?: boolean;
  /**
   *  Callback when input is pressed
   */
  onInputPress?: () => void;
  /**
   *  Suffix icon on the right
   */
  suffixIcon?: ReactNode;
}

interface LayoutStyle {
  borderColor?: string;
  backgroundColor?: string;
}

interface ErrorStyle {
  justifyContent: 'center' | 'left' | 'right';
}

export type TTextInputRef = {
  focus: () => void;
  clear: () => void;
};

const InputField = forwardRef((props: InputOwnProps, ref) => {
  const {
    variant,
    label,
    required,
    tooltips,
    toolTipsOnClick,
    toolTipIconColor,
    helpText,
    placeholder,
    maxLength,
    value,
    onChangeText,
    disabled = false,
    layoutStyle,
    error,
    errorText,
    selectionColor,
    inputProps = {},
    enableClear = true,
    onInputPress,
    suffixIcon,
    keyboardType,
  } = props;
  const inputRef = useRef<RNTextInput>(null);
  const [isFocusing, setFocusing] = useState<boolean>(false);

  const onInputFocus = () => {
    setFocusing(true);
  };

  const onInputBlur = () => {
    setFocusing(false);
  };

  const focus = () => {
    inputRef.current?.focus();
  };

  const clear = () => {
    inputRef.current?.clear();
    onChangeText('');
  };

  useImperativeHandle(
    ref,
    (): TTextInputRef => ({
      focus,
      clear,
    }),
  );

  const renderInputVariant = () => {
    switch (variant) {
      case 'TEXT':
        return (
          <TextInput
            keyboardType={keyboardType}
            ref={inputRef}
            maxLength={maxLength}
            value={value}
            layoutStyle={layoutStyle}
            placeholder={placeholder}
            onChangeText={onChangeText}
            onInputFocus={onInputFocus}
            onInputBlur={onInputBlur}
            disabled={disabled}
            selectionColor={selectionColor}
            error={error}
            clear={clear}
            isFocusing={isFocusing}
            enableClear={enableClear}
            onInputPress={onInputPress}
            suffixIcon={suffixIcon}
            inputProps={inputProps}
          />
        );
      // case 'TEXTAREA':
      //   return (
      //     <TextAreaInput
      //       ref={inputRef}
      //       maxLength={maxLength}
      //       value={value}
      //       layoutStyle={layoutStyle}
      //       placeholder={placeholder}
      //       onChangeText={onChangeText}
      //       onInputFocus={onInputFocus}
      //       onInputBlur={onInputBlur}
      //       disabled={disabled}
      //       selectionColor={selectionColor}
      //       error={error}
      //       clear={clear}
      //       isFocusing={isFocusing}
      //       inputProps={inputProps}
      //     />
      //   );
      default:
        return (
          <TextInput
            ref={inputRef}
            maxLength={maxLength}
            value={value}
            layoutStyle={layoutStyle}
            placeholder={placeholder}
            onChangeText={onChangeText}
            onInputFocus={onInputFocus}
            onInputBlur={onInputBlur}
            disabled={disabled}
            selectionColor={selectionColor}
            error={error}
            clear={clear}
            isFocusing={isFocusing}
            enableClear={enableClear}
            onInputPress={onInputPress}
            suffixIcon={suffixIcon}
            inputProps={inputProps}
          />
        );
    }
  };

  const renderHelperContent = () => {
    if (error) {
      return (
        <View style={styles.helperContainer}>
          <View style={[styles.errorContainer]}>
            <IconSymbol
              name="envelope.arrow.triangle.branch"
              size={12}
              color={Colors.light.secondary}
            />
            <Text
              style={styles.errorText}
              variant="CAPTION.REGULAR"
              numberOfLines={2}
              color={Colors.light.primary}
            >
              {errorText}
            </Text>
          </View>
          {maxLength ?? (
            <View>
              <Text variant="CAPTION.REGULAR" numberOfLines={1} color={Colors.light.primary}>
                {value.length} / {maxLength}
              </Text>
            </View>
          )}
        </View>
      );
    }

    if ((helpText && helpText.length > 0) || maxLength != null) {
      return (
        <View style={styles.helperContainer}>
          <Text variant="CAPTION.REGULAR" numberOfLines={1} color={Colors.light.primary}>
            {helpText}
          </Text>
          {maxLength ?? (
            <View>
              <Text variant="CAPTION.REGULAR" numberOfLines={1} color={Colors.light.primary}>
                {value.length} / {maxLength}
              </Text>
            </View>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <TouchableWithoutFeedback onPress={focus} disabled={disabled}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text variant="CAPTION.REGULAR" numberOfLines={1} color={Colors.light.dark}>
            {required ? `${label} *` : label}
          </Text>
          {tooltips && (
            <TouchableOpacity
              style={styles.tooltipButton}
              onPress={toolTipsOnClick}
              testID="tooltip-icon"
            >
              <IconSymbol
                name="0.circle.hi"
                size={16}
                color={toolTipIconColor || Colors.light.secondary}
              />
            </TouchableOpacity>
          )}
        </View>
        {renderInputVariant()}
        {renderHelperContent()}
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  input: {
    letterSpacing: 0.2,
    width: '100%',
    paddingRight: 10 + 24,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.regular,
    color: Colors.light.dark,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    padding: 8,
    fontFamily: fonts.regular,
    color: Colors.light.secondary,
  },
  helperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    paddingLeft: 4,
  },
  tooltipButton: {
    marginLeft: 8,
  },
});

export default memo(InputField);
