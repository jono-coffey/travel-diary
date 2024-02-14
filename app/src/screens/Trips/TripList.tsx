import { useQuery } from '@apollo/client'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { Spinner, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components'
import { useCallback, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'

import { gql } from '../../__generated__'
import { Background } from '../../components/Background'
import { Button, ButtonType } from '../../components/Buttons/Button'
import { ErrorState } from '../../components/ErrorState'
import { NewTripForm } from '../../components/Forms/NewTripForm/NewTripForm'
import { Modal } from '../../components/Modal'
import { TripCard } from '../../components/TripCard'
import { TripsParamList, VIEW_TRIP } from '../../routing/routes'
import { ToastType, showToast } from '../../utils/toasts'

export const TripList = ({ route }: NativeStackScreenProps<TripsParamList, 'Trips List'>) => {
  const styles = useStyleSheet(themedStyles)
  const theme = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<TripsParamList>>()

  const { loading, error, data, refetch } = useQuery(GET_TRIPS, {
    notifyOnNetworkStatusChange: true
  })
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false)

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [])
  )

  const onCardPress = (id: number) => {
    navigation.navigate(VIEW_TRIP, { tripId: id })
  }

  const onAddTripSuccess = () => {
    showToast({ text2: 'New trip has been created' }, ToastType.SUCCESS, 2)
    setIsAddTripModalOpen(false)
    refetch()
  }

  const onAddTripError = () => {
    const errorText = 'Something went wrong creating a new journal entry'
    showToast({ text2: errorText }, ToastType.ERROR, 2)
  }

  return (
    <>
      <Modal
        isModalOpen={isAddTripModalOpen}
        onBackdropPress={() => {
          setIsAddTripModalOpen(false)
        }}
      >
        <NewTripForm onError={() => onAddTripError()} onSuccess={() => onAddTripSuccess()} />
      </Modal>
      <Background>
        <View style={styles.topContainer}>
          <Text category="h3">Trips</Text>
          <Pressable onPress={() => setIsAddTripModalOpen(true)}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </Pressable>
        </View>

        {loading ? (
          <View style={styles.centeredContainer}>
            <Spinner status="primary" size="giant" />
          </View>
        ) : error ? (
          <ErrorState
            text1="An error occurred"
            text2="Something went wrong on our side. Please try again."
            ctaText="Retry"
            onCtaClick={() => refetch()}
          />
        ) : data?.currentUser?.trips?.length ? (
          <FlatList
            data={data.currentUser.trips}
            contentContainerStyle={styles.listContainer}
            style={styles.list}
            renderItem={({ item }) => (
              <TripCard
                key={item.id}
                id={item.id}
                name={item.name}
                endDate={item.endDate}
                startDate={item.startDate}
                onCardPress={(id) => onCardPress(id)}
              />
            )}
            numColumns={1}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={[styles.centeredContainer, styles.textContainer]}>
            <FontAwesome name="plane" size={64} color={theme['color-primary-500']} />
            <Text category="h5" style={styles.text}>
              You have not added any trips.
            </Text>
            <Text category="s2" style={styles.text}>
              Add a trip to your journal and start adding photos!
            </Text>
            <Button
              title="Add Trip"
              type={ButtonType.SECONDARY}
              onButtonClick={() => {
                setIsAddTripModalOpen(true)
              }}
            />
          </View>
        )}
      </Background>
    </>
  )
}

const themedStyles = StyleService.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    gap: 15
  },
  text: {
    textAlign: 'center'
  },
  list: { overflow: 'visible', marginTop: 20 },
  listContainer: { gap: 10 }
})

const GET_TRIPS = gql(`
  query GetCurrentUser {
    currentUser {
      id
      trips {
        id
        name
        startDate
        endDate
      }
    }
  }
`)
