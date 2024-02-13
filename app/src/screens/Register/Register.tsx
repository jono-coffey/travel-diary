import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Text } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import { RegisterErrors, validateForm } from './validation'
import { BackIcon } from '../../components/Buttons/BackButton'
import { Background } from '../../components/Background'
import { Button, ButtonType } from '../../components/Buttons/Button'
import { InputField } from '../../components/Inputs/InputField'
import { Logo } from '../../components/Logo'
import { REGISTER_MUTATION } from '../../graphql/mutations/auth.graphql'
import { HOME, RootStackParamList } from '../../routing/routes'
import { setRegister } from '../../state/auth'
import { useAppDispatch } from '../../state/store'
import { Typography } from '../../styles'
import { ToastType, showToast } from '../../utils/toasts'

export const Register = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION)

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = React.useState<string>('')
  const [validationErrors, setValidationErrors] = React.useState<RegisterErrors>({})
  const [isFormValid, setIsFormValid] = React.useState(false)

  useEffect(() => {
    if (error) {
      const errorText = error.message
      showToast({ text2: errorText }, ToastType.ERROR, 2)
      return
    }

    if (data?.signUp) {
      dispatch(setRegister(data))
      navigation.reset({
        index: 0,
        routes: [{ name: HOME }]
      })
    }
  }, [data, error])

  useEffect(() => {
    const errors = validateForm(email, password, confirmedPassword)
    setValidationErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)
  }, [confirmedPassword, email, password])

  const onSubmit = async () => {
    register({
      variables: { email, password }
    }).catch(() => {})
  }

  return (
    <Background scroll>
      <BackIcon />
      <View style={styles.headingContainer}>
        <Logo />
        <Text category="h1">Create Account</Text>
      </View>
      <View style={styles.middleContent} />
      <View style={styles.inputContainer}>
        <InputField
          placeholder="Email"
          value={email}
          onChange={setEmail}
          errorMessage={validationErrors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />
        <InputField
          placeholder="Password"
          value={password}
          onChange={setPassword}
          hintText="Password must be at least 6 characters."
          errorMessage={validationErrors.password}
          required
          obfuscate
        />
        <InputField
          placeholder="Confirm Password"
          errorMessage={validationErrors.confirmPassword}
          value={confirmedPassword}
          onChange={setConfirmedPassword}
          required
          obfuscate
        />
        <Button
          type={ButtonType.PRIMARY}
          title="Register"
          isLoading={loading}
          disabled={!isFormValid}
          onButtonClick={() => onSubmit()}
        />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'center'
  },
  middleContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  logo: {
    display: 'flex',
    width: 100,
    height: 100,
    backgroundColor: 'gray'
  },
  heading: {
    fontSize: 32,
    fontFamily: Typography.fontFamily,
    fontWeight: 'bold'
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 16
  }
})
