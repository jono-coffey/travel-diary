export const LANDING = 'Login Landing'
export const LOGIN = 'Login'
export const REGISTER = 'Register'
export const HOME = 'Home'

export const DASHBOARD = 'Dashboard'
export const MAP = 'Map'
export const TRIPS = 'Trips'

export const TRIPS_LIST = 'Trips List'
export const VIEW_TRIP = 'View Trip'

export type RootStackParamList = {
  [LANDING]: undefined
  [REGISTER]: undefined
  [LOGIN]: undefined
  [HOME]: undefined
}

export type MainTabsParamList = {
  [DASHBOARD]: undefined
  [MAP]: undefined
  [TRIPS]: undefined
}

export type TripsParamList = {
  [TRIPS_LIST]: undefined
  [VIEW_TRIP]: { tripId: number }
}
