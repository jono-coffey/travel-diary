import { useMutation } from '@apollo/client'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { AddTripErrors, validateForm } from './validation'
import { CREATE_TRIP_MUTATION } from '../../../graphql/mutations/trips.graphql'
import { Background } from '../../Background'
import { Button, ButtonType } from '../../Buttons/Button'
import { DatePicker } from '../../Inputs/DatePicker'
import { InputField } from '../../Inputs/InputField'

export type NewTripFormProps = {
  onSuccess(): void
  onError(): void
}

export const NewTripForm = (props: NewTripFormProps) => {
  const styles = useStyleSheet(themedStyles)

  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState<number | undefined>(undefined)
  const [endDate, setEndDate] = useState<number | undefined>(undefined)

  const [validationErrors, setValidationErrors] = useState<AddTripErrors>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const [newTrip, { data, loading, error }] = useMutation(CREATE_TRIP_MUTATION)

  useEffect(() => {
    if (error) {
      props.onError()
      return
    }

    if (data?.newTrip) {
      props.onSuccess()
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
