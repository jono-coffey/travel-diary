import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { AddEntryErrors, validateForm } from './validation'
import { CREATE_ENTRY_MUTATION } from '../../../graphql/mutations/entries.graphql'
import { CREATE_TRIP_MUTATION } from '../../../graphql/mutations/trips.graphql'
import { HOME, MainTabsParamList, RootStackParamList } from '../../../routing/routes'
import { ToastType, showToast } from '../../../utils/toasts'
import { Background } from '../../Background'
import { Button, ButtonType } from '../../Buttons/Button'
import { DatePicker } from '../../Inputs/DatePicker'
import { InputField } from '../../Inputs/InputField'

export const NewEntryForm = () => {
  const styles = useStyleSheet(themedStyles)

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')

  const [validationErrors, setValidationErrors] = useState<AddEntryErrors>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const [newEntry, { data, loading, error }] = useMutation(CREATE_ENTRY_MUTATION)

  useEffect(() => {
    if (error) {
      const errorText = 'Something went wrong creating a new journal entry'
      showToast({ text2: errorText }, ToastType.ERROR, 2)
      return
    }

    if (data?.newEntry) {
      showToast({ text2: 'New journal entry has been created' }, ToastType.ERROR, 2)
    }
  }, [data, error])

  useEffect(() => {
    const errors = validateForm(destination)
    setValidationErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)
  }, [destination])

  const onCreateEntry = () => {
    //TODO: Add trip id
    newEntry({ variables: { description, destination } }).catch(() => {})
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
        <Button
          type={ButtonType.PRIMARY}
          onButtonClick={() => onCreateEntry()}
          title="Create"
          disabled={!isFormValid}
          isLoading={loading}
        />
      </View>
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
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateInput: {
    width: '49%'
  }
})
