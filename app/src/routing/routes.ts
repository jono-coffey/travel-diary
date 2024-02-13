export const LANDING = 'Login Landing'
export const LOGIN = 'Login'
export const REGISTER = 'Register'
export const HOME = 'Home'

export const DASHBOARD = 'Dashboard'
export const MAP = 'Map'
export const ADD_ENTRY = 'AddEntry'

export type RootStackParamList = {
  [LANDING]: undefined
  [REGISTER]: undefined
  [LOGIN]: undefined
  [HOME]: undefined
}

export type MainTabsParamList = {
  [DASHBOARD]: undefined
  [MAP]: undefined
  [ADD_ENTRY]: undefined
}
