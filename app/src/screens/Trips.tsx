import { useQuery } from '@apollo/client'
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { Spinner, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components'
import { useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'

import { gql } from '../__generated__'
import { Background } from '../components/Background'
import { Button, ButtonType } from '../components/Buttons/Button'
import { NewTripForm } from '../components/Forms/NewTripForm/NewTripForm'
import { TripCard } from '../components/TripCard'
import { MainTabsParamList } from '../routing/routes'
import { ToastType, showToast } from '../utils/toasts'
import { Modal } from '../components/Modal'

export const Trips = ({ route }: NativeStackScreenProps<MainTabsParamList, 'Trips'>) => {
  const styles = useStyleSheet(themedStyles)
  const theme = useTheme()

  const { loading, error, data, refetch } = useQuery(GET_TRIPS, { notifyOnNetworkStatusChange: true })
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false)

  const onCardPress = (id: number) => {
    console.log(id)
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

  console.log(loading)

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
      <Background style={{ paddingBottom: 0 }}>
        <View style={styles.topContainer}>
          <Text category="h3">Trips</Text>
          <Pressable onPress={() => setIsAddTripModalOpen(true)}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </Pressable>
        </View>

        {loading ? (
          <View style={styles.centeredContainer}>
            <Spinner status="primary" />
          </View>
        ) : error ? (
          <View style={[styles.centeredContainer, styles.textContainer]}>
            <MaterialIcons name="error-outline" size={64} color={theme['color-danger-400']} />
            <Text category="h5" style={styles.text}>
              An error occurred
            </Text>
            <Text category="s2" style={styles.text}>
              Something went wrong on our side. Please try again.
            </Text>
            <Button
              title="Retry"
              type={ButtonType.SECONDARY}
              onButtonClick={() => {
                refetch()
              }}
            />
          </View>
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
  query GetCurrentTrips {
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
