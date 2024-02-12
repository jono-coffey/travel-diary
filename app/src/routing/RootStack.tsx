import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MainTabs } from './MainTabs'
import { LOGIN, REGISTER, RootStackParamList, HOME, LANDING } from './routes'
import { Landing } from '../screens/Landing'
import { Login } from '../screens/Login'
import { Register } from '../screens/Register/Register'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={LANDING} component={Landing} />
      <Stack.Screen name={REGISTER} component={Register} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={HOME} component={MainTabs} />
    </Stack.Navigator>
  )
}
