import { useMutation, useQuery } from '@apollo/client'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { AddEntryErrors, validateForm } from './validation'
import { gql } from '../../../__generated__'
import { CREATE_ENTRY_MUTATION } from '../../../graphql/mutations/entries.graphql'
import { Button, ButtonType } from '../../Buttons/Button'
import { InputField } from '../../Inputs/InputField'
import { DropdownItem, SearchableDropdownField } from '../../Inputs/SearchableDropdown'

export type NewEntryFormProps = {
  latitude: number | undefined
  longitude: number | undefined
  onSuccess(): void
  onError(): void
}

export const NewEntryForm = (props: NewEntryFormProps) => {
  const styles = useStyleSheet(themedStyles)

  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTripId, setSelectedTripId] = useState<number | undefined>(undefined)
  const [tripDropdownItems, setTripDropdownItems] = useState<DropdownItem[] | undefined>(undefined)

  const [validationErrors, setValidationErrors] = useState<AddEntryErrors>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const [newEntryMutation, { data: newEntry, loading: loadingEntry, error: errorEntry }] =
    useMutation(CREATE_ENTRY_MUTATION)
  const { data: trips } = useQuery(GET_TRIPS)

  useEffect(() => {
    if (errorEntry) {
      props.onError()
      return
    }

    if (newEntry?.newEntry) {
      props.onSuccess()
    }
  }, [errorEntry, newEntry])

  useEffect(() => {
    const errors = validateForm(destination)
    setValidationErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)
  }, [destination])

  useEffect(() => {
    setTripDropdownItems(
      trips?.trips.map((trip) => {
        return {
          label: trip.name,
          value: trip.id.toString()
        } as DropdownItem
      })
    )
  }, [trips])

  const onCreateEntry = () => {
    if (props.latitude && props.longitude)
      newEntryMutation({
        variables: {
          description,
          destination,
          tripId: selectedTripId,
          latitude: props.latitude,
          longitude: props.longitude
        }
      }).catch(() => {})
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
        <SearchableDropdownField
          label="Add to trip"
          items={tripDropdownItems || []}
          setSelectedItems={(id) => setSelectedTripId(id)}
          placeholder="Select your trip"
          dropdownDirection="TOP"
        />
        <Button
          type={ButtonType.PRIMARY}
          onButtonClick={() => onCreateEntry()}
          title="Create"
          disabled={!isFormValid}
          isLoading={loadingEntry}
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

const GET_TRIPS = gql(`
  query GetTrips{
    trips {
        id
        name
      }
    }
`)
