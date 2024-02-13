import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleService, Text } from '@ui-kitten/components'

import { Background } from '../components/Background'
import { Button, ButtonType } from '../components/Buttons/Button'
import { LANDING, MainTabsParamList, RootStackParamList } from '../routing/routes'
import { logout } from '../state/auth'
import { useAppDispatch } from '../state/store'

export const Dashboard = ({ route }: NativeStackScreenProps<MainTabsParamList, 'Dashboard'>) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const onLogout = () => {
    dispatch(logout())
    navigation.reset({
      index: 0,
      routes: [{ name: LANDING }]
    })
  }
  return (
    <Background style={{ paddingBottom: 0 }}>
      <Text>Hello</Text>
      <Button type={ButtonType.PRIMARY} onButtonClick={() => onLogout()} title="Logout" />
    </Background>
  )
}

const themedStyles = StyleService.create({
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
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  bottomLoaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  }
})
