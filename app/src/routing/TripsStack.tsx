import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { TripsParamList, TRIPS_LIST, VIEW_TRIP } from './routes'
import { TripList } from '../screens/Trips/TripList'
import { ViewTrip } from '../screens/Trips/ViewTrip'

const Stack = createNativeStackNavigator<TripsParamList>()

export const TripStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={TRIPS_LIST} component={TripList} />
      <Stack.Screen name={VIEW_TRIP} component={ViewTrip} />
    </Stack.Navigator>
  )
}
