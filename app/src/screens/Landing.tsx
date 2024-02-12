import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleService, useStyleSheet } from '@ui-kitten/components'
import { useCallback } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

import { Background } from '../components/Background'
import { Button, ButtonType } from '../components/Button'
import { Logo } from '../components/Logo'
import { HOME, LOGIN, REGISTER, RootStackParamList } from '../routing/routes'
import { RootState } from '../state/store'

export const Landing = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const authSlice = useSelector((state: RootState) => state.auth)
  const accessToken = authSlice.accessToken
  const styles = useStyleSheet(themedStyles)

  useFocusEffect(
    useCallback(() => {
      if (accessToken) {
        navigation.replace(HOME)
      }
    }, [accessToken])
  )

  return (
    <Background>
      <View style={styles.middleContent}>
        <Logo />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Login" type={ButtonType.PRIMARY} onButtonClick={() => navigation.navigate(LOGIN)} />
        <Button
          title="Create Account"
          type={ButtonType.SECONDARY}
          onButtonClick={() => navigation.navigate(REGISTER)}
        />
      </View>
    </Background>
  )
}

const themedStyles = StyleService.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  middleContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16
  }
})
