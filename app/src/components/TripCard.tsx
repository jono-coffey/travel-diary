import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import * as React from 'react'
import { View } from 'react-native'

export type TripCardProps = {
  name: string
  startDate: number
  endDate: number
}

export const TripCard = (props: TripCardProps) => {
  const styles = useStyleSheet(themedStyles)
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.text} category="s2">
        {props.name}
      </Text>
      <Text style={styles.text} category="c1">
        {props.startDate}
      </Text>
      <Text style={styles.text} category="c1">
        {props.endDate}
      </Text>
    </View>
  )
}

const themedStyles = StyleService.create({
  cardContainer: {
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center'
  }
})
