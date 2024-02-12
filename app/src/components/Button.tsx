import { Button as KittenButton } from '@ui-kitten/components'
import * as React from 'react'
import { StyleSheet, ActivityIndicator, ViewStyle } from 'react-native'

export enum ButtonType {
  PRIMARY,
  SECONDARY
}

export type ButtonProps = {
  title: string
  type: ButtonType
  disabled?: boolean
  isLoading?: boolean
  style?: ViewStyle
  onButtonClick(): void
}

export const Button = (props: ButtonProps) => {
  return (
    <KittenButton
      disabled={props.disabled}
      style={[styles.button, props.style]}
      appearance={props.type === ButtonType.PRIMARY ? 'filled' : 'outline'}
      onPress={props.onButtonClick}
    >
      {props.isLoading ? <ActivityIndicator size={17} /> : props.title}
    </KittenButton>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: '100%'
  }
})
