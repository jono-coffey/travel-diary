import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import * as React from 'react'
import { Pressable, View } from 'react-native'
import { unixToDateString } from '../utils/dates'

export type TripCardProps = {
  id: number
  name: string
  startDate: number
  endDate: number
  onCardPress?(id: number): void
}

export const TripCard = (props: TripCardProps) => {
  const styles = useStyleSheet(themedStyles)
  return (
    <Pressable onPress={() => props.onCardPress && props.onCardPress(props.id)} style={styles.cardContainer}>
      <Text style={styles.text} category="s2">
        {props.name}
      </Text>
      <Text style={styles.text} category="c1">
        {unixToDateString(props.startDate)}
      </Text>
      <Text style={styles.text} category="c1">
        {unixToDateString(props.endDate)}
      </Text>
    </Pressable>
  )
}

const themedStyles = StyleService.create({
  cardContainer: {
    backgroundColor: 'color-basic-100',
    borderColor: 'color-basic-100',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  text: {
    textAlign: 'center'
  }
})
