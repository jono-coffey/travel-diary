import { Entypo } from '@expo/vector-icons'
import { Spinner, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components'
import { Pressable, StyleSheet, View } from 'react-native'

import { Typography } from '../styles'

export enum Direction {
  LEFT,
  RIGHT
}

interface ForwardIconProps {
  text?: string
  arrowDirection: Direction
  textPlacement: Direction
  disabled?: boolean
  isLoading?: boolean
  onClick(): void
}

export const ArrowIcon = (props: ForwardIconProps) => {
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles)

  const onClick = () => {
    if (!props.disabled) props.onClick()
  }

  return (
    <Pressable style={props.disabled ? disabledContainer : styles.container} onPress={() => onClick()}>
      {props.textPlacement === Direction.LEFT ? (
        <>
          {props.text && (
            <Text category="s1" style={styles.text}>
              {props.text}
            </Text>
          )}
          <View style={[styles.iconContainer, styles.marginLeft]}>
            {props.isLoading ? (
              <Spinner status="primary" />
            ) : (
              <Entypo
                name={props.arrowDirection === Direction.LEFT ? 'chevron-left' : 'chevron-right'}
                size={24}
                color={theme['color-primary-500']}
              />
            )}
          </View>
        </>
      ) : (
        <>
          <View style={[styles.iconContainer, styles.marginRight]}>
            {props.isLoading ? (
              <Spinner status="primary" />
            ) : (
              <Entypo
                name={props.arrowDirection === Direction.LEFT ? 'chevron-left' : 'chevron-right'}
                size={24}
                color={theme['color-primary-500']}
              />
            )}
          </View>
          {props.text && (
            <Text category="s1" style={styles.text}>
              {props.text}
            </Text>
          )}
        </>
      )}
    </Pressable>
  )
}

const themedStyles = StyleService.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  disabled: {
    opacity: 0.5
  },
  text: {
    fontFamily: Typography.fontFamily,
    fontWeight: 'bold'
  },
  iconContainer: {
    borderRadius: 100,
    borderColor: 'color-primary-500',
    borderWidth: 0.5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  marginLeft: {
    marginLeft: 10
  },
  marginRight: {
    marginRight: 10
  }
})

const disabledContainer = StyleSheet.compose(themedStyles.container, themedStyles.disabled)
