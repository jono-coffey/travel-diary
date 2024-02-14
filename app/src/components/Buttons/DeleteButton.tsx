import { AntDesign } from '@expo/vector-icons'
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components'
import { Pressable } from 'react-native'

type DeleteButtonProps = {
  onClick(): void
}
export const DeleteButton = (props: DeleteButtonProps) => {
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles)

  return (
    <Pressable style={styles.container} onPress={() => props.onClick()}>
      <AntDesign name="delete" size={20} color={theme['color-primary-500']} />
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
