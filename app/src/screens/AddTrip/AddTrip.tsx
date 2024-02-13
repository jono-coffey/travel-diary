import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { AddTripErrors, validateForm } from './validation'
import { Background } from '../../components/Background'
import { Button, ButtonType } from '../../components/Buttons/Button'
import { DatePicker } from '../../components/Inputs/DatePicker'
import { InputField } from '../../components/Inputs/InputField'
import { CREATE_TRIP_MUTATION } from '../../graphql/mutations/trips.graphql'
import { HOME, MainTabsParamList, RootStackParamList } from '../../routing/routes'
import { ToastType, showToast } from '../../utils/toasts'

export const AddTrip = ({ route }: NativeStackScreenProps<MainTabsParamList, 'Add Trip'>) => {
  const styles = useStyleSheet(themedStyles)

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState<number | undefined>(undefined)
  const [endDate, setEndDate] = useState<number | undefined>(undefined)

  const [validationErrors, setValidationErrors] = useState<AddTripErrors>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const [newTrip, { data, loading, error }] = useMutation(CREATE_TRIP_MUTATION)

  useEffect(() => {
    if (error) {
      const errorText = 'Something went wrong creating a new journal entry'
      showToast({ text2: errorText }, ToastType.ERROR, 2)
      return
    }

    if (data?.newTrip) {
      showToast({ text2: 'Your trip has been created' }, ToastType.SUCCESS, 2)

      navigation.reset({
        index: 0,
        routes: [{ name: HOME }]
      })
    }
  }, [data, error])

  useEffect(() => {
    const errors = validateForm(name, startDate, endDate)
    setValidationErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)
  }, [name, startDate, endDate])

  const onCreateEntry = () => {
    if (startDate && endDate) {
      newTrip({ variables: { name, startDate, endDate } }).catch(() => {})
    }
  }

  return (
    <Background style={{ paddingBottom: 0 }}>
      <Text category="h3">New Trip</Text>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="Name"
          value={name}
          onChange={setName}
          errorMessage={validationErrors.name}
          required
        />
        <View style={styles.dateContainer}>
          <DatePicker
            placeholder="Start Date"
            hintText="dd/mm/yyyy"
            required
            style={styles.dateInput}
            onChange={(unixDate) => setStartDate(unixDate)}
            errorMessage={validationErrors.startDate}
          />
          <DatePicker
            placeholder="End Date"
            hintText="dd/mm/yyyy"
            style={styles.dateInput}
            required
            onChange={(unixDate) => setEndDate(unixDate)}
            errorMessage={validationErrors.endDate}
          />
        </View>
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
