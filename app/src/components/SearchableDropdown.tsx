import { Entypo, AntDesign } from '@expo/vector-icons'
import { StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components'
import React, { useState } from 'react'
import { View } from 'react-native'
import DropDownPicker, { DropDownDirectionType, ItemType, ValueType } from 'react-native-dropdown-picker'

import { fontFamily } from '../styles/typography'

export interface DropdownItem {
  value: string
  label: string
}

export type SearchableDropdownProps = {
  items: DropdownItem[]
  placeholder: string
  selectedIndices: number[]
  label?: string
  dropdownDirection?: DropDownDirectionType
  setSelectedItems(indices: number[]): void
}

export const SearchableDropdownField = (props: SearchableDropdownProps) => {
  const styles = useStyleSheet(themedStyles)
  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(props.selectedIndices.map(String))
  const [items, setItems] = useState(props.items)

  const onSelectItem = (values: ItemType<ValueType>[]): void => {
    props.setSelectedItems(values.map((value) => parseInt((value as DropdownItem).value, 10)))
  }

  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={(values) => onSelectItem(values)}
        placeholder={props.placeholder}
        searchable
        multiple
        searchPlaceholder="Search..."
        mode="BADGE"
        badgeDotColors={[theme['color-primary-300']]}
        ArrowUpIconComponent={() => <Entypo name="chevron-up" size={24} color={theme['color-primary-500']} />}
        ArrowDownIconComponent={() => (
          <Entypo name="chevron-down" size={24} color={theme['color-primary-500']} />
        )}
        TickIconComponent={() => <AntDesign name="check" size={18} color={theme['color-primary-500']} />}
        searchContainerStyle={styles.searchContainer}
        searchTextInputStyle={styles.searchTextInputStyle}
        extendableBadgeContainer
        badgeTextStyle={styles.badgeTextStyle}
        badgeColors={[theme['color-primary-100']]}
        listItemLabelStyle={styles.listItemLabelStyle}
        style={{
          ...styles.dropdown,
          borderColor: open ? theme['color-primary-500'] : '#e4e9f2',
          backgroundColor: open ? 'white' : '#f7f9fc'
        }}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true
        }}
        dropDownDirection={props.dropdownDirection}
      />
    </View>
  )
}

const themedStyles = StyleService.create({
  label: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
    color: '#8f9bb3'
  },
  dropdown: { borderRadius: 4, borderWidth: 1 },
  searchContainer: { padding: 0, borderWidth: 0, borderBottomColor: '#e4e9f2' },
  searchTextInputStyle: {
    borderWidth: 0,
    fontFamily
  },
  badgeTextStyle: {
    fontFamily
  },
  dropDownContainerStyle: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'color-primary-500',
    borderBottomColor: '#e4e9f2'
  },
  listItemLabelStyle: {
    fontFamily
  }
})
