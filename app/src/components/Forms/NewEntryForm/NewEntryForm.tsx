import { useMutation } from '@apollo/client'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { AddEntryErrors, validateForm } from './validation'
import { CREATE_ENTRY_MUTATION } from '../../../graphql/mutations/entries.graphql'
import { Button, ButtonType } from '../../Buttons/Button'
import { InputField } from '../../Inputs/InputField'

export type NewEntryFormProps = {
  onSuccess(): void
  onError(): void
}

export const NewEntryForm = (props: NewEntryFormProps) => {
  const styles = useStyleSheet(themedStyles)

  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')

  const [validationErrors, setValidationErrors] = useState<AddEntryErrors>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const [newEntry, { data, loading, error }] = useMutation(CREATE_ENTRY_MUTATION)

  useEffect(() => {
    if (error) {
      props.onError()
      return
    }

    if (data?.newEntry) {
      props.onSuccess()
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
    <>
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
    </>
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
