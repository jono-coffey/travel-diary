import { useMutation, useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { gql } from '../../__generated__'
import { Background } from '../../components/Background'
import { BackIcon } from '../../components/Buttons/BackButton'
import { Button, ButtonType } from '../../components/Buttons/Button'
import { DeleteButton } from '../../components/Buttons/DeleteButton'
import { ErrorState } from '../../components/ErrorState'
import { Modal } from '../../components/Modal'
import { DELETE_TRIP_MUTATION } from '../../graphql/mutations/trips.graphql'
import { TRIPS_LIST, TripsParamList } from '../../routing/routes'
import { ToastType, showToast } from '../../utils/toasts'

export const ViewTrip = ({ route }: NativeStackScreenProps<TripsParamList, 'View Trip'>) => {
  const tripId = route.params.tripId
  const styles = useStyleSheet(themedStyles)
  const navigation = useNavigation<NativeStackNavigationProp<TripsParamList>>()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [deleteTrip, { data: deleteTripData, error: deleteTripError }] = useMutation(DELETE_TRIP_MUTATION)

  const { loading, error, data, refetch } = useQuery(GET_TRIP, {
    notifyOnNetworkStatusChange: true,
    variables: { tripId }
  })

  useEffect(() => {
    if (deleteTripData?.deleteTrip) {
      showToast({ text2: 'Your trip has been deleted.' }, ToastType.SUCCESS, 2)
      navigation.navigate(TRIPS_LIST)
    }

    if (deleteTripError) {
      setIsDeleteModalOpen(false)
      const errorText = 'Something went wrong deleting your trip.'
      showToast({ text2: errorText }, ToastType.ERROR, 2)
    }
  }, [deleteTripData, deleteTripError])

  const onDelete = () => {
    deleteTrip({ variables: { deleteTripId: tripId } })
  }

  return (
    <Background>
      {loading ? (
        <View style={styles.loaderContainer}>
          <Spinner status="primary" size="giant" />
        </View>
      ) : error ? (
        <ErrorState
          text1="An error occurred"
          text2="Something went wrong on our side. Please try again."
          ctaText="Retry"
          onCtaClick={() => refetch()}
        />
      ) : (
        <>
          <View style={styles.topContainer}>
            <BackIcon />
            <Text category="h3">Trip</Text>
            <DeleteButton onClick={() => setIsDeleteModalOpen(true)} />
          </View>
          <Text category="h3">{data?.getTrip?.name}</Text>
        </>
      )}

      <Modal
        isModalOpen={isDeleteModalOpen}
        width={70}
        onBackdropPress={() => {
          setIsDeleteModalOpen(false)
        }}
      >
        <View style={styles.deleteModalContainer}>
          <Text style={styles.deleteModalText} category="s1">
            Are you sure you want to delete this trip?
          </Text>
          <Button title="YES" type={ButtonType.PRIMARY} onButtonClick={() => onDelete()} />
          <Button title="NO" type={ButtonType.SECONDARY} onButtonClick={() => setIsDeleteModalOpen(false)} />
        </View>
      </Modal>
    </Background>
  )
}

const themedStyles = StyleService.create({
  topContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteModalContainer: {
    gap: 10
  },
  deleteModalText: {
    marginBottom: 10,
    textAlign: 'center'
  }
})

const GET_TRIP = gql(`
  query GetTrip($tripId: Int!) {
    getTrip(id: $tripId) {
      id
      name
      startDate
      endDate
    }
  }
`)
