import { MaterialIcons } from '@expo/vector-icons'
import { StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components'
import { View } from 'react-native'

import { Button, ButtonType } from './Buttons/Button'

type ErrorStateProps = {
  text1: string
  text2: string
  ctaText: string
  onCtaClick(): void
}
export const ErrorState = (props: ErrorStateProps) => {
  const styles = useStyleSheet(themedStyles)
  const theme = useTheme()
  return (
    <View style={[styles.centeredContainer, styles.textContainer]}>
      <MaterialIcons name="error-outline" size={64} color={theme['color-danger-400']} />
      <Text category="h5" style={styles.text}>
        {props.text1}
      </Text>
      <Text category="s2" style={styles.text}>
        {props.text2}
      </Text>
      <Button
        title={props.ctaText}
        type={ButtonType.SECONDARY}
        onButtonClick={() => {
          props.onCtaClick()
        }}
      />
    </View>
  )
}

const themedStyles = StyleService.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    gap: 15
  },
  text: {
    textAlign: 'center'
  }
})
