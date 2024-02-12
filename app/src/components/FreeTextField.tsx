import { useFocusEffect } from '@react-navigation/native'
import { Input, Text } from '@ui-kitten/components'
import * as React from 'react'
import { View, StyleSheet } from 'react-native'

export type InputFieldProps = {
  numberOfLines: number
  maxChars: number
  placeholder?: string
  required?: boolean
  value?: string
  label?: string
  hintText?: string
  errorMessage?: string
  onChange(text: string): void
}

export const FreeTextField = (props: InputFieldProps) => {
  const [touched, setTouched] = React.useState(false)

  useFocusEffect(
    React.useCallback(() => {
      setTouched(false)
    }, [])
  )

  const errorMessage = () => {
    if (touched && props.errorMessage) {
      return props.errorMessage
    }
    return ''
  }

  const renderCaption = () => {
    return (
      <View style={styles.bottomTextWrapper}>
        <Text style={styles.captionText}>{errorMessage() || props.hintText}</Text>
        <Text style={styles.captionText}>
          {props.value?.length || 0}/{props.maxChars}
        </Text>
      </View>
    )
  }

  const placeHolder = props.required ? `${props.placeholder}*` : props.placeholder

  return (
    <Input
      multiline
      value={props.value}
      label={props.label}
      placeholder={placeHolder}
      caption={renderCaption}
      maxLength={props.maxChars}
      textStyle={{ minHeight: props.numberOfLines * 20 }}
      onChangeText={props.onChange}
      onBlur={() => setTouched(true)}
      status={errorMessage() ? 'danger' : 'basic'}
      textAlignVertical="top"
    />
  )
}

const styles = StyleSheet.create({
  bottomTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400'
  }
})
