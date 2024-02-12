import { Feather } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { Icon, IconElement, Input, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  NativeTouchEvent
} from 'react-native'

interface InputFieldProps {
  placeholder?: string
  required?: boolean
  value?: string
  displayValue?: string
  hintText?: string
  errorMessage?: string
  obfuscate?: boolean
  editable?: boolean
  keyboardType?: KeyboardTypeOptions
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  preventKeyboard?: boolean
  onChange?(text: string): void
  onTouch?(event: NativeSyntheticEvent<NativeTouchEvent>): void
}

export const InputField = (props: InputFieldProps) => {
  const [touched, setTouched] = useState(false)
  const [isError, setIsError] = useState(false)
  const [secureTextEntry, setSecureTextEntry] = useState(props.obfuscate || false)
  const [defaultValue, setDefaultValue] = useState(props.value)
  const styles = useStyleSheet(themedStyles)
  const theme = useTheme()

  useFocusEffect(
    useCallback(() => {
      setTouched(false)
    }, [])
  )

  useEffect(() => {
    setDefaultValue(props.value)
  }, [])

  useEffect(() => {
    if (props.displayValue) {
      setDefaultValue(props.displayValue)
    }
  }, [props.displayValue])

  useEffect(() => {
    setIsError(!!(touched && props.errorMessage))
  }, [touched, props.errorMessage])

  const renderIcon = (props: any): ReactElement => (
    <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  )

  const errorMessage = () => {
    if (isError) {
      return props.errorMessage
    }
    return ''
  }

  const AlertIcon = (): IconElement => (
    <Feather
      style={themedStyles.captionIcon}
      name="alert-circle"
      size={10}
      color={isError ? theme['color-danger-500'] : 'black'}
    />
  )

  const renderCaption = (): ReactElement => {
    return (
      <View style={styles.captionContainer}>
        <AlertIcon />
        <Text style={[styles.captionText, !!isError && styles.errorText]}>
          {isError ? errorMessage() : props.hintText}
        </Text>
      </View>
    )
  }

  const placeHolder = props.required ? `${props.placeholder}*` : props.placeholder

  return (
    <Input
      defaultValue={defaultValue}
      label={props.displayValue || props.value ? props.placeholder : ''}
      placeholder={placeHolder}
      caption={props.hintText || isError ? renderCaption : ' '}
      accessoryRight={props.obfuscate ? renderIcon : <></>}
      secureTextEntry={secureTextEntry}
      onChangeText={props.onChange}
      onPressIn={(event) => props.onTouch && props.onTouch(event)}
      onBlur={() => setTouched(true)}
      status={isError ? 'danger' : 'basic'}
      keyboardType={props.keyboardType || 'default'}
      autoCapitalize={props.autoCapitalize}
      editable={props.editable !== undefined ? props.editable : true}
      showSoftInputOnFocus={!props.preventKeyboard}
      caretHidden={props.preventKeyboard}
    />
  )
}
const themedStyles = StyleService.create({
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  captionIcon: {
    marginRight: 3
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400'
  },
  errorText: {
    color: 'color-danger-500'
  }
})
