import { Layout, StyleService, useStyleSheet } from '@ui-kitten/components'
import { ReactNode } from 'react'
import { Keyboard, Pressable, View, ViewStyle } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface BackgroundProps {
  children: ReactNode
  scroll?: boolean
  style?: ViewStyle
}

export const Background = (props: BackgroundProps) => {
  const styles = useStyleSheet(themedStyles)

  const BackgroundCircles = (): React.ReactElement => {
    return (
      <>
        <View style={[styles.circle, styles.circleOne]} />
        <View style={[styles.circle, styles.circleTwo]} />
        <View style={[styles.circle, styles.circleThree]} />
      </>
    )
  }

  return props.scroll ? (
    <KeyboardAwareScrollView
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.contentContainerStyle}
      keyboardOpeningTime={0}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    >
      <Layout style={styles.fullScreenContainer}>
        <Pressable style={[styles.defaultContainer, props.style]} onPress={Keyboard.dismiss}>
          <BackgroundCircles />
          {props.children}
        </Pressable>
      </Layout>
    </KeyboardAwareScrollView>
  ) : (
    <Layout style={styles.fullScreenContainer}>
      <Pressable style={[styles.defaultContainer, props.style]} onPress={Keyboard.dismiss}>
        <BackgroundCircles />
        {props.children}
      </Pressable>
    </Layout>
  )
}
const themedStyles = StyleService.create({
  scrollViewStyle: {
    backgroundColor: 'color-basic-100',
    flex: 1
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 10
  },
  defaultContainer: {
    flex: 1,
    padding: 20
  },
  fullScreenContainer: {
    flex: 1
  },
  circle: {
    width: '25%',
    aspectRatio: 1,
    backgroundColor: 'color-primary-100',
    opacity: 0.3,
    borderRadius: 50,
    position: 'absolute'
  },
  circleOne: {
    top: '7%',
    right: '0%'
  },
  circleTwo: {
    top: '50%',
    right: '90%'
  },
  circleThree: {
    top: '70%',
    left: '85%'
  }
})
