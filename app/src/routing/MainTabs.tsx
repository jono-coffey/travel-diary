import { FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@ui-kitten/components'

import { ADD_ENTRY, DASHBOARD, MainTabsParamList } from './routes'
import { Dashboard } from '../screens/Dashboard'
import { AddEntry } from '../screens/AddEntry/AddEntry'

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
          // if (route.name === '') {
          //   return <Ionicons name="people-circle" size={36} color={color} />
          // }
          return <FontAwesome5 name="user-cog" size={32} color={color} />
        }
      })}
    >
      <Tab.Screen name={DASHBOARD} component={Dashboard} />
      <Tab.Screen name={ADD_ENTRY} component={AddEntry} />
    </Tab.Navigator>
  )
}
