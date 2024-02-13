import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Text } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import { BackIcon } from '../components/Buttons/BackButton'
import { Background } from '../components/Background'
import { Button, ButtonType } from '../components/Buttons/Button'
import { InputField } from '../components/Inputs/InputField'
import { Logo } from '../components/Logo'
import { LOGIN_MUTATION } from '../graphql/mutations/auth.graphql'
import { HOME, REGISTER, RootStackParamList } from '../routing/routes'
import { setLogin } from '../state/auth'
import { useAppDispatch } from '../state/store'
import { Typography } from '../styles'
import { ToastType, showToast } from '../utils/toasts'

export const Login = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  useEffect(() => {
    if (error) {
      const errorText = error.message
      showToast({ text2: errorText }, ToastType.ERROR, 2)
      return
    }

    if (data?.login) {
      dispatch(setLogin(data))
      navigation.reset({
        index: 0,
        routes: [{ name: HOME }]
      })
    }
  }, [data, error])

  const onLoginClick = () => {
    login({
      variables: { email, password }
    }).catch(() => {})
  }

  const isFormValid = email.length && password.length

  return (
    <Background scroll>
      <BackIcon />
      <View style={styles.headingContainer}>
        <Logo />
        <Text category="h1">Welcome Back</Text>
      </View>
      <View style={styles.middleContent} />
      <View style={styles.inputContainer}>
        <InputField
          placeholder="Email"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />
        <InputField placeholder="Password" value={password} onChange={setPassword} required obfuscate />
        <Button
          type={ButtonType.PRIMARY}
          title="Login"
          isLoading={loading}
          disabled={!isFormValid}
          onButtonClick={() => onLoginClick()}
        />

        <Text style={styles.subtext}>New User?</Text>
        <Text style={[styles.subtext, styles.clickableSubtext]} onPress={() => navigation.replace(REGISTER)}>
          Create New Account
        </Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  heading: {
    fontSize: 32,
    fontFamily: Typography.fontFamily,
    fontWeight: 'bold'
  },
  subtext: {
    fontSize: 16,
    fontFamily: Typography.fontFamily,
    alignSelf: 'center'
  },
  clickableSubtext: {
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: Typography.fontFamily,
    alignSelf: 'center'
  },
  middleContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16
  }
})
