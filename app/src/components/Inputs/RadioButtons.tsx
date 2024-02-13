import { Radio, RadioGroup, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export interface RadioButtonItem {
  id: number
  name: string
}

export interface RadioButtonGroupProps {
  name: string
  items: RadioButtonItem[]
  value: number | undefined
  onSelect(itemId: number): void
}

export const getItemIdFromIndex = (items: RadioButtonItem[], index: number | undefined) => {
  if (index === undefined || index < 0) return undefined
  return items[index].id
}

export const getIndexFromItemId = (itemId: number | undefined, items: RadioButtonItem[]) => {
  if (itemId === undefined) return undefined
  return items.findIndex((item) => item.id === itemId)
}

export const RadioButtonGroup = (props: RadioButtonGroupProps) => {
  const onSelect = (index: number) => {
    props.onSelect(index)
  }

  return (
    <View style={styles.groupContainer}>
      <Text style={styles.label}>{props.name}</Text>
      <RadioGroup
        style={styles.radioButtonsContainer}
        selectedIndex={props.value}
        onChange={(index) => onSelect(index)}
      >
        {props.items.map((item) => {
          return <Radio key={item.id}>{item.name}</Radio>
        })}
      </RadioGroup>
    </View>
  )
}

const styles = StyleSheet.create({
  groupContainer: {
    width: '100%'
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
    color: '#8f9bb3'
  },
  radioButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})
