import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import * as React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

export type PillProps = {
  text: string
  style: StyleProp<ViewStyle>
}

export const Pill = (props: PillProps) => {
  const styles = useStyleSheet(themedStyles)
  return (
    <View style={[props.style, styles.pill]}>
      <Text style={styles.text} category="s2">
        {props.text}
      </Text>
    </View>
  )
}

const themedStyles = StyleService.create({
  pill: {
    backgroundColor: 'color-primary-300',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center'
  }
})
