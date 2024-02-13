import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@ui-kitten/components'

import { DASHBOARD, MAP, MainTabsParamList, TRIPS } from './routes'
import { Dashboard } from '../screens/Dashboard'
import { Map } from '../screens/MapView'
import { Trips } from '../screens/Trips'

const Tab = createBottomTabNavigator<MainTabsParamList>()

export const MainTabs = () => {
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: theme['color-basic-300']
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: theme['color-basic-300'],
        tabBarIcon: ({ focused }) => {
          const color = focused ? theme['color-primary-600'] : theme['color-primary-300']
          if (route.name === DASHBOARD) {
            return <MaterialIcons name="dashboard" size={36} color={color} />
          }
          if (route.name === MAP) return <FontAwesome5 name="map-marked-alt" size={36} color={color} />

          return <FontAwesome5 name="plane" size={36} color={color} />
        }
      })}
    >
      <Tab.Screen name={DASHBOARD} component={Dashboard} />
      <Tab.Screen name={MAP} component={Map} />
      <Tab.Screen name={TRIPS} component={Trips} />
    </Tab.Navigator>
  )
}
