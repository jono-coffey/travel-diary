import { Entypo } from '@expo/vector-icons'
import {
  IndexPath,
  StyleService,
  useStyleSheet,
  useTheme,
  OverflowMenu as UIKittenOverflowMenu,
  MenuItem
} from '@ui-kitten/components'
import { useState } from 'react'
import { Pressable, ViewStyle } from 'react-native'

export type OverflowMenuProps = {
  displayValues: string[]
  selectedIndex: IndexPath
  placement: string
  style?: ViewStyle
  setSelectedIndex(index: IndexPath): void
}
export const OverflowMenu = (props: OverflowMenuProps) => {
  const theme = useTheme()
  const styles = useStyleSheet(themedStyles)
  const [visible, setVisible] = useState(false)

  const renderToggleButton = () => {
    const icon = visible ? 'chevron-up' : 'chevron-down'
    return (
      <Pressable style={[styles.toggleButtonContainer, props.style]} onPress={() => setVisible(true)}>
        <Entypo name={icon} size={24} color={theme['color-primary-500']} />
      </Pressable>
    )
  }

  const onSelect = (index: IndexPath): void => {
    props.setSelectedIndex(index)
    setVisible(false)
  }

  return (
    <UIKittenOverflowMenu
      anchor={renderToggleButton}
      visible={visible}
      selectedIndex={props.selectedIndex}
      onSelect={onSelect}
      onBackdropPress={() => setVisible(false)}
      placement={props.placement}
    >
      {props.displayValues.map((value) => {
        return <MenuItem key={value} title={value} />
      })}
    </UIKittenOverflowMenu>
  )
}

const themedStyles = StyleService.create({
  toggleButtonContainer: {
    borderRadius: 100,
    borderColor: 'color-primary-500',
    borderWidth: 0.5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
