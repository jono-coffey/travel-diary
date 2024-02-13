import { Entypo } from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components'
import { Pressable } from 'react-native'

import { RootStackParamList } from '../../routing/routes'

export const BackIcon = () => {
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles)

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const goBack = () => {
    const popAction = StackActions.pop(1)
    navigation.dispatch(popAction)
  }
  return (
    <Pressable style={styles.container} onPress={() => goBack()}>
      <Entypo name="chevron-left" size={24} color={theme['color-primary-500']} />
    </Pressable>
  )
}

const themedStyles = StyleService.create({
  container: {
    borderRadius: 100,
    borderColor: 'color-primary-500',
    borderWidth: 0.5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
