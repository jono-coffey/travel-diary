import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { AddEntryErrors, validateForm } from './validation'
import { Background } from '../../components/Background'
import { Button, ButtonType } from '../../components/Button'
import { DatePicker } from '../../components/DatePicker'
import { InputField } from '../../components/InputField'
import { CREATE_ENTRY_MUTATION } from '../../graphql/entries.graphql'
import { ADD_ENTRY, HOME, LANDING, MainTabsParamList, RootStackParamList } from '../../routing/routes'
import { logout } from '../../state/auth'
import { useAppDispatch } from '../../state/store'
import { ToastType, showToast } from '../../utils/toasts'

export const AddEntry = ({ route }: NativeStackScreenProps<MainTabsParamList, 'AddEntry'>) => {
  const dispatch = useAppDispatch()
  const styles = useStyleSheet(themedStyles)

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState<number | undefined>(undefined)
  const [endDate, setEndDate] = useState<number | undefined>(undefined)

  const [validationErrors, setValidationErrors] = useState<AddEntryErrors>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const [newEntry, { data, loading, error }] = useMutation(CREATE_ENTRY_MUTATION)

  useEffect(() => {
    if (error) {
      const errorText = 'Something went wrong creating a new journal entry'
      console.log(error)
      showToast({ text2: errorText }, ToastType.ERROR, 2)
      return
    }

    if (data?.newEntry) {
      navigation.reset({
        index: 0,
        routes: [{ name: HOME }]
      })
    }
  }, [data, error])

  useEffect(() => {
    const errors = validateForm(destination, startDate, endDate)
    setValidationErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)
  }, [destination, startDate, endDate])

  const onLogout = () => {
    dispatch(logout())
    navigation.reset({
      index: 0,
      routes: [{ name: LANDING }]
    })
  }

  const onCreateEntry = () => {
    if (startDate && endDate) {
      newEntry({ variables: { description, destination, startDate, endDate } }).catch(() => {})
    }
  }

  return (
    <Background style={{ paddingBottom: 0 }}>
      <Text category="h3">New Journal Entry</Text>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="Destination"
          value={destination}
          onChange={setDestination}
          errorMessage={validationErrors.destination}
          required
        />
        <InputField placeholder="Description" value={description} onChange={setDescription} />
        <DatePicker
          placeholder="Start Date"
          hintText="dd/mm/yyyy"
          required
          onChange={(unixDate) => setStartDate(unixDate)}
          errorMessage={validationErrors.startDate}
        />
        <DatePicker
          placeholder="End Date"
          hintText="dd/mm/yyyy"
          required
          onChange={(unixDate) => setEndDate(unixDate)}
          errorMessage={validationErrors.endDate}
        />
        <Button
          type={ButtonType.PRIMARY}
          onButtonClick={() => onCreateEntry()}
          title="Create"
          disabled={!isFormValid}
          isLoading={loading}
        />
      </View>
      <Button type={ButtonType.PRIMARY} onButtonClick={() => onLogout()} title="Logout" />
    </Background>
  )
}

const themedStyles = StyleService.create({
  inputContainer: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 16
  }
})
