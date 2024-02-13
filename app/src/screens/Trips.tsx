import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components'

import { gql } from '../__generated__'
import { Background } from '../components/Background'
import { MainTabsParamList, RootStackParamList } from '../routing/routes'
import { FlatList, View } from 'react-native'
import { TripCard } from '../components/TripCard'

export const Trips = ({ route }: NativeStackScreenProps<MainTabsParamList, 'Trips'>) => {
  const styles = useStyleSheet(themedStyles)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const { loading, error, data } = useQuery(GET_TRIPS)

  console.log()

  return (
    <Background style={{ paddingBottom: 0 }}>
      <Text category="h3">Trips</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Spinner status="primary" />
        </View>
      ) : error ? (
        <View>{/* TODO: Error screen */}</View>
      ) : data?.currentUser?.trips?.length ? (
        <FlatList
          data={data?.currentUser?.trips || []}
          renderItem={({ item }) => (
            <TripCard key={item.id} name={item.name} endDate={item.endDate} startDate={item.startDate} />
          )}
          numColumns={1}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>{/* TODO: Empty state */}</View>
      )}
    </Background>
  )
}

const themedStyles = StyleService.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
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
